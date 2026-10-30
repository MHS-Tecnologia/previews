// Menu do celular, CTA fixo e a troca de caixinha na capa.
(function () {
  var menu = document.querySelector('.menu');
  if (menu) {
    document.addEventListener('click', function (e) {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') menu.open = false;
    });
  }

  var fixo = document.querySelector('.fixo');
  var topo = document.querySelector('[data-cta-topo]');
  var fecho = document.querySelector('.fecho');
  if (fixo && topo && 'IntersectionObserver' in window) {
    var topoVisivel = true, fechoVisivel = false;
    var atualiza = function () { fixo.classList.toggle('ver', !topoVisivel && !fechoVisivel); };
    new IntersectionObserver(function (es) { topoVisivel = es[0].isIntersecting; atualiza(); }).observe(topo);
    if (fecho) new IntersectionObserver(function (es) { fechoVisivel = es[0].isIntersecting; atualiza(); }).observe(fecho);
  }

  var capa = document.querySelector('[data-troca]');
  if (!capa) return;
  var botoes = capa.querySelectorAll('.trocar button');
  var carregar = function (img) {
    if (img.dataset.srcset) {
      img.srcset = img.dataset.srcset;
      img.removeAttribute('data-srcset');
    }
  };
  var mostrar = function (nome) {
    capa.querySelectorAll('[data-opcao]').forEach(function (el) {
      var ativa = el.dataset.opcao === nome;
      if (ativa) carregar(el);
      el.classList.toggle('ativa', ativa);
      if (el.closest('.capa-foto')) el.setAttribute('aria-hidden', ativa ? 'false' : 'true');
    });
    botoes.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.para === nome ? 'true' : 'false'); });
    capa.dataset.fita = capa.querySelector('button[data-para="' + nome + '"]').dataset.cor;
  };
  botoes.forEach(function (b) {
    b.addEventListener('click', function () { mostrar(b.dataset.para); });
    var antecipa = function () {
      capa.querySelectorAll('[data-opcao="' + b.dataset.para + '"]').forEach(carregar);
    };
    b.addEventListener('pointerenter', antecipa);
    b.addEventListener('focus', antecipa);
  });
})();
