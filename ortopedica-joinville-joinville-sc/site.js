// Barra fixa do celular: aparece depois que os botões do topo saem da tela.
const barra = document.getElementById('barra')
const cta = document.getElementById('cta')
if (barra && 'IntersectionObserver' in window) {
  barra.hidden = false
  if (cta) {
    new IntersectionObserver(([e]) => {
      barra.classList.toggle('on', !e.isIntersecting && e.boundingClientRect.top < 0)
    }).observe(cta)
  } else {
    barra.classList.add('on')
  }
}
