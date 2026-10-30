/* Mafra, demo (MHS Tecnologia). Sem coleta de dados: a frase só vai para o wa.me se a pessoa tocar no botão. */
(function () {
  var NUM = '5547999296497';
  var entrada = document.querySelector('[data-frase]');
  var escrita = document.querySelector('[data-escrita]');
  var cta = document.querySelector('[data-cta-frase]');

  function linhas(txt) {
    txt = txt.trim();
    if (txt.length < 13 || txt.indexOf(' ') < 0) return [txt];
    var meio = txt.length / 2, melhor = -1, dist = 1e9;
    for (var i = 0; i < txt.length; i++) {
      if (txt[i] === ' ' && Math.abs(i - meio) < dist) { dist = Math.abs(i - meio); melhor = i; }
    }
    return [txt.slice(0, melhor), txt.slice(melhor + 1)];
  }

  function escrever(txt) {
    var ls = linhas(txt);
    var maior = ls.reduce(function (m, l) { return Math.max(m, l.length); }, 1);
    escrita.style.setProperty('--tam', Math.min(12.5, 40 / (maior * 0.31)).toFixed(2) + 'cqw');
    escrita.textContent = '';
    ls.forEach(function (l) {
      var s = document.createElement('span');
      s.textContent = l;
      escrita.appendChild(s);
    });
    var msg = txt.trim()
      ? 'Olá! Quero encomendar um bolo escrito: ' + txt.trim()
      : 'Olá! Quero encomendar um bolo.';
    cta.href = 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(msg);
  }

  if (entrada && escrita && cta) {
    escrita.classList.add('piping');
    entrada.addEventListener('input', function () {
      escrita.classList.remove('piping');
      escrever(entrada.value);
    });
    entrada.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); cta.click(); }
    });
  }

  var barra = document.querySelector('[data-barra]');
  var topo = document.querySelector('[data-cta-topo]');
  if (barra) {
    if (topo && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        barra.classList.toggle('on', !es[0].isIntersecting && es[0].boundingClientRect.top < 0);
      }).observe(topo);
    } else {
      window.addEventListener('scroll', function () { barra.classList.toggle('on', window.scrollY > 240); }, { passive: true });
    }
  }
})();
