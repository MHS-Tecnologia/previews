// Barra fixa do WhatsApp no celular (aparece depois do herói) e caixa de foto ampliada.
(() => {
  const barra = document.getElementById('barra')
  const alvo = document.querySelector('[data-barra]')
  if (barra && alvo && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => barra.classList.toggle('on', !e.isIntersecting)).observe(alvo)
  } else if (barra) {
    barra.classList.add('on')
  }

  const caixa = document.getElementById('caixa')
  if (!caixa || typeof caixa.showModal !== 'function') return
  const img = caixa.querySelector('img')
  const txt = caixa.querySelector('p')
  let origem = null
  document.querySelectorAll('button.zoom').forEach((b) => {
    b.addEventListener('click', () => {
      const i = b.querySelector('img')
      img.src = b.dataset.grande
      img.alt = i.alt
      txt.textContent = i.alt
      origem = b
      caixa.showModal()
    })
  })
  caixa.querySelector('.fechar').addEventListener('click', () => caixa.close())
  caixa.addEventListener('click', (e) => { if (e.target === caixa) caixa.close() })
  caixa.addEventListener('close', () => { img.removeAttribute('src'); if (origem) origem.focus() })
})()
