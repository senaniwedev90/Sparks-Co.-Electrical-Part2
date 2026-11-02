// 1. Accordion for Services
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    header.nextElementSibling.classList.toggle('active');
  });
});

// 2. Lightbox Gallery
const lightbox = document.getElementById('lightbox');
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    document.getElementById('lightbox-img').src = img.src;
  });
});
function closeLightbox(){ lightbox.style.display = 'none'; }

// 3. Leaflet Map - Contact page
if(document.getElementById('map')){
  const map = L.map('map').setView([-26.1076, 28.2092], 12); // Kempton Park
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([-26.1076, 28.2092]).addTo(map).bindPopup("Sparks & Co. Electrical - Greater Metro");
}

// 4. Dynamic Content + Search Filter (Services)
const services = [
  {name:"Electrical Repairs", desc:"Faulty outlets, switches, lights"},
  {name:"Panel Upgrades", desc:"Modern panels and safe wiring"},
  {name:"Lighting Installation", desc:"Indoor and outdoor lighting"}
];
const serviceList = document.getElementById('service-list');
function loadServices(filter=""){
  serviceList.innerHTML = "";
  services.filter(s => s.name.toLowerCase().includes(filter.toLowerCase()))
  .forEach(s => {
    serviceList.innerHTML += `<div class="service-card"><h3>${s.name}</h3><p>${s.desc}</p></div>`;
  });
}
if(serviceList){ loadServices(); }
function filterServices(){ loadServices(document.getElementById('searchBox').value); }

// 5. Animation on scroll
window.addEventListener('scroll', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    if(el.getBoundingClientRect().top < window.innerHeight - 50) el.classList.add('active');
  });
});

document.getElementById('enquiryForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const service = document.getElementById('service').value;
  let price = service === 'panel' ? 'R3500 - R8500' : service === 'repair' ? 'R450 callout + parts' : 'R1200+';
  document.getElementById('enquiryResult').innerHTML = `Thanks! Estimated for ${service}: ${price}. Available same-day.`;
  // AJAX simulation
  fetch('https://httpbin.org/post', {method:'POST', body: new FormData(this)}).then(()=>alert('Enquiry sent!'));
});

document.getElementById('contactForm')?.addEventListener('submit', function(e){
  const phone = document.getElementById('cPhone').value;
  if(!phone.match(/^\+27/)){ 
    e.preventDefault();
    document.getElementById('formError').textContent = 'Phone must start with +27';
  }
});