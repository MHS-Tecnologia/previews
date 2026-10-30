// Barra de WhatsApp no celular: aparece depois do botão do topo.
(function () {
  var barra = document.querySelector('[data-barra]');
  // Só a home tem botão no topo; nas internas a barra fica sempre visível.
  var topo = document.querySelector('[data-cta-topo] .btn');
  var quadro = document.querySelector('.quadro');
  if (quadro) {
    var medir = function () { quadro.style.setProperty('--altura-quadro', quadro.offsetHeight + 'px'); };
    medir();
    addEventListener('resize', medir, { passive: true });
  }
  if (!barra) return;
  if (!topo || !('IntersectionObserver' in window)) { barra.classList.add('ver'); return; }
  // threshold 1: botão cortado pela dobra conta como fora da tela.
  new IntersectionObserver(function (e) {
    barra.classList.toggle('ver', e[0].intersectionRatio < 1);
  }, { threshold: 1 }).observe(topo);
})();
