// Lightbox for the portraits, and the sticky WhatsApp bar on phones.
(() => {
  const lupa = document.querySelector('dialog.lupa')
  if (lupa) {
    const foto = lupa.querySelector('img')
    const legenda = lupa.querySelector('p')
    document.querySelectorAll('.moldura').forEach((b) => {
      b.addEventListener('click', () => {
        foto.src = b.dataset.src
        foto.alt = b.querySelector('img').alt
        legenda.textContent = b.dataset.legenda
        lupa.showModal()
      })
    })
    lupa.querySelector('.fechar').addEventListener('click', () => lupa.close())
    lupa.addEventListener('click', (e) => { if (e.target === lupa) lupa.close() })
  }

  const fixa = document.querySelector('.fixa')
  const alvo = document.querySelector('#acoes-hero') || document.querySelector('.topo-pag')
  if (fixa && alvo && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      fixa.classList.toggle('ver', !e.isIntersecting && e.boundingClientRect.top < 0)
    }).observe(alvo)
  }
})()
