// A tampa abre uma vez só: acabou, fica parada no lugar.
(function () {
  var t = document.querySelector('.tampa')
  if (t) t.addEventListener('animationend', function () { t.classList.add('fim') })
})();

// Barra fixa no celular, depois do primeiro botão de pedido.
(function () {
  var barra = document.querySelector('.barra')
  var alvo = document.querySelector('[data-cta-topo], .cab-int .btn-wa, .cab-int')
  var monte = document.getElementById('monte')
  if (!barra || !alvo || !('IntersectionObserver' in window)) return
  var passou = false
  var noMontador = false
  function atualiza() {
    // Dentro do montador quem pede é o resumo da caixa, não o pedido genérico.
    var ver = passou && !noMontador
    barra.classList.toggle('ver', ver)
    barra.querySelector('a').tabIndex = ver ? 0 : -1
  }
  new IntersectionObserver(function (e) {
    passou = !e[0].isIntersecting && e[0].boundingClientRect.top < 0
    atualiza()
  }).observe(alvo)
  if (monte) {
    new IntersectionObserver(function (e) {
      noMontador = e[0].isIntersecting
      atualiza()
    }).observe(monte)
  }
})();

// Cardápio: quem chega por um link de seção encontra a seção aberta.
(function () {
  function abre() {
    var d = document.getElementById(location.hash.slice(1))
    if (d && d.tagName === 'DETAILS') {
      d.open = true
      d.scrollIntoView()
    }
  }
  abre()
  addEventListener('hashchange', abre)
})();

// Monte sua caixa: as regras são as do cardápio publicado por eles.
(function () {
  var raiz = document.getElementById('montador')
  if (!raiz) return
  var NUM = raiz.dataset.wa
  var CAIXAS = {
    6: { col: 3, preco: 25, max: 3, letras: null, extra: ['Ovomaltine'] },
    12: { col: 4, preco: 45, max: 4, letras: 56, extra: ['Ovomaltine'] },
    16: { col: 4, preco: 60, max: 4, letras: 66, extra: ['Ovomaltine', 'Morango', 'Romeu e Julieta'] },
    25: { col: 5, preco: 100, max: 4, letras: 105, extra: ['Café'] }
  }
  var FOTO = {
    Brigadeiro: 'granulado', 'Dois Amores': 'ninho', Amendoim: 'roseta', 'Paçoca': 'roseta', Oreo: 'pedacos',
    Churros: 'branco', Ovomaltine: 'pedacos', 'Ninho com Nutella': 'ninho', Beijinho: 'ninho', Cajuzinho: 'cajuzinho',
    'Prestígio': 'ninho', 'Red velvet': 'rosa', 'Ferrero rocher': 'roseta', 'Kit Kat': 'pedacos', 'Meio amargo': 'granulado',
    'Palha italiana': 'branco', Morango: 'rosa', 'Romeu e Julieta': 'branco', 'Café': 'granulado'
  }
  var cel = raiz.querySelector('.celulas')
  var tamanhos = raiz.querySelectorAll('input[name=tamanho]')
  var sabores = raiz.querySelectorAll('input[name=sabor]')
  var chkLetras = raiz.querySelector('#com-letras')
  var boxLetras = raiz.querySelector('.letras')
  var txtLetras = raiz.querySelector('#frase')
  var totais = raiz.querySelectorAll('.total b')
  var resumos = raiz.querySelectorAll('.total span')
  var aviso = raiz.querySelector('.aviso-sabor')
  var pedidos = raiz.querySelectorAll('.pedir')
  var mini = raiz.querySelector('.mini')
  var receber = raiz.querySelectorAll('input[name=receber]')

  function tamanho() {
    for (var i = 0; i < tamanhos.length; i++) if (tamanhos[i].checked) return +tamanhos[i].value
    return 12
  }
  function escolhidos() {
    return [].filter.call(sabores, function (s) { return s.checked && !s.disabled }).map(function (s) { return s.value })
  }
  function desenha() {
    var n = tamanho()
    var c = CAIXAS[n]
    var lista = escolhidos()
    if (lista.length > c.max) {
      lista.slice(c.max).forEach(function (v) { raiz.querySelector('input[name=sabor][value="' + v + '"]').checked = false })
      lista = lista.slice(0, c.max)
    }
    ;[].forEach.call(sabores, function (s) {
      var so = s.dataset.so
      var existe = !so || c.extra.indexOf(s.value) > -1
      s.disabled = !existe || (lista.length >= c.max && !s.checked)
      if (!existe) s.checked = false
      s.closest('.opcao').hidden = !existe
    })
    lista = escolhidos()
    chkLetras.disabled = !c.letras
    if (!c.letras) chkLetras.checked = false
    boxLetras.classList.toggle('on', chkLetras.checked)
    txtLetras.maxLength = n
    var frase = chkLetras.checked ? txtLetras.value.toUpperCase().slice(0, n) : ''
    cel.style.setProperty('--col', c.col)
    var html = ''
    for (var i = 0; i < n; i++) {
      var sabor = lista.length ? lista[i % lista.length] : null
      var letra = frase.charAt(i).trim()
      html += '<div class="celula' + (sabor ? ' cheia' : '') + '">'
      if (sabor) html += '<img src="img/doce-' + FOTO[sabor] + '-200.webp" alt="" width="200" height="200">'
      if (letra) html += '<span>' + letra.replace(/[<&]/g, '') + '</span>'
      html += '</div>'
    }
    cel.innerHTML = html
    cel.style.setProperty('--lado', (cel.clientWidth / c.col) + 'px')
    mini.innerHTML = html
    mini.style.setProperty('--col', c.col)
    mini.style.setProperty('--lado', (58 / c.col) + 'px')
    var preco = chkLetras.checked ? c.letras : c.preco
    ;[].forEach.call(totais, function (t) { t.textContent = 'R$ ' + preco })
    ;[].forEach.call(resumos, function (r) { r.textContent = 'Caixa com ' + n + (chkLetras.checked ? ' e letras' : '') })
    aviso.textContent = lista.length >= c.max ? 'Pronto: a caixa de ' + n + ' leva até ' + c.max + ' sabores.' : ''
    var msg = 'Oi! Quero uma caixa com ' + n + ' brigadeiros gourmets'
    if (lista.length) msg += ', sabores: ' + lista.join(', ')
    if (frase.trim()) msg += ', com as letras de chocolate: ' + frase.trim()
    else if (chkLetras.checked) msg += ', com letras de chocolate'
    var retirada = receber[1].checked
    msg += '. Total R$ ' + preco + (retirada ? '. Vou retirar no Costa e Silva.' : ', mais a taxa de entrega. Quero receber por entrega.')
    msg = msg.replace(/['"]/g, ' ') + ' Pode me confirmar?'
    ;[].forEach.call(pedidos, function (p) { p.href = 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(msg) })
  }
  raiz.addEventListener('change', desenha)
  txtLetras.addEventListener('input', desenha)
  desenha()
})()
