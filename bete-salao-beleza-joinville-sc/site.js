// Menu e botão fixo no celular.
(function () {
  var botao = document.querySelector('.menu-bt');
  var nav = document.getElementById('nav');
  if (botao && nav) {
    var alternar = function (abrir) {
      nav.classList.toggle('aberta', abrir);
      botao.setAttribute('aria-expanded', String(abrir));
      botao.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    };
    botao.addEventListener('click', function () {
      alternar(botao.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { alternar(false); }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { alternar(false); }
    });
  }

  var fixo = document.querySelector('[data-fixo]');
  var heroi = document.querySelector('[data-hero-cta]');
  var fecho = document.querySelector('[data-fecho]');
  if (fixo && heroi && fecho && 'IntersectionObserver' in window) {
    var visiveis = new Set([heroi]);
    var observador = new IntersectionObserver(function (itens) {
      itens.forEach(function (item) {
        if (item.isIntersecting) { visiveis.add(item.target); } else { visiveis.delete(item.target); }
      });
      fixo.classList.toggle('mostra', visiveis.size === 0);
    });
    observador.observe(heroi);
    observador.observe(fecho);
  }
})();
