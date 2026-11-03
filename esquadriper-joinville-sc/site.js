// Barra de contato no celular: aparece depois do topo da página.
const fixo = document.querySelector('.fixo')
const alvo = document.querySelector('#cta') || document.querySelector('.topo-pag .acoes') || document.querySelector('.topo')
if (fixo && alvo && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => {
    fixo.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0)
  }).observe(alvo)
}

// Lista de obras: no celular mostra as primeiras e um botão para o resto.
const obras = document.querySelector('.obras[data-curta]')
const mais = document.querySelector('.mais')
if (obras && mais) {
  obras.classList.add('curta')
  mais.addEventListener('click', () => {
    obras.classList.remove('curta')
    mais.remove()
  })
}

// Catálogo: filtrar por material.
const filtro = document.querySelector('.filtro')
if (filtro) {
  filtro.hidden = false
  const botoes = [...filtro.querySelectorAll('button')]
  const itens = [...document.querySelectorAll('.itens li')]
  filtro.addEventListener('click', (ev) => {
    const b = ev.target.closest('button')
    if (!b) return
    botoes.forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    const m = b.dataset.m
    itens.forEach((li) => { li.hidden = m !== 'todos' && !li.dataset.m.split(' ').includes(m) })
    document.querySelectorAll('.cat').forEach((s) => {
      const visiveis = s.querySelectorAll('.itens li:not([hidden])').length
      s.hidden = visiveis === 0
    })
  })
}
