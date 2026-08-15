/* =========================================================
   KEYSUN PORTFOLIO — SCRIPT
   1. Navigation (scrolled navbar background)
   2. Active Nav Link (highlights link for section in view)
   3. Mobile Menu Toggle
   4. Hero Visual Parallax (mouse-follow tilt)
========================================================= */


/* =========================
   1. NAVIGATION
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================
   2. ACTIVE NAV LINK
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSectionId = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSectionId) {
            link.classList.add("active");
        }
    });

});


/* =========================
   3. MOBILE MENU TOGGLE
========================= */

const navToggle = document.querySelector(".nav-toggle");
const navLinksList = document.querySelector(".nav-links");

if (navToggle && navLinksList) {

    navToggle.addEventListener("click", () => {
        const isOpen = navLinksList.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen);
    });

    // Close the mobile menu whenever a nav link is tapped
    navLinksList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinksList.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================
   4. HERO VISUAL PARALLAX
   Tilts the hero visual toward the cursor. The resting
   angles below (rotateX(4deg) rotateY(-8deg)) must match
   the base transform on ".hero-visual" in style.css.
========================= */

const heroVisual = document.querySelector(".hero-visual");
const heroRight = document.querySelector(".hero-right");

// Skip on touch devices — there is no hover/mouse to react to
const supportsHover = window.matchMedia("(hover: hover)").matches;

if (heroVisual && heroRight && supportsHover) {

    const RESTING_ROTATE_X = 4;
    const RESTING_ROTATE_Y = -8;
    const MAX_TILT_Y = 14;
    const MAX_TILT_X = 10;

    heroRight.addEventListener("mousemove", (event) => {

        const bounds = heroRight.getBoundingClientRect();

        // Cursor position within the container, from 0 to 1
        const relativeX = (event.clientX - bounds.left) / bounds.width;
        const relativeY = (event.clientY - bounds.top) / bounds.height;

        // Convert cursor position into a tilt angle
        const rotateY = (relativeX - 0.5) * MAX_TILT_Y;
        const rotateX = (0.5 - relativeY) * MAX_TILT_X;

        heroVisual.style.transform = `
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    });

    heroRight.addEventListener("mouseleave", () => {
        heroVisual.style.transform = `
            rotateX(${RESTING_ROTATE_X}deg)
            rotateY(${RESTING_ROTATE_Y}deg)
        `;
    });
}
