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

// Único movimento da página: as perguntas entram uma a uma, uma vez
const perguntas = document.querySelector('[data-perguntas]')
if (perguntas) {
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { perguntas.classList.add('on'); io.disconnect() }
    }, { threshold: 0.3 })
    io.observe(perguntas)
  } else {
    perguntas.classList.add('on')
  }
}
