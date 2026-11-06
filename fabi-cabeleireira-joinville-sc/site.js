// Escolha o penteado: troca a foto e leva o nome do estilo para o WhatsApp.
const NUM = '5547996762216'
const foto = document.getElementById('prov-foto')
if (foto) {
  const img = foto.querySelector('img')
  const nome = document.getElementById('prov-nome')
  const wa = document.getElementById('prov-wa')
  const botoes = [...document.querySelectorAll('.estilos button')]
  botoes.forEach((b) => b.addEventListener('click', () => {
    if (b.getAttribute('aria-pressed') === 'true') return
    botoes.forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
    const n = b.dataset.img
    const larg = b.dataset.sem1200 ? [480, 800] : [480, 800, 1200]
    foto.classList.add('trocando')
    const nova = new Image()
    nova.srcset = larg.map((w) => `img/${n}-${w}.webp ${w}w`).join(', ')
    nova.sizes = img.sizes
    nova.src = `img/${n}-800.webp`
    const aplica = () => {
      img.srcset = nova.srcset
      img.src = nova.src
      img.alt = b.dataset.alt
      foto.classList.remove('trocando')
    }
    nova.decode().then(aplica, aplica)
    const estilo = b.textContent.trim()
    nome.textContent = estilo
    wa.href = `https://wa.me/${NUM}?text=${encodeURIComponent(`Olá, Fabi! Vi no site o penteado "${estilo}" e quero agendar.`)}`
  }))
}

// Galeria: abre a foto grande num <dialog>.
const caixa = document.getElementById('caixa')
if (caixa) {
  const cimg = caixa.querySelector('img')
  const ctit = caixa.querySelector('.caixa-nome')
  const cwa = caixa.querySelector('.btn-wa')
  document.querySelectorAll('.galeria button').forEach((b) => b.addEventListener('click', () => {
    const n = b.dataset.img
    const w = b.dataset.sem1200 ? 800 : 1200
    cimg.src = `img/${n}-${w}.webp`
    cimg.alt = b.querySelector('img').alt
    const estilo = b.dataset.nome
    ctit.textContent = estilo
    cwa.href = `https://wa.me/${NUM}?text=${encodeURIComponent(`Olá, Fabi! Vi no site o penteado "${estilo}" e quero agendar.`)}`
    caixa.showModal()
  }))
  caixa.querySelector('.fechar').addEventListener('click', () => caixa.close())
  caixa.addEventListener('click', (e) => { if (e.target === caixa) caixa.close() })
}

// Barra do WhatsApp no celular depois do topo da página.
const barra = document.getElementById('barra')
const alvo = document.querySelector('.hero, .topo-pagina')
if (barra && alvo && 'IntersectionObserver' in window) {
  new IntersectionObserver(([e]) => barra.classList.toggle('on', !e.isIntersecting)).observe(alvo)
}
