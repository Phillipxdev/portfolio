// ==========================================
// MOBILE MENU
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navigationLinks = document.querySelectorAll(".nav-link");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuBtn.textContent = isOpen ? "✕" : "☰";
        menuBtn.setAttribute("aria-expanded", isOpen.toString());
        menuBtn.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );
    });

    // Close mobile menu when a navigation link is clicked
    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");

            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}


// ==========================================
// ACTIVE NAVIGATION
// ==========================================

const sections = document.querySelectorAll("section");

function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}


// ==========================================
// AUTOMATIC FOOTER YEAR
// ==========================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-card, " +
    ".about-content, " +
    ".skill-card, " +
    ".project-card, " +
    ".contact-text, " +
    ".contact-buttons"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");

        revealObserver.observe(element);
    });
} else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}


// ==========================================
// DARK / LIGHT THEME
// ==========================================

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {
    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");

        themeBtn.textContent = "🌙";
        themeBtn.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    } else {
        themeBtn.textContent = "☀️";
        themeBtn.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const isLight =
            document.body.classList.contains("light-theme");

        if (isLight) {
            themeBtn.textContent = "🌙";

            themeBtn.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );
        } else {
            themeBtn.textContent = "☀️";

            themeBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );
        }
    });
}


// ==========================================
// HERO TYPING ANIMATION
// ==========================================

const typingText = document.getElementById("typingText");

const roles = [
    "Front-End Developer",
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent =
            currentRole.substring(0, characterIndex + 1);

        characterIndex++;

        // Finished typing
        if (characterIndex === currentRole.length) {
            deleting = true;

            setTimeout(typeRole, 1800);

            return;
        }
    } else {
        typingText.textContent =
            currentRole.substring(0, characterIndex - 1);

        characterIndex--;

        // Finished deleting
        if (characterIndex === 0) {
            deleting = false;

            roleIndex++;

            if (roleIndex === roles.length) {
                roleIndex = 0;
            }
        }
    }

    const speed = deleting ? 50 : 90;

    setTimeout(typeRole, speed);
}

if (typingText) {
    typeRole();
}


// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // Check required fields
        if (!name || !email || !subject || !message) {
            formStatus.textContent =
                "Please complete all fields.";

            return;
        }


        // Create email subject
        const emailSubject =
            encodeURIComponent(subject);


        // Create email body
        const emailBody = encodeURIComponent(
`Hello Thabiso,

${message}

From:
${name}
${email}`
        );


        // Create mailto link
        const mailtoLink =
            `mailto:shezithabisophillip@gmail.com?subject=${emailSubject}&body=${emailBody}`;


        formStatus.textContent =
            "Opening your email application...";


        window.location.href = mailtoLink;
    });
}


// ==========================================
// SCROLL PROGRESS
// ==========================================

const scrollProgress =
    document.getElementById("scrollProgress");

function updateScrollProgress() {
    if (!scrollProgress) {
        return;
    }

    const scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    scrollProgress.style.width = `${progress}%`;
}


// ==========================================
// BACK TO TOP
// ==========================================

const backToTop =
    document.getElementById("backToTop");

function updateBackToTop() {
    if (!backToTop) {
        return;
    }

    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


// ==========================================
// MAIN SCROLL EVENT
// ==========================================

function handleScroll() {
    updateScrollProgress();
    updateBackToTop();
    updateActiveNavigation();
}

window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
);

// Run once when the website loads
handleScroll();


// ==========================================
// HERO CODE CARD MOUSE EFFECT
// ==========================================

const codeWindow =
    document.querySelector(".code-window");

if (codeWindow) {
    codeWindow.addEventListener(
        "mousemove",
        (event) => {
            // Disable floating animation while interacting
            codeWindow.style.animation = "none";

            const rect =
                codeWindow.getBoundingClientRect();

            const mouseX =
                event.clientX - rect.left;

            const mouseY =
                event.clientY - rect.top;


            // Convert mouse position into rotation
            const rotateY =
                ((mouseX / rect.width) - 0.5) * 8;

            const rotateX =
                ((mouseY / rect.height) - 0.5) * -8;


            codeWindow.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        }
    );


    codeWindow.addEventListener(
        "mouseleave",
        () => {
            codeWindow.style.transform = "";

            codeWindow.style.animation =
                "codeFloat 5s ease-in-out infinite";
        }
    );
}

// ==========================================
// BATMAN HERO SPOTLIGHT
// ==========================================

const hero = document.querySelector(".hero");
const heroSpotlight = document.getElementById("heroSpotlight");

if (hero && heroSpotlight) {

    hero.addEventListener("mousemove", (event) => {

        // Disable Batman spotlight in light mode
        if (document.body.classList.contains("light-theme")) {
            heroSpotlight.style.opacity = "0";
            return;
        }

        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        const rect = hero.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        heroSpotlight.style.left = `${x}px`;
        heroSpotlight.style.top = `${y}px`;

        heroSpotlight.style.opacity = "1";
    });


    hero.addEventListener("mouseleave", () => {

        heroSpotlight.style.opacity = "0";

    });

}