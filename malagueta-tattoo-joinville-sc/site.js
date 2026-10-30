// Barra de WhatsApp no celular: aparece depois do botão do topo.
(function () {
  var barra = document.querySelector('[data-barra]');
  var topo = document.querySelector('[data-cta-topo] .btn, .topo');
  var quadro = document.querySelector('.quadro');
  if (quadro) {
    var medir = function () { quadro.style.setProperty('--altura-quadro', quadro.offsetHeight + 'px'); };
    medir();
    addEventListener('resize', medir, { passive: true });
  }
  if (!barra) return;
  if (!topo || !('IntersectionObserver' in window)) { barra.classList.add('ver'); return; }
  new IntersectionObserver(function (e) {
    barra.classList.toggle('ver', !e[0].isIntersecting);
  }).observe(topo);
})();
