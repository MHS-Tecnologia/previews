// Troca o bolo na bancada, abre o menu, mostra a barra do WhatsApp.
(function () {
  var hero = document.querySelector('[data-hero]');
  if (hero) {
    var bolos = hero.querySelectorAll('.bolo');
    var botoes = hero.querySelectorAll('.tr');
    var nome = hero.querySelector('[data-nome]');
    botoes.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k;
        hero.dataset.bolo = k;
        nome.textContent = b.dataset.leg;
        botoes.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        bolos.forEach(function (i) {
          var ativo = i.dataset.k === k;
          i.classList.remove('pousa');
          i.classList.toggle('ativo', ativo);
          i.classList.toggle('vem', !ativo);
          i.setAttribute('aria-hidden', String(!ativo));
        });
      });
    });
  }
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  btn.addEventListener('click', function () {
    var aberto = nav.classList.toggle('aberta');
    btn.setAttribute('aria-expanded', String(aberto));
    btn.textContent = aberto ? 'Fechar' : 'Menu';
  });
  // Listas longas: abertas no computador, fechadas no celular.
  if (window.matchMedia('(min-width:861px)').matches) {
    document.querySelectorAll('[data-abre]').forEach(function (d) { d.open = true; });
  }
  var barra = document.querySelector('[data-barra]');
  var cta = document.querySelector('[data-cta-topo]');
  if (barra && cta && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      barra.classList.toggle('ver', !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
    }).observe(cta);
  }
})();
