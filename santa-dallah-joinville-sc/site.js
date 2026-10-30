(function () {
  // A barra só aparece depois do primeiro botão, e some enquanto outro botão
  // de WhatsApp da página está na tela: dois iguais juntos são ruído.
  var barra = document.getElementById('barra-wa'), alvo = document.querySelector('[data-cta-topo]');
  if (!barra || !alvo || !('IntersectionObserver' in window)) return;
  var botoes = document.querySelectorAll('main a.btn'), visiveis = 0, passou = false;
  function atualiza() {
    var mostra = passou && visiveis === 0;
    barra.classList.toggle('mostra', mostra);
    barra.setAttribute('aria-hidden', mostra ? 'false' : 'true');
    barra.querySelector('a').tabIndex = mostra ? 0 : -1;
  }
  new IntersectionObserver(function (e) {
    passou = !e[0].isIntersecting && e[0].boundingClientRect.top < 0;
    atualiza();
  }).observe(alvo);
  var vigia = new IntersectionObserver(function (es) {
    es.forEach(function (x) {
      if (x.isIntersecting !== !!x.target.visivel) {
        x.target.visivel = x.isIntersecting;
        visiveis += x.isIntersecting ? 1 : -1;
      }
    });
    atualiza();
  });
  botoes.forEach(function (b) { vigia.observe(b); });
})();
