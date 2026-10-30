// A tampa abre uma vez só: acabou, fica parada no lugar.
(function () {
  var t = document.querySelector('.tampa')
  if (t) t.addEventListener('animationend', function () { t.classList.add('fim') })
})();

// Barra fixa no celular, depois do primeiro botão de pedido.
(function () {
  var barra = document.querySelector('.barra')
  var alvo = document.querySelector('[data-cta-topo]')
  if (!barra || !alvo || !('IntersectionObserver' in window)) return
  new IntersectionObserver(function (e) {
    var saiu = !e[0].isIntersecting && e[0].boundingClientRect.top < 0
    barra.classList.toggle('ver', saiu)
    barra.querySelector('a').tabIndex = saiu ? 0 : -1
  }).observe(alvo)
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
  var total = raiz.querySelector('.total b')
  var resumo = raiz.querySelector('.total span')
  var aviso = raiz.querySelector('.aviso-sabor')
  var pedir = raiz.querySelector('.pedir')

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
    var preco = chkLetras.checked ? c.letras : c.preco
    total.textContent = 'R$ ' + preco
    resumo.textContent = 'Caixa com ' + n + (chkLetras.checked ? ' e letras' : '')
    aviso.textContent = lista.length >= c.max ? 'Pronto: a caixa de ' + n + ' leva até ' + c.max + ' sabores.' : ''
    var msg = 'Oi! Quero uma caixa com ' + n + ' brigadeiros gourmets'
    if (lista.length) msg += ', sabores: ' + lista.join(', ')
    if (frase.trim()) msg += ', com as letras de chocolate: ' + frase.trim()
    else if (chkLetras.checked) msg += ', com letras de chocolate'
    msg = msg.replace(/['"]/g, ' ') + '. Pode me confirmar?'
    pedir.href = 'https://wa.me/' + NUM + '?text=' + encodeURIComponent(msg)
  }
  raiz.addEventListener('change', desenha)
  txtLetras.addEventListener('input', desenha)
  desenha()
})()
