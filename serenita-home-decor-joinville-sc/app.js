// Mobile menu, sticky CTA and the shelf composer.
(function () {
  var bt = document.querySelector('.menu-bt')
  var nav = document.getElementById('nav')
  if (bt && nav) {
    var fecha = function () {
      nav.classList.remove('aberto')
      bt.setAttribute('aria-expanded', 'false')
      bt.textContent = 'Menu'
    }
    bt.addEventListener('click', function () {
      var abre = !nav.classList.contains('aberto')
      nav.classList.toggle('aberto', abre)
      bt.setAttribute('aria-expanded', String(abre))
      bt.textContent = abre ? 'Fechar' : 'Menu'
    })
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) fecha() })
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('aberto')) { fecha(); bt.focus() }
    })
  }

  // Shows after the hero's CTA leaves the screen; hides while another main CTA is on it.
  var fixo = document.querySelector('.fixo')
  var topo = document.querySelector('[data-cta-topo]')
  if (fixo && topo && 'IntersectionObserver' in window) {
    var passou = false
    var outros = 0
    var mostra = function () { fixo.classList.toggle('ver', passou && outros === 0) }
    new IntersectionObserver(function (es) {
      passou = !es[0].isIntersecting && es[0].boundingClientRect.top < 0
      mostra()
    }).observe(topo)
    var noOutro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { outros += e.isIntersecting ? 1 : (e.target.dataset.visto ? -1 : 0); e.target.dataset.visto = e.isIntersecting ? '1' : '' })
      mostra()
    })
    document.querySelectorAll('.fecho, .compor-fim').forEach(function (el) { noOutro.observe(el) })
  }

  var palco = document.querySelector('.pecas-palco')
  if (!palco) return
  var botoes = Array.prototype.slice.call(document.querySelectorAll('.escolha button'))
  var pedido = document.getElementById('pedir-pecas')
  var aviso = document.getElementById('compor-status')
  var rotulo = document.getElementById('pedir-rotulo')
  var vazio = document.getElementById('compor-vazio')
  var base = pedido.href.split('?')[0]
  var MAX = 5
  var ordem = botoes.filter(function (b) { return b.getAttribute('aria-pressed') === 'true' })

  function ajusta() {
    // The shelf is as tall as its pieces need: when they shrink to fit, it shrinks too.
    var est = getComputedStyle(palco)
    var livre = palco.clientWidth - parseFloat(est.paddingLeft) - parseFloat(est.paddingRight)
    var vao = parseFloat(est.columnGap) || 0
    var soma = 0
    var alta = 0
    ordem.forEach(function (b) {
      soma += b.dataset.alt * b.dataset.w / b.dataset.h
      alta = Math.max(alta, +b.dataset.alt)
    })
    var teto = Math.min(4, Math.max(2.5, innerWidth * 0.003))
    var u = soma ? Math.min(teto, (livre - vao * (ordem.length - 1)) / soma) : teto
    palco.style.setProperty('--u', u + 'px')
    palco.style.height = (soma ? u * alta + 36 : 170) + 'px'
  }

  function desenha(novo, saiu) {
    palco.textContent = ''
    ordem.forEach(function (b) {
      var p = document.createElement('span')
      p.className = b === novo ? 'p entra' : 'p'
      p.style.setProperty('--a', b.dataset.alt)
      var i = new Image()
      i.src = b.dataset.src
      i.alt = b.dataset.nome
      i.width = +b.dataset.w
      i.height = +b.dataset.h
      p.appendChild(i)
      palco.appendChild(p)
    })
    ajusta()
    var nomes = ordem.map(function (b) { return b.dataset.nome.toLowerCase() })
    var lista = nomes.length > 1
      ? nomes.slice(0, -1).join(', ') + ' e ' + nomes[nomes.length - 1]
      : nomes[0]
    pedido.href = nomes.length
      ? base + '?text=' + encodeURIComponent('Olá! Quero saber destas peças: ' + lista + '.')
      : base + '?text=' + encodeURIComponent('Olá! Quero ajuda para montar uma prateleira.')
    rotulo.textContent = nomes.length ? 'Perguntar por estas peças' : 'Pedir ajuda para montar'
    vazio.hidden = nomes.length > 0
    aviso.classList.toggle('avisa', !!saiu)
    aviso.textContent = saiu
      ? 'Cabem até cinco peças. Saiu: ' + saiu.dataset.nome.toLowerCase() + '. Entrou: ' + novo.dataset.nome.toLowerCase() + '.'
      : nomes.length + ' de ' + MAX + ' peças na prateleira.'
  }

  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      var i = ordem.indexOf(b)
      var novo = null
      var saiu = null
      if (i >= 0) {
        ordem.splice(i, 1)
        b.setAttribute('aria-pressed', 'false')
      } else {
        if (ordem.length >= MAX) {
          saiu = ordem.shift()
          saiu.setAttribute('aria-pressed', 'false')
        }
        ordem.push(b)
        b.setAttribute('aria-pressed', 'true')
        novo = b
      }
      desenha(novo, saiu)
    })
  })
  // The first pieces are already in the HTML, lazy: nothing to draw until a tap.
  addEventListener('resize', ajusta)
  ajusta()
})()
