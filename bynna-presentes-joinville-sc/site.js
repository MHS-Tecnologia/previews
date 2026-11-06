// Próxima data no calendário, caixa de foto e botão fixo do WhatsApp.
(function () {
  var nos = document.querySelectorAll('.no[data-ate]')
  if (nos.length) {
    var mes = new Date().getMonth() + 1
    var dia = new Date().getDate()
    var prox = null
    nos.forEach(function (n) {
      var ate = +n.dataset.ate
      if (!prox && (ate > mes || (ate === mes && !(mes === 12 && dia > 25)))) prox = n
    })
    if (!prox) prox = nos[0]
    nos.forEach(function (n) { n.removeAttribute('data-proxima') })
    prox.setAttribute('data-proxima', '')
  }

  var dlg = document.querySelector('.caixa-foto')
  if (dlg && dlg.showModal) {
    var im = dlg.querySelector('.cf-img')
    var tit = dlg.querySelector('.cf-titulo')
    var wa = dlg.querySelector('.cf-wa')
    var base = wa.getAttribute('href').split('?')[0]
    document.querySelectorAll('.abre').forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.dataset.foto
        im.src = 'img/' + f + '-1200.webp'
        im.alt = b.dataset.alt
        tit.textContent = b.dataset.titulo
        wa.href = base + '?text=' + encodeURIComponent('Oi, Bynna! Vi no site “' + b.dataset.titulo + '” e queria uma parecida.')
        dlg.showModal()
      })
    })
    dlg.querySelector('.cf-fechar').addEventListener('click', function () { dlg.close() })
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close() })
  }

  var fixo = document.querySelector('.fixo')
  var alvo = document.querySelector('#cta') || document.querySelector('.pag-cab')
  if (fixo && alvo && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var v = !es[0].isIntersecting && es[0].boundingClientRect.top < 0
      fixo.classList.toggle('ver', v)
      fixo.toggleAttribute('aria-hidden', !v)
      v ? fixo.removeAttribute('tabindex') : fixo.setAttribute('tabindex', '-1')
    }).observe(alvo)
  }
})()
