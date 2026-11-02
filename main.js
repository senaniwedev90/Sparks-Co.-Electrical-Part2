
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE NAVIGATION
    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // AUTOMATIC FOOTER YEAR
    document.querySelectorAll(".year").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // SCROLL REVEAL ANIMATION
    const revealItems = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach(element => observer.observe(element));
    } else {
        revealItems.forEach(element => {
            element.classList.add("visible");
        });
    }

    // SERVICES DATA
    const services = [
        {
            name: "Electrical repairs",
            category: "repair",
            description: "Enquiries about faulty outlets, switches, tripping circuits and electrical faults.",
            details: "Describe the fault and where it occurs."
        },
        {
            name: "Distribution board / panel upgrade",
            category: "upgrade",
            description: "Enquiries about distribution board improvements and replacement.",
            details: "A site assessment is required before a final quote."
        },
        {
            name: "Lighting installation",
            category: "lighting",
            description: "Indoor and outdoor lighting installation enquiries.",
            details: "Include the number and type of fittings if known."
        },
        {
            name: "Home rewiring",
            category: "installation",
            description: "Enquiries about partial or complete rewiring projects.",
            details: "The property and wiring condition must be assessed."
        },
        {
            name: "Electrical inspection",
            category: "repair",
            description: "Enquiries about inspection and identifying electrical issues.",
            details: "Explain the reason for the inspection."
        },
        {
            name: "New electrical points",
            category: "installation",
            description: "Enquiries about additional plug points and circuits.",
            details: "Mention the room and approximate location."
        }
    ];

    // DYNAMIC SERVICE RENDERING
    const serviceList = document.getElementById("service-list");
    const serviceSearch = document.getElementById("serviceSearch");
    const categoryFilter = document.getElementById("categoryFilter");

    function renderServices() {
        if (!serviceList) return;

        const searchTerm = (serviceSearch?.value || "")
            .trim()
            .toLowerCase();

        const selectedCategory = categoryFilter?.value || "all";

        const filteredServices = services.filter(service => {
            const matchesCategory =
                selectedCategory === "all" ||
                service.category === selectedCategory;

            const matchesSearch =
                (
                    service.name +
                    " " +
                    service.description +
                    " " +
                    service.category
                ).toLowerCase().includes(searchTerm);

            return matchesCategory && matchesSearch;
        });

        serviceList.replaceChildren();

        if (filteredServices.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "empty-state";
            emptyMessage.textContent =
                "No services match your search. Try another keyword or category.";

            serviceList.append(emptyMessage);
            return;
        }

        filteredServices.forEach(service => {
            const card = document.createElement("article");
            card.className = "service-card reveal visible";

            const tag = document.createElement("span");
            tag.className = "service-tag";
            tag.textContent = service.category;

            const title = document.createElement("h3");
            title.textContent = service.name;

            const description = document.createElement("p");
            description.textContent = service.description;

            const details = document.createElement("p");
            details.className = "muted";
            details.textContent = service.details;

            const link = document.createElement("a");
            link.className = "button";
            link.href = "enquiry.html";
            link.textContent = "Enquire";

            card.append(tag, title, description, details, link);
            serviceList.append(card);
        });
    }

    serviceSearch?.addEventListener("input", renderServices);
    categoryFilter?.addEventListener("change", renderServices);

    renderServices();

    // FAQ ACCORDION
    document.querySelectorAll(".accordion-trigger").forEach(button => {
        button.addEventListener("click", () => {
            const expanded =
                button.getAttribute("aria-expanded") === "true";

            button.setAttribute(
                "aria-expanded",
                String(!expanded)
            );

            const symbol = button.querySelector("span");

            if (symbol) {
                symbol.textContent = expanded ? "+" : "−";
            }
        });
    });

    // TABS
    const tabButtons = [
        ...document.querySelectorAll(".tab-button[role='tab']")
    ];

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {

            tabButtons.forEach(tab => {
                const selected = tab === button;

                tab.setAttribute(
                    "aria-selected",
                    String(selected)
                );

                const panel = document.getElementById(
                    tab.getAttribute("aria-controls")
                );

                if (panel) {
                    panel.hidden = !selected;
                }
            });

        });
    });

    // GALLERY LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeButton = document.getElementById("lightboxClose");

    function closeLightbox() {
        if (!lightbox || !lightboxImage) return;

        lightbox.classList.remove("open");
        lightboxImage.src = "";
    }

    document.querySelectorAll(".gallery-item").forEach(item => {
        item.addEventListener("click", () => {

            const image = item.querySelector("img");
            const source = item.dataset.full || image?.src;

            if (!lightbox || !lightboxImage || !source) return;

            lightboxImage.src = source;
            lightboxImage.alt =
                image?.alt || "Expanded gallery image";

            lightbox.classList.add("open");
            closeButton?.focus();
        });
    });

    closeButton?.addEventListener("click", closeLightbox);

    lightbox?.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    // LEAFLET MAP - GENERAL KEMPTON PARK LOCATION
    const mapElement = document.getElementById("map");

    if (mapElement && window.L) {

        const map = L.map(mapElement).setView(
            [-26.1076, 28.2293],
            12
        );

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19
            }
        ).addTo(map);

        L.marker([-26.1076, 28.2293])
            .addTo(map)
            .bindPopup("Kempton Park, Gauteng")
            .openPopup();
    }

    // ENQUIRY FORM
    const enquiryForm = document.getElementById("enquiryForm");

    enquiryForm?.addEventListener("submit", event => {
        event.preventDefault();

        const error = document.getElementById("enqError");
        const result = document.getElementById("enqResponse");

        error.textContent = "";
        error.classList.remove("error");

        result.classList.remove("show");

        if (!enquiryForm.checkValidity()) {
            enquiryForm.reportValidity();

            error.textContent =
                "Please complete all required fields using the requested format.";

            error.classList.add("error");
            return;
        }

        const estimates = {
            panel: {
                price: "R3,500–R8,500",
                availability: "Assessment required; timing must be confirmed."
            },

            repair: {
                price: "Price depends on the fault, parts and labour",
                availability: "Appointment subject to confirmation."
            },

            lighting: {
                price: "Price depends on fittings, quantity and installation requirements",
                availability: "Appointment subject to confirmation."
            },

            rewire: {
                price: "A site assessment is required before pricing",
                availability: "Timing depends on project scope."
            },

            other: {
                price: "A quotation is required after reviewing the request",
                availability: "To be confirmed."
            }
        };

        const selectedService =
            document.getElementById("enqService").value;

        const estimate = estimates[selectedService];

        result.replaceChildren();

        const title = document.createElement("h3");
        title.textContent = "Indicative enquiry information";

        const price = document.createElement("p");
        price.textContent = "Estimated cost: " + estimate.price;

        const availability = document.createElement("p");
        availability.textContent =
            "Availability: " + estimate.availability;

        const note = document.createElement("p");
        note.className = "help-text";
        note.textContent =
            "This is not a quotation or confirmed booking. Contact the business to confirm the details.";

        result.append(title, price, availability, note);
        result.classList.add("show");
    });

    // CONTACT FORM
    const contactForm = document.getElementById("contactForm");

    contactForm?.addEventListener("submit", event => {
        event.preventDefault();

        const error = document.getElementById("cError");
        const success = document.getElementById("cSuccess");

        error.textContent = "";
        error.classList.remove("error");

        success.textContent = "";
        success.classList.remove("success");

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();

            error.textContent =
                "Please check the required fields and try again.";

            error.classList.add("error");
            return;
        }

        const values = Object.fromEntries(
            new FormData(contactForm).entries()
        );

        const subject = encodeURIComponent(
            "Website enquiry: " + values.messageType
        );

        const body = encodeURIComponent(
            "Name: " + values.name +
            "\nEmail: " + values.email +
            "\nPhone: " + (values.phone || "Not provided") +
            "\nMessage type: " + values.messageType +
            "\n\nMessage:\n" + values.message
        );

        success.textContent =
            "Your email application should open with the message prepared. Review it and press Send.";

        success.classList.add("success");

        window.location.href =
            "mailto:info@sparksco-electrical.com" +
            "?subject=" + subject +
            "&body=" + body;
    });

});
