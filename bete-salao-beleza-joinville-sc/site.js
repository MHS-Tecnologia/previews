// Menu, comparador de antes e depois e botão fixo no celular.
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

  document.querySelectorAll('[data-compara]').forEach(function (cena) {
    var campo = cena.querySelector('input');
    var aplicar = function (valor) {
      cena.style.setProperty('--pos', valor + '%');
    };
    var moverPara = function (x) {
      var r = cena.getBoundingClientRect();
      var valor = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
      campo.value = Math.round(valor);
      aplicar(valor);
    };
    campo.addEventListener('input', function () { aplicar(campo.value); });
    cena.addEventListener('pointerdown', function (e) {
      cena.setPointerCapture(e.pointerId);
      moverPara(e.clientX);
    });
    cena.addEventListener('pointermove', function (e) {
      if (cena.hasPointerCapture(e.pointerId)) { moverPara(e.clientX); }
    });
  });

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
