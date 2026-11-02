"use strict";

/* =====================================================
   SPARKS & CO. ELECTRICAL - MAIN JAVASCRIPT
===================================================== */

/* MOBILE NAVIGATION */
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

/* FOOTER YEAR */
document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
});

/* SCROLL REVEAL ANIMATIONS */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => revealObserver.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}

/* SERVICE DATA - SERVICES ARE LOADED USING JAVASCRIPT */
const services = [
    {
        name: "Electrical Installations",
        category: "installation",
        description: "Electrical installation work for residential and commercial properties."
    },
    {
        name: "Electrical Repairs",
        category: "repairs",
        description: "Troubleshooting and repair enquiries for electrical faults."
    },
    {
        name: "DB Board and Panel Upgrades",
        category: "installation",
        description: "Enquiries about distribution board and electrical panel upgrades."
    },
    {
        name: "Lighting Solutions",
        category: "installation",
        description: "Indoor, outdoor and security lighting installation enquiries."
    },
    {
        name: "Electrical Inspections",
        category: "inspection",
        description: "Electrical inspection and compliance-related enquiries."
    },
    {
        name: "Maintenance",
        category: "maintenance",
        description: "Routine electrical maintenance for homes and businesses."
    }
];

const serviceList = document.getElementById("service-list");
const serviceSearch = document.getElementById("serviceSearch");
const categoryFilter = document.getElementById("categoryFilter");

function renderServices() {
    if (!serviceList) return;

    const searchTerm = serviceSearch?.value.toLowerCase().trim() || "";
    const category = categoryFilter?.value || "all";

    const filteredServices = services.filter(service => {
        const matchesSearch =
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
            category === "all" || service.category === category;

        return matchesSearch && matchesCategory;
    });

    serviceList.innerHTML = "";

    if (filteredServices.length === 0) {
        serviceList.innerHTML =
            "<p>No services match your search. Try another keyword.</p>";
        return;
    }

    filteredServices.forEach(service => {
        const card = document.createElement("article");
        card.className = "card service-card reveal visible";

        const categoryLabel = document.createElement("span");
        categoryLabel.className = "service-category";
        categoryLabel.textContent = service.category;

        const heading = document.createElement("h3");
        heading.textContent = service.name;

        const description = document.createElement("p");
        description.textContent = service.description;

        const link = document.createElement("a");
        link.className = "btn";
        link.href = "enquiry.html";
        link.textContent = "Enquire now";

        card.append(categoryLabel, heading, description, link);
        serviceList.appendChild(card);
    });
}

if (serviceList) {
    renderServices();
    serviceSearch?.addEventListener("input", renderServices);
    categoryFilter?.addEventListener("change", renderServices);
}

/* FAQ ACCORDION */
document.querySelectorAll(".accordion-trigger").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".accordion-item");
        const isOpen = item.classList.toggle("open");

        button.setAttribute("aria-expanded", String(isOpen));

        const symbol = button.querySelector(".accordion-symbol");
        if (symbol) symbol.textContent = isOpen ? "−" : "+";
    });
});

/* TABS */
document.querySelectorAll(".tabs").forEach(tabContainer => {
    const buttons = tabContainer.querySelectorAll(".tab-button");
    const panelContainer = tabContainer.nextElementSibling;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            buttons.forEach(tab => {
                tab.classList.remove("active");
                tab.setAttribute("aria-selected", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-selected", "true");

            const targetId = button.getAttribute("aria-controls");

            if (panelContainer) {
                panelContainer.querySelectorAll(".tab-panel").forEach(panel => {
                    panel.classList.toggle("active", panel.id === targetId);
                });
            }
        });
    });
});

/* GALLERY LIGHTBOX */
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
    item.addEventListener("click", () => {
        const image = item.querySelector("img");
        if (!image || !lightbox || !lightboxImage) return;

        lightboxImage.src = item.dataset.full || image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
}

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeLightbox();
});

/* MAP - KEMPTON PARK GENERAL LOCATION */
const mapElement = document.getElementById("map");

if (mapElement && window.L) {
    const map = L.map("map").setView([-26.1076, 28.2293], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([-26.1076, 28.2293])
        .addTo(map)
        .bindPopup("Kempton Park, Gauteng")
        .openPopup();
}

/* ENQUIRY FORM */
const enquiryForm = document.getElementById("enquiryForm");
const enqError = document.getElementById("enqError");
const enqResponse = document.getElementById("enqResponse");
const enqService = document.getElementById("enqService");

const estimates = {
    "panel-upgrade": {
        price: "R3,500 – R8,500",
        availability: "Example availability: within 2 days, subject to confirmation."
    },
    "lighting": {
        price: "Quotation required",
        availability: "Timing depends on the property and installation requirements."
    },
    "repairs": {
        price: "Quotation required",
        availability: "Timing depends on the fault and parts required."
    },
    "installation": {
        price: "Quotation required",
        availability: "Timing depends on the scope of the installation."
    },
    "volunteer": {
        price: "No service cost estimate",
        availability: "Your volunteer enquiry will need to be reviewed."
    },
    "sponsor": {
        price: "To be discussed",
        availability: "Your sponsorship enquiry will need to be reviewed."
    }
};

enqService?.addEventListener("change", () => {
    if (!enqResponse) return;

    const estimate = estimates[enqService.value];

    if (!estimate) {
        enqResponse.classList.remove("visible");
        return;
    }

    enqResponse.innerHTML = `
        <h3>Enquiry estimate</h3>
        <p><strong>Indicative cost:</strong> ${estimate.price}</p>
        <p><strong>Availability:</strong> ${estimate.availability}</p>
        <p>This is an assignment demonstration, not a confirmed quotation or booking.</p>
    `;

    enqResponse.classList.add("visible");
});

enquiryForm?.addEventListener("submit", event => {
    event.preventDefault();

    if (enqError) {
        enqError.classList.remove("error");
        enqError.textContent = "";
    }

    if (!enquiryForm.checkValidity()) {
        enquiryForm.reportValidity();

        if (enqError) {
            enqError.textContent = "Please complete all required fields correctly.";
            enqError.classList.add("error");
        }
        return;
    }

    const data = new FormData(enquiryForm);
    const name = data.get("name");

    if (enqResponse) {
        enqResponse.innerHTML += `
            <p>Thank you, ${String(name)}. Your enquiry has passed the form validation demonstration.</p>
        `;
        enqResponse.classList.add("visible");
    }

    enquiryForm.reset();
});

/* CONTACT FORM */
const contactForm = document.getElementById("contactForm");
const cError = document.getElementById("cError");
const cSuccess = document.getElementById("cSuccess");

contactForm?.addEventListener("submit", event => {
    event.preventDefault();

    cError?.classList.remove("error");
    cSuccess?.classList.remove("success");

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();

        if (cError) {
            cError.textContent = "Please correct the highlighted fields.";
            cError.classList.add("error");
        }
        return;
    }

    const data = new FormData(contactForm);

    const name = data.get("name");
    const email = data.get("email");
    const phone = data.get("phone");
    const type = data.get("messageType");
    const message = data.get("message");

    const subject = encodeURIComponent(`Website enquiry: ${type}`);
    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage type: ${type}\n\nMessage:\n${message}`
    );

    const recipient = "info@sparksco-electrical.com";
    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

    if (cSuccess) {
        cSuccess.textContent =
            "Your details have been validated. Your email application will now open with the message prepared.";
        cSuccess.classList.add("success");
    }

    window.location.href = mailtoLink;
});