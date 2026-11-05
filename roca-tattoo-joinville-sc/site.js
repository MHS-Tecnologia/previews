// Menu do celular, botão fixo depois do herói e a foto ampliada.
(function () {
  var btn = document.querySelector('.menu-btn')
  var menu = document.getElementById('menu')
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var aberto = menu.classList.toggle('aberto')
      btn.setAttribute('aria-expanded', aberto ? 'true' : 'false')
    })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('aberto')) {
        menu.classList.remove('aberto')
        btn.setAttribute('aria-expanded', 'false')
        btn.focus()
      }
    })
  }

  var fixo = document.querySelector('.fixo')
  // Início: o botão do herói. Páginas internas: o primeiro botão da página.
  var cta = document.getElementById('cta') || document.querySelector('main .btn')
  if (fixo && cta && 'IntersectionObserver' in window) {
    var passou = false
    var cobertos = new Set()
    var atualiza = function () { fixo.classList.toggle('ver-fixo', passou && cobertos.size === 0) }
    new IntersectionObserver(function (es) {
      var e = es[0]
      passou = !e.isIntersecting && e.boundingClientRect.top < 0
      atualiza()
    }).observe(cta)
    // Some o botão fixo quando ele cobriria uma legenda, outro botão ou o rodapé.
    var faixa = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) cobertos.add(e.target); else cobertos.delete(e.target) })
      atualiza()
    }, { rootMargin: '-' + Math.max(window.innerHeight - 90, 0) + 'px 0px 0px 0px' })
    document.querySelectorAll('figcaption, .leg, .rodape, main .btn').forEach(function (el) { faixa.observe(el) })
  }

  var lb = document.querySelector('.lb')
  if (lb && lb.showModal) {
    var img = lb.querySelector('img')
    var leg = lb.querySelector('p')
    document.querySelectorAll('.foto[data-grande]').forEach(function (b) {
      b.addEventListener('click', function () {
        var mini = b.querySelector('img')
        img.src = b.getAttribute('data-grande')
        img.alt = mini.alt
        leg.textContent = b.getAttribute('data-legenda') || ''
        lb.showModal()
      })
    })
    lb.querySelector('button').addEventListener('click', function () { lb.close() })
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close() })
  }
})()
