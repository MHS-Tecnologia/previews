// Barra fixa do celular: aparece depois que o botão do topo sai da tela.
const barra = document.getElementById('barra')
const cta = document.getElementById('cta')
if (barra && cta && 'IntersectionObserver' in window) {
  barra.hidden = false
  new IntersectionObserver(([e]) => {
    barra.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0)
  }).observe(cta)
}

// Filtro da página de obras. Sem JS, todas as fotos aparecem.
const botoes = document.querySelectorAll('[data-filtro]')
botoes.forEach((b) => {
  b.addEventListener('click', () => {
    const f = b.dataset.filtro
    botoes.forEach((o) => o.setAttribute('aria-pressed', String(o === b)))
    document.querySelectorAll('#galeria figure').forEach((fig) => {
      fig.hidden = f !== 'todas' && fig.dataset.cat !== f
    })
  })
})
