// Barra fixa no celular: aparece depois do herói.
const fixa = document.querySelector('.fixa')
const heroi = document.querySelector('[data-heroi]')
if (fixa && heroi && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => fixa.classList.toggle('ligada', !e.isIntersecting)).observe(heroi)
}

// Toque no cachorro: os laços balançam.
const cao = document.querySelector('[data-cao]')
if (cao) {
  cao.addEventListener('click', () => {
    cao.classList.remove('abana')
    void cao.offsetWidth
    cao.classList.add('abana')
  })
}

// Copiar o endereço (a demo não leva para fora).
const copiar = document.querySelector('[data-copiar]')
if (copiar) {
  const aviso = document.querySelector('[data-copiado]')
  copiar.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copiar.dataset.copiar)
      aviso.textContent = 'Endereço copiado. É só colar no seu mapa.'
    } catch {
      aviso.textContent = 'Não deu para copiar aqui. Selecione o endereço acima.'
    }
  })
}
