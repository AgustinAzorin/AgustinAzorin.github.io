// ==============================
// Portfolio Animations & Effects
// ==============================

// Year auto-update en footer
document.getElementById("year").textContent = new Date().getFullYear();

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

// 1. Animación de entrada en la sección HOME
gsap.from(".hero .kicker, .hero .title, .hero .lead, .hero .cta", {
  y: 50,
  opacity: 0,
  stagger: 0.2,
  duration: 1.2,
  ease: "power3.out"
});

// 2. Animaciones al hacer scroll (fade-in / fade-out en bloques)
const sections = document.querySelectorAll("section");

sections.forEach((section) => {
  gsap.fromTo(
    section.querySelectorAll(".section-title, .section-sub, .card, .stack-item, form, .lead"),
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse",
      }
    }
  );
});

// 3. Parallax sutil con el blob del hero
gsap.to(".blob", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    scrub: true
  }
});

// 4. Stacks → aparecer de izquierda a derecha (por columnas)
gsap.from(".stack-item", {
  opacity: 0,
  x: -50,
  duration: 0.8,
  stagger: {
    each: 0.1,
    from: "start"
  },
  scrollTrigger: {
    trigger: "#stack",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

// 5. Scroll-down arrow → animación al click
const scrollBtn = document.querySelector(".scroll-down__btn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
  });
}

// 6. VanillaTilt para tarjetas
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
  max: 8,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
});
