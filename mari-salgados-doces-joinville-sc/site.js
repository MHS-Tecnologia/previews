// Lightbox for the display-case trays and cake slices, sticky order bar on mobile, menu close.
(() => {
  const d = document.querySelector('dialog.foto')
  if (d) {
    const img = d.querySelector('img')
    const leg = d.querySelector('.leg')
    document.querySelectorAll('[data-grande]').forEach((b) => {
      b.addEventListener('click', () => {
        img.src = b.dataset.grande
        img.alt = b.querySelector('img').alt
        leg.textContent = b.dataset.nome
        d.showModal()
      })
    })
    d.querySelector('.fechar').addEventListener('click', () => d.close())
    d.addEventListener('click', (e) => { if (e.target === d) d.close() })
  }

  const barra = document.querySelector('.barra')
  const alvo = document.querySelector('[data-apos]')
  if (barra && alvo && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      const passou = !e.isIntersecting && e.boundingClientRect.top < 0
      barra.classList.toggle('ver', passou)
      barra.toggleAttribute('inert', !passou)
    }).observe(alvo)
    barra.setAttribute('inert', '')
  }

  if (matchMedia('(max-width: 900px)').matches) document.querySelectorAll('details.dobra').forEach((d) => d.removeAttribute('open'))

  document.addEventListener('click', (e) => {
    document.querySelectorAll('details.menu[open]').forEach((m) => { if (!m.contains(e.target)) m.removeAttribute('open') })
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.querySelectorAll('details.menu[open]').forEach((m) => m.removeAttribute('open'))
  })
})()
