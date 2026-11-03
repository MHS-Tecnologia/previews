// Marca o dia de hoje no trilho da semana (domingo: nenhum, o buffet fecha).
var hoje = new Date().getDay()
document.querySelectorAll('[data-semana] [data-dia="' + hoje + '"]').forEach(function (el) { el.classList.add('hoje') })

// CTA fixo no celular, depois que o botão do topo sai da tela.
var fixo = document.querySelector('[data-fixo]')
var topo = document.querySelector('[data-cta-topo]') || document.querySelector('.topo-pag, .hero')
if (fixo && topo && 'IntersectionObserver' in window) {
  new IntersectionObserver(function (e) {
    var ver = !e[0].isIntersecting && e[0].boundingClientRect.top < 0
    fixo.classList.toggle('ver', ver)
    var a = fixo.querySelector('a')
    if (a) a.tabIndex = ver ? 0 : -1
  }).observe(topo)
}
