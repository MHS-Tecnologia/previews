// Foto ampliada num <dialog>: abre pelo botão da foto, fecha no ×, no Esc ou no fundo.
const caixa = document.querySelector('dialog.caixa-foto')
if (caixa && caixa.showModal) {
  const img = caixa.querySelector('img')
  const leg = caixa.querySelector('figcaption')
  let origem = null
  document.addEventListener('click', (e) => {
    const b = e.target.closest('button.foto')
    if (!b) return
    origem = b
    img.src = b.dataset.grande
    img.alt = b.querySelector('img').alt
    leg.textContent = b.dataset.legenda
    caixa.showModal()
  })
  caixa.querySelector('.fechar').addEventListener('click', () => caixa.close())
  caixa.addEventListener('click', (e) => { if (e.target === caixa) caixa.close() })
  caixa.addEventListener('close', () => { if (origem) origem.focus() })
}

// Barra fixa do celular: só aparece depois que o botão do topo sai da tela.
const barra = document.querySelector('.barra')
const cta = document.querySelector('#cta, .pagina-topo .acoes')
if (barra) {
  if (cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => barra.classList.toggle('fora', e.isIntersecting || e.boundingClientRect.top > 0)).observe(cta)
  } else barra.classList.remove('fora')
}
