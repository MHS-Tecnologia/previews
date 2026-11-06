// Botão fixo de WhatsApp no celular depois do herói, e a foto ampliada na página de peças.
(() => {
  const fixo = document.querySelector('.fixo')
  const alvo = document.querySelector('.heroi, .atac-heroi, .pagina-cab')
  if (fixo && alvo && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => fixo.classList.toggle('visivel', !e.isIntersecting)).observe(alvo)
  }

  const caixa = document.querySelector('.caixa')
  if (!caixa || typeof caixa.showModal !== 'function') return
  const foto = caixa.querySelector('img')
  const nome = caixa.querySelector('.caixa-nome')
  const pedir = caixa.querySelector('.caixa-rodape .btn')
  const base = pedir.href.split('?')[0]
  document.querySelectorAll('.zoom').forEach((b) => {
    b.addEventListener('click', () => {
      const img = b.querySelector('img')
      foto.src = b.dataset.full
      foto.alt = img.alt
      foto.width = img.width
      foto.height = img.height
      nome.textContent = b.dataset.nome
      pedir.href = `${base}?text=${encodeURIComponent(`Olá! Vi no site da Tai a peça "${b.dataset.nome}" e quero saber mais.`)}`
      caixa.showModal()
    })
  })
  caixa.querySelector('.caixa-fechar').addEventListener('click', () => caixa.close())
  caixa.addEventListener('click', (e) => { if (e.target === caixa) caixa.close() })
})()
