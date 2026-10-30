(function () {
  var barra = document.getElementById('barra-wa'), alvo = document.querySelector('[data-cta-topo]');
  if (!barra || !alvo || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (e) {
    var fora = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
    barra.classList.toggle('mostra', fora);
    barra.setAttribute('aria-hidden', fora ? 'false' : 'true');
    barra.querySelector('a').tabIndex = fora ? 0 : -1;
  }).observe(alvo);
})();
