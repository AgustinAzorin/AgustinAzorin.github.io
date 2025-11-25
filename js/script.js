// Minimal JS: menú móvil, reveal on scroll, form front-end validation and UX.
document.addEventListener('DOMContentLoaded', () => {
  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    links.classList.toggle('show');
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  // Reveal on scroll (intersection observer)
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(r => io.observe(r));

  // Simple form validation + UX (front-only)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  function validEmail(email) {
    // simple regex, good for front validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Por favor completá todos los campos.';
      status.style.color = '#ffb86b';
      return;
    }
    if (!validEmail(email)) {
      status.textContent = 'El email parece inválido.';
      status.style.color = '#ff6b6b';
      return;
    }

    // Simular envío (front-only)
    status.textContent = 'Mensaje listo para enviar — conectado al backend cuando quieras.';
    status.style.color = '#7efc9a';

    // pequeña animación de éxito y reset del form
    setTimeout(() => {
      form.reset();
      status.textContent = 'Gracias — me contacto pronto.';
    }, 750);
  });

  // Progressive enhancement: enable keyboard focus visible
  document.body.addEventListener('keyup', (e) => {
    if (e.key === 'Tab') document.body.classList.add('show-focus');
  });
});