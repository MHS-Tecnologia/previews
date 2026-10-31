// Sticky call bar on phones once the first screen has passed; every photo group open on desktop.
(function () {
  var bar = document.querySelector('.callbar')
  var mark = document.querySelector('[data-after]')
  if (bar && mark && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      bar.classList.toggle('show', !e[0].isIntersecting)
    }).observe(mark)
  }
  function abre() {
    if (window.innerWidth > 900) {
      document.querySelectorAll('details.grp, details.xtra').forEach(function (d) { d.open = true })
    }
  }
  abre()
  addEventListener('resize', abre)
  // The mobile menu closes with Escape.
  addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var m = document.querySelector('.nav-m[open]')
      if (m) { m.open = false; m.querySelector('summary').focus() }
    }
  })
})()
