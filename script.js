
// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll suave nativo
document.documentElement.style.scrollBehavior = 'smooth';

// Observador para revelar bloques (sin GSAP/ScrollTrigger)
const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// Estado activo del menú
const links = document.querySelectorAll('.js-nav');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
    if(e.isIntersecting){
        const id = '#' + e.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
    }
    });
}, { threshold:.6 });
sections.forEach(s => s && spy.observe(s));