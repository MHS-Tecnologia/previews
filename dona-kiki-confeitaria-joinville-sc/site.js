// Botão fixo do celular: aparece depois que o botão principal da página sai da tela.
// Menu do celular: fecha com Esc.
(function () {
  var fixo = document.querySelector('.fixo')
  var cta = document.getElementById('cta') || document.querySelector('main .btn')
  if (fixo && cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var e = es[0]
      fixo.classList.toggle('ver', !e.isIntersecting && e.boundingClientRect.top < 0)
    }).observe(cta)
  }
  var menu = document.querySelector('.menu')
  if (menu) {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.open) {
        menu.open = false
        menu.querySelector('summary').focus()
      }
    })
  }
})()
