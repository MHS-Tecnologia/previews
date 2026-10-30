// Menu do celular e o botão fixo depois do topo. Nada além disso.
const botao = document.querySelector('.menu-btn')
const menu = document.getElementById('menu')
botao.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto')
  botao.setAttribute('aria-expanded', String(aberto))
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('aberto')) {
    menu.classList.remove('aberto')
    botao.setAttribute('aria-expanded', 'false')
    botao.focus()
  }
})

const alvo = document.querySelector('[data-topo-cta]')
const fixo = document.querySelector('[data-fixo]')
if (alvo && fixo && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    const passou = !e.isIntersecting && e.boundingClientRect.top < 0
    fixo.classList.toggle('visivel', passou)
    fixo.querySelector('a').tabIndex = passou ? 0 : -1
  }).observe(alvo)
}
