// Menu do celular, barra fixa depois do hero, e a régua que se desenha uma vez.
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

  var barra = document.querySelector('.barra')
  var cta = document.getElementById('cta')
  if (barra && cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var e = es[0]
      barra.classList.toggle('ver', !e.isIntersecting && e.boundingClientRect.top < 0)
    }).observe(cta)
  }

  var regua = document.querySelector('.regua')
  var calmo = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (regua && !calmo && 'IntersectionObserver' in window) {
    regua.style.setProperty('--prog', '0')
    regua.classList.add('anima')
    var io = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting || es[0].boundingClientRect.top < 0) {
        regua.style.setProperty('--prog', '1')
        io.disconnect()
      }
    }, { threshold: 0.35 })
    io.observe(regua)
  }
})()
