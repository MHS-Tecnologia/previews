// CTA fixo no celular: aparece depois que o botão do topo sai da tela
const topo = document.querySelector('[data-cta-topo]')
const fixo = document.querySelector('[data-fixo]')
if (topo && fixo && 'IntersectionObserver' in window) {
  const link = fixo.querySelector('a')
  new IntersectionObserver(([e]) => {
    const fora = !e.isIntersecting && e.boundingClientRect.top < 0
    fixo.classList.toggle('on', fora)
    link.tabIndex = fora ? 0 : -1
  }).observe(topo)
}

// Galeria: no celular, mostra 8 e abre o resto no botão
const galeria = document.querySelector('[data-galeria]')
const verMais = document.querySelector('[data-ver-mais]')
if (galeria && verMais) {
  verMais.hidden = false
  galeria.classList.remove('aberta')
  verMais.addEventListener('click', () => {
    const aberta = galeria.classList.toggle('aberta')
    verMais.setAttribute('aria-expanded', aberta)
    verMais.textContent = aberta ? 'Mostrar menos' : verMais.dataset.texto
  })
}

// Único movimento da página: as camadas do alongamento assentam uma a uma, uma vez
const camadas = document.querySelector('[data-camadas]')
if (camadas && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  camadas.classList.add('anima')
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { camadas.classList.add('on'); io.disconnect() }
  }, { threshold: 0.35 })
  io.observe(camadas)
}
