// Troca de tema no herói: o mesmo kit, outro painel. O botão do WhatsApp leva o tema escolhido.
(function () {
  var foto = document.getElementById('kit-foto')
  var nome = document.getElementById('kit-nome')
  var cta = document.getElementById('cta')
  var txt = document.getElementById('cta-txt')
  var botoes = document.querySelectorAll('.chips button[data-tema]')
  if (!foto || !botoes.length) return
  var calmo = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('aria-pressed') === 'true') return
      var id = b.getAttribute('data-tema')
      var tema = b.getAttribute('data-nome')
      botoes.forEach(function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false') })
      var trocar = function () {
        foto.srcset = 'img/h-' + id + '-480.webp 480w, img/h-' + id + '-720.webp 720w, img/h-' + id + '-960.webp 960w'
        foto.src = 'img/h-' + id + '-720.webp'
        foto.alt = b.getAttribute('data-alt')
      }
      if (calmo) {
        trocar()
      } else {
        foto.classList.add('troca')
        setTimeout(function () {
          foto.addEventListener('load', function () { foto.classList.remove('troca') }, { once: true })
          trocar()
          setTimeout(function () { foto.classList.remove('troca') }, 1500)
        }, 180)
      }
      nome.textContent = 'Tema: ' + tema
      txt.textContent = 'Quero o tema ' + tema
      cta.href = 'https://wa.me/5547996512707?text=' + encodeURIComponent(cta.getAttribute('data-base') + tema + '. Quero saber mais.')
    })
  })
})()
