// Mobile menu, sticky CTA, "open now" (Joinville time, from the published hours).
(function () {
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    var fechar = function () { nav.classList.remove('aberta'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu'; };
    btn.addEventListener('click', function () {
      var abre = !nav.classList.contains('aberta');
      nav.classList.toggle('aberta', abre);
      btn.setAttribute('aria-expanded', String(abre));
      btn.textContent = abre ? 'Fechar' : 'Menu';
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { fechar(); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) { fechar(); } });
  }

  var fixa = document.querySelector('.fixa');
  var alvo = document.querySelector('[data-topo]');
  if (fixa && alvo && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      fixa.classList.toggle('visivel', !es[0].isIntersecting);
    }).observe(alvo);
  } else if (fixa) { fixa.classList.add('visivel'); }

  // Sunday 0 ... Saturday 6: closing time in minutes; Monday closed
  var FECHA = [1350, 0, 1380, 1380, 1380, 1380, 1380];
  var ABRE = 900;
  var NOMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  var hora = function (m) { var h = Math.floor(m / 60), r = m % 60; return h + 'h' + (r ? r : ''); };
  try {
    var p = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    var v = {};
    p.forEach(function (x) { v[x.type] = x.value; });
    var dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(v.weekday);
    var min = (Number(v.hour) % 24) * 60 + Number(v.minute);
    var aberto = FECHA[dia] > 0 && min >= ABRE && min < FECHA[dia];
    var txt;
    if (aberto) { txt = 'Aberto agora, até ' + hora(FECHA[dia]); }
    else if (FECHA[dia] > 0 && min < ABRE) { txt = 'Fechado agora. Abre hoje às 15h'; }
    else {
      var d = (dia + 1) % 7;
      if (FECHA[d] === 0) { d = (d + 1) % 7; }
      txt = 'Fechado agora. Abre ' + (d === (dia + 1) % 7 ? 'amanhã' : NOMES[d]) + ' às 15h';
    }
    document.querySelectorAll('[data-agora]').forEach(function (el) { el.textContent = txt; el.classList.toggle('aberto', aberto); });
    var linha = document.querySelector('[data-dia="' + dia + '"]');
    if (linha) { linha.classList.add('hoje'); }
  } catch (e) { /* the static hours stay on the page */ }
}());
