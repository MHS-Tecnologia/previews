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

// Mural: no celular mostra 6 trabalhos e abre o resto no botão
const mural = document.querySelector('[data-mural]')
const mais = document.querySelector('[data-mais]')
if (mural && mais && matchMedia('(max-width: 959px)').matches) {
  mural.classList.add('fechado')
  mais.hidden = false
  mais.addEventListener('click', () => {
    mural.classList.remove('fechado')
    mais.hidden = true
  })
}
