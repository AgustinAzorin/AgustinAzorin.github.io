// Año footer
document.getElementById('year').textContent = new Date().getFullYear()

// Nav active on scroll
const links = [...document.querySelectorAll('.nav a')]
// Only observe sections that actually exist in the document to avoid runtime errors
const sections = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean)
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      links.forEach(a=>a.classList.remove('active'))
      const id = '#' + e.target.id
      const link = links.find(a=>a.getAttribute('href')===id)
      link?.classList.add('active')
    }
  })
}, {rootMargin:'-40% 0px -50% 0px', threshold:0})
sections.forEach(s=>obs.observe(s))

// ==========================
// GSAP + ScrollTrigger setup
// ==========================
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)

  // Helper: revelar un BLOQUE (grupo de elementos) con scrub
  function blockReveal(targets, opts={}){
    const els = Array.isArray(targets) ? targets : [targets]
    gsap.set(els, {autoAlpha:0, y:26, willChange:'transform, opacity'})
    return gsap.to(els, {
      autoAlpha:1, y:0,
      stagger: opts.stagger ?? 0.08,
      ease: opts.ease ?? 'power1.out',
      scrollTrigger:{
        trigger: opts.trigger || (els[0] && els[0].closest('section')),
        start: opts.start || 'top 78%',
        end: opts.end   || 'bottom 40%',
        scrub: true
      }
    })
  }

  // 0) Entrada inicial del HOME (sin scroll)
  const home = document.querySelector('#home')
  if(home){
    const kicker = home.querySelector('.kicker')
    const title  = home.querySelector('.title')
    const lead   = home.querySelector('.lead')
    const cta    = home.querySelector('.cta')
    const blob   = home.querySelector('.blob')
    gsap.set([kicker,title,lead,cta,blob], {autoAlpha:0})
    const tl = gsap.timeline({defaults:{ease:'power2.out'}})
    tl.fromTo(kicker,{y:20},{y:0, autoAlpha:1, duration:.35})
      .fromTo(title,{y:28},{y:0, autoAlpha:1, duration:.5}, '-=0.1')
      .fromTo(lead,{y:22},{y:0, autoAlpha:1, duration:.45}, '-=0.2')
      .fromTo(cta,{y:18},{y:0, autoAlpha:1, duration:.4}, '-=0.25')
      .fromTo(blob,{scale:.94},{scale:1, autoAlpha:1, duration:.6}, '-=0.3')
  }

  // 1) Parallax sutil
  const blob = document.querySelector('.blob')
  if(blob){
    gsap.to(blob, { yPercent:-8, scrollTrigger:{ trigger:'#home', start:'top bottom', end:'bottom top', scrub:true } })
  }
  gsap.utils.toArray('.project img').forEach((img)=>{
    gsap.to(img, { yPercent:-6, scrollTrigger:{ trigger: img.closest('section'), start:'top bottom', end:'bottom top', scrub:true } })
  })

  // 2) BLOQUES por sección (en lugar de elemento a elemento)
  // SERVICES
  const secServices = document.querySelector('#services .wrap')
  if(secServices){
    blockReveal([secServices.querySelector('.section-title'), secServices.querySelector('.section-sub')], {trigger: secServices, stagger: 0})
    blockReveal(secServices.querySelector('.grid.services'), {trigger: secServices})
  }
  // PROJECTS
  const secProjects = document.querySelector('#projects .wrap')
  if(secProjects){
    blockReveal([secProjects.querySelector('.section-title'), secProjects.querySelector('.section-sub')], {trigger: secProjects, stagger: 0})
    blockReveal(secProjects.querySelector('.grid.projects'), {trigger: secProjects})
  }
  // STACK (columnas por bloques)
  const secStack = document.querySelector('#stack .wrap')
  if(secStack){
    blockReveal([secStack.querySelector('.section-title'), secStack.querySelector('.section-sub')], {trigger: secStack, stagger: 0})
    const cols = secStack.querySelectorAll('.stack-col')
    cols.forEach(col=> blockReveal(col, {trigger: secStack, start:'top 80%', end:'bottom 45%'}))
  }
  // CONTACT
  const secContact = document.querySelector('#contact .wrap')
  if(secContact){
    blockReveal([secContact.querySelector('.section-title'), secContact.querySelector('.section-sub')], {trigger: secContact, stagger: 0})
    blockReveal(secContact.querySelector('form'), {trigger: secContact})
  }
}

// Tilt para cards
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {max:6, speed:600, glare:true, 'max-glare':.12})
}

// Scroll suave al hacer click en la flecha
const scrollBtn = document.querySelector(".scroll-down__btn");
if (scrollBtn) {
  scrollBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#services").scrollIntoView({ behavior: "smooth" });
  });
}

// Contact: mailto fallback simple
const form = document.getElementById('contact-form')
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.getElementById('name').value.trim()
    const email = document.getElementById('email').value.trim()
    const msg = document.getElementById('msg').value.trim()
    if(!name || !email || !msg){
      alert('Completá todos los campos.');
      return
    }
    const subject = encodeURIComponent('Contacto desde portfolio')
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${msg}`)
    window.location.href = `mailto:tuemail@dominio.com?subject=${subject}&body=${body}`
  })
}
