// Menu do celular, barra fixa e o montador de recado da página Como pedir.
const NUMERO = '5547999340454'
const menu = document.querySelector('.menu')
if (menu) {
  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target)) menu.open = false
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') menu.open = false
  })
}

const barra = document.querySelector('.barra')
const abertura = document.querySelector('[data-abertura]')
if (barra && abertura && 'IntersectionObserver' in window) {
  new IntersectionObserver(([v]) => barra.classList.toggle('visivel', !v.isIntersecting)).observe(abertura)
} else if (barra) {
  barra.classList.add('visivel')
}

const montar = document.querySelector('[data-montar]')
if (montar) {
  const recado = montar.querySelector('[data-recado]')
  const links = document.querySelectorAll('[data-link-recado]')
  const escolhido = (grupo) => montar.querySelector(`[data-grupo="${grupo}"] [aria-pressed="true"]`).dataset.valor
  const atualizar = () => {
    const texto = `Olá! Quero encomendar ${escolhido('o-que')} para ${escolhido('ocasiao')}. Pode me ajudar?`
    recado.textContent = texto
    links.forEach((a) => { a.href = `https://wa.me/${NUMERO}?text=${encodeURIComponent(texto)}` })
  }
  montar.querySelectorAll('.opcoes button').forEach((b) => {
    b.addEventListener('click', () => {
      b.closest('.opcoes').querySelectorAll('button').forEach((o) => o.setAttribute('aria-pressed', String(o === b)))
      atualizar()
    })
  })
  atualizar()
}
