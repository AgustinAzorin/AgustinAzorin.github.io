// Año footer
document.getElementById('year').textContent = new Date().getFullYear()

// Nav active on scroll
const links = [...document.querySelectorAll('.nav a')]
const sections = links.map(a => document.querySelector(a.getAttribute('href')))
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

// GSAP + ScrollTrigger setup
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger)

  // 1) Reveal con fade-in/out SUAVE + STAGGER por sección
  gsap.utils.toArray('section').forEach((sec)=>{
    const els = sec.querySelectorAll('.section-title, .section-sub, .card, .stack-item, form, .title, .lead, .cta')
    gsap.set(els, {autoAlpha:0, y:26, willChange:'transform, opacity'})

    const tl = gsap.timeline({
      defaults:{ease:'power1.out'},
      scrollTrigger:{
        trigger: sec,
        start:'top 80%',    // empieza a revelar al entrar la sección
        end:'bottom 35%',   // termina de revelar cerca del final
        scrub:true          // reversible y suave al volver
      }
    })

    tl.to(els, {autoAlpha:1, y:0, stagger:0.12})
  })

  // 2) Parallax sutil
  const blob = document.querySelector('.blob')
  if(blob){
    gsap.to(blob, {
      yPercent:-8,
      scrollTrigger:{ trigger:'#home', start:'top bottom', end:'bottom top', scrub:true }
    })
  }
  gsap.utils.toArray('.project img').forEach((img)=>{
    gsap.to(img, {
      yPercent:-6,
      scrollTrigger:{ trigger: img.closest('section'), start:'top bottom', end:'bottom top', scrub:true }
    })
  })

  // 3) Stagger adicional por grupo en Services/Projects/Stack
  ;['#services', '#projects', '#stack'].forEach(sel=>{
    const container = document.querySelector(sel)
    if(!container) return
    const items = container.querySelectorAll(sel==='#stack' ? '.stack-item' : '.card')
    if(!items.length) return
    gsap.set(items, {autoAlpha:0, y:24})
    gsap.to(items, {
      autoAlpha:1, y:0,
      stagger:0.08,
      ease:'power1.out',
      scrollTrigger:{
        trigger: container,
        start:'top 75%', end:'top 25%', scrub:true
      }
    })
  })
}

// Tilt para cards
if (window.VanillaTilt) {
  VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {max:6, speed:600, glare:true, 'max-glare':.12})
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
