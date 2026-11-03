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
  var cta = document.getElementById('cta')
  if (fixo && !cta) fixo.classList.add('ver-fixo')
  if (fixo && cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var e = es[0]
      fixo.classList.toggle('ver-fixo', !e.isIntersecting && e.boundingClientRect.top < 0)
    }).observe(cta)
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
