// The table arrows, the gallery lightbox and the sticky WhatsApp button.
(() => {
  const fila = document.querySelector('.mesa-fila')
  document.querySelectorAll('.seta').forEach((b) => {
    b.addEventListener('click', () => {
      const passo = fila.querySelector('.lugar').getBoundingClientRect().width + 28
      fila.scrollBy({ left: passo * Number(b.dataset.dir), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    })
  })

  const lb = document.querySelector('.lb')
  if (lb) {
    const fotos = [...document.querySelectorAll('.foto')]
    const img = lb.querySelector('img')
    const cap = lb.querySelector('figcaption')
    let atual = 0
    const mostrar = (i) => {
      atual = (i + fotos.length) % fotos.length
      img.src = fotos[atual].dataset.src
      img.alt = fotos[atual].dataset.alt
      cap.textContent = fotos[atual].dataset.alt
    }
    fotos.forEach((f, i) => f.addEventListener('click', () => { mostrar(i); lb.showModal() }))
    lb.querySelector('.lb-x').addEventListener('click', () => lb.close())
    lb.querySelector('.lb-ant').addEventListener('click', () => mostrar(atual - 1))
    lb.querySelector('.lb-prox').addEventListener('click', () => mostrar(atual + 1))
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close() })
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') mostrar(atual - 1)
      if (e.key === 'ArrowRight') mostrar(atual + 1)
    })
    lb.addEventListener('close', () => fotos[atual].focus())
  }

  // Hide the sticky button while the hero CTA or the footer is on screen.
  const fixo = document.querySelector('.fixo')
  const alvos = document.querySelectorAll('.heroi .btn, .pag-cab, .rodape, .faixa')
  if (fixo && 'IntersectionObserver' in window) {
    const vis = new Set()
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? vis.add(e.target) : vis.delete(e.target)))
      fixo.classList.toggle('oculto', vis.size > 0)
    })
    alvos.forEach((a) => io.observe(a))
  }
})()
