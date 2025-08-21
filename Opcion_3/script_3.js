// filepath: c:\Users\Lopa\Documents\GitHub\AgustinAzorin.github.io\Opcion_3\script_3.js
// Animaciones de entrada
document.querySelectorAll('[data-animate]').forEach(el => {
  setTimeout(() => el.classList.add('is-in'), +(el.dataset.delay || 0) * 1000);
});

// Año en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú hamburguesa (responsive)
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('is-open'));
  });
}