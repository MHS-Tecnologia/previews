// Mobile menu, sticky CTA, "open now" (Joinville time, from the published hours), shared bag.
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

  /* ---------- bag: kept in this browser only, turned into one WhatsApp message ---------- */
  var WA = 'https://wa.me/5547989029791?text=';
  var CHAVE = 'bembolado-sacola';
  var estado = { itens: [], modo: 'entregar' };
  try {
    var salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && Array.isArray(salvo.itens)) { estado = salvo; }
  } catch (e) { /* no storage: the bag lasts for this page */ }

  var reais = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };
  var q = function (s) { return document.querySelector(s); };
  var total = function () { return estado.itens.reduce(function (t, i) { return t + i.p * i.q; }, 0); };
  var conta = function () { return estado.itens.reduce(function (t, i) { return t + i.q; }, 0); };
  var escapa = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };

  function mensagem(extra) {
    var lista = estado.itens.slice();
    if (extra) { lista.push({ n: extra.n, p: extra.p, q: 1 }); }
    var soma = lista.reduce(function (t, i) { return t + i.p * i.q; }, 0);
    var linhas = lista.map(function (i) { return '- ' + (i.q > 1 ? i.q + 'x ' : '') + i.n + ', ' + reais(i.p * i.q); });
    var fim = estado.modo === 'retirar' ? 'Para retirar na loja.' : 'Para entregar.';
    var soma2 = 'Total ' + reais(soma) + (estado.modo === 'retirar' ? '.' : ', sem contar a entrega.');
    return WA + encodeURIComponent(['Oi, BemBolado! Vi o cardápio e queria:'].concat(linhas, [fim, soma2]).join('\n')).replace(/'/g, '%27');
  }

  function desenha() {
    try { localStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* see above */ }
    var n = conta(), rotulo = n === 1 ? '1 item' : n + ' itens';
    document.querySelectorAll('[data-qtd]').forEach(function (el) { el.textContent = n; });
    document.querySelectorAll('.cab-sac').forEach(function (el) { el.hidden = n === 0; });
    var ver = q('.ver-sac');
    if (ver) {
      ver.hidden = n === 0;
      ver.textContent = 'Ver sacola: ' + rotulo + ', ' + reais(total());
      fixa.classList.toggle('tem', n > 0);
    }
    var ul = q('#sac-lista');
    if (ul) {
      ul.innerHTML = estado.itens.map(function (i, k) {
        return '<li><div><strong>' + escapa(i.n) + '</strong><small>' + reais(i.p * i.q) + '</small></div>' +
          '<div class="qtd"><button type="button" data-muda="-1" data-k="' + k + '" aria-label="Tirar um de ' + escapa(i.n) + '">−</button><span>' + i.q + '</span>' +
          '<button type="button" data-muda="1" data-k="' + k + '" aria-label="Pôr mais um de ' + escapa(i.n) + '">+</button></div></li>';
      }).join('');
      q('.sac-vazia').hidden = n > 0;
      q('.sac-cheia').hidden = n === 0;
      q('#sac-total').textContent = reais(total());
      q('#sac-enviar').href = mensagem();
    }
    document.querySelectorAll('input[data-modo]').forEach(function (r) { r.checked = r.value === estado.modo; });
    document.dispatchEvent(new CustomEvent('sacola:muda'));
  }

  function poe(n, p) {
    var i = estado.itens.filter(function (x) { return x.n === n; })[0];
    if (i) { i.q += 1; } else { estado.itens.push({ n: n, p: p, q: 1 }); }
    desenha();
  }

  window.Sacola = {
    poe: poe,
    mensagem: mensagem,
    total: total,
    conta: conta
  };

  document.addEventListener('click', function (e) {
    var add = e.target.closest('a[data-n]');
    if (add) {
      e.preventDefault();
      poe(add.dataset.n, Number(add.dataset.p));
      var t = add.textContent;
      add.textContent = 'Na sacola';
      setTimeout(function () { add.textContent = t; }, 1200);
      return;
    }
    var dlg = q('#sacola');
    if (!dlg) { return; }
    if (e.target.closest('[data-abre-sacola]')) { dlg.showModal(); return; }
    if (e.target.closest('.sac-x') || e.target === dlg) { dlg.close(); return; }
    if (e.target.closest('.sac-limpar')) { estado.itens = []; desenha(); return; }
    var m = e.target.closest('[data-muda]');
    if (m) {
      var it = estado.itens[Number(m.dataset.k)];
      it.q += Number(m.dataset.muda);
      if (it.q < 1) { estado.itens.splice(Number(m.dataset.k), 1); }
      desenha();
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.matches('input[data-modo]')) { estado.modo = e.target.value; desenha(); }
  });
  desenha();
}());
