// Menu do celular
const botao = document.querySelector('.menu-btn')
const menu = document.getElementById('menu-cel')
if (botao && menu) {
  const fecha = () => { menu.hidden = true; botao.setAttribute('aria-expanded', 'false'); botao.setAttribute('aria-label', 'Abrir menu') }
  botao.addEventListener('click', () => {
    const abrir = menu.hidden
    menu.hidden = !abrir
    botao.setAttribute('aria-expanded', String(abrir))
    botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu')
  })
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecha() })
  document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('.cab')) fecha() })
}

// CTA fixo: aparece depois que o botão do topo sai da tela
const topo = document.querySelector('[data-cta-topo]')
const fixo = document.querySelector('[data-fixo]')
if (topo && fixo && 'IntersectionObserver' in window) {
  const link = fixo.querySelector('a')
  new IntersectionObserver(([e]) => {
    fixo.classList.toggle('on', !e.isIntersecting)
    link.tabIndex = e.isIntersecting ? -1 : 0
  }).observe(topo)
}

// Apertar a figurinha
document.querySelectorAll('[data-aperta]').forEach(f => {
  f.addEventListener('pointerdown', () => {
    f.classList.remove('aperta')
    void f.offsetWidth
    f.classList.add('aperta')
  })
  f.addEventListener('animationend', () => f.classList.remove('aperta'))
})
