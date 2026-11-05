// Barra fixa de agendamento no celular: aparece depois que o topo da página sai da tela.
(function () {
  var barra = document.getElementById('barra');
  var alvo = document.querySelector('.hero, .cab-pag');
  if (!barra || !alvo || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(function (e) {
    barra.classList.toggle('on', !e[0].isIntersecting);
  }).observe(alvo);
})();
