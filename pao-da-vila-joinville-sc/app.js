// Menu do celular
const abre = document.querySelector('.abre')
const menu = document.getElementById('menu')
function fechar() {
  abre.setAttribute('aria-expanded', 'false')
  menu.classList.remove('aberto')
}
abre.addEventListener('click', () => {
  const aberto = abre.getAttribute('aria-expanded') === 'true'
  abre.setAttribute('aria-expanded', String(!aberto))
  menu.classList.toggle('aberto', !aberto)
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') fechar()
})
document.addEventListener('click', (e) => {
  if (!e.target.closest('.topo')) fechar()
})

// Botão fixo do celular: só depois do topo da página
const heroi = document.querySelector('[data-heroi]')
const fixo = document.querySelector('.fixo')
if (heroi && fixo && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => fixo.classList.toggle('visivel', !e.isIntersecting)).observe(heroi)
}

// A luz da vitrine acende quando ela entra na tela
const vitrine = document.querySelector('[data-vitrine]')
if (vitrine) {
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        vitrine.classList.add('acesa')
        obs.disconnect()
      }
    }, { threshold: 0.25 })
    obs.observe(vitrine)
  } else {
    vitrine.classList.add('acesa')
  }
}
