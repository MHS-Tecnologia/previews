// Menu, barra de WhatsApp, cartela de cores e filtros. Sem dependências.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s) }
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)) }

  // Menu no celular
  var btn = $('.menu-btn')
  var menu = $('#menu')
  function abrirMenu(aberto) {
    btn.setAttribute('aria-expanded', String(aberto))
    btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu')
    menu.classList.toggle('aberto', aberto)
  }
  btn.addEventListener('click', function () {
    abrirMenu(btn.getAttribute('aria-expanded') !== 'true')
  })
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      abrirMenu(false)
      btn.focus()
    }
  })
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.topo')) abrirMenu(false)
  })

  // Barra fixa do WhatsApp depois do primeiro bloco
  var barra = $('.barra-wa')
  var hero = $('[data-hero]')
  if (barra && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      barra.hidden = es[0].isIntersecting
    }).observe(hero)
  }

  // Cartela de cores da home
  var cartela = $('[data-cartela]')
  if (cartela) {
    var dados = JSON.parse($('#palco-dados').textContent)
    var palco = $('[data-palco]', cartela)
    var link = $('[data-palco-link]', cartela)
    var botoes = $$('.amostra', cartela)
    var mostrar = function (cor) {
      var d = dados[cor]
      cartela.dataset.cor = cor
      botoes.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cor === cor)) })
      link.href = 'trabalhos.html?cor=' + cor
      link.textContent = 'Ver as ' + d.total + ' fotos em ' + d.nome.toLowerCase()
      palco.textContent = ''
      d.fotos.forEach(function (f) {
        var fig = document.createElement('figure')
        var img = new Image(f.w, f.h)
        img.src = f.src
        img.srcset = f.srcset
        img.sizes = '(max-width: 860px) 92vw, 380px'
        img.alt = f.t
        var leg = document.createElement('figcaption')
        leg.textContent = f.t
        fig.appendChild(img)
        fig.appendChild(leg)
        palco.appendChild(fig)
      })
    }
    botoes.forEach(function (b) {
      b.addEventListener('click', function () { mostrar(b.dataset.cor) })
    })
  }

  // Filtros da galeria
  var mural = $('[data-mural]')
  if (mural) {
    var tiles = $$('.tile', mural)
    var bCor = $$('[data-filtro-cor]')
    var bEstilo = $$('[data-filtro-estilo]')
    var limpar = $('[data-limpar]')
    var contagem = $('[data-contagem]')
    var vazio = $('[data-vazio]')
    var cor = null
    var estilo = null
    var aplicar = function () {
      var n = 0
      tiles.forEach(function (t) {
        var ok = (!cor || t.dataset.cor === cor) && (!estilo || t.dataset.estilos.split(' ').indexOf(estilo) >= 0)
        t.hidden = !ok
        if (ok) n++
      })
      bCor.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filtroCor === cor)) })
      bEstilo.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.filtroEstilo === estilo)) })
      contagem.textContent = n + (n === 1 ? ' foto' : ' fotos')
      limpar.hidden = !cor && !estilo
      vazio.hidden = n > 0
    }
    bCor.forEach(function (b) {
      b.addEventListener('click', function () {
        cor = cor === b.dataset.filtroCor ? null : b.dataset.filtroCor
        aplicar()
      })
    })
    bEstilo.forEach(function (b) {
      b.addEventListener('click', function () {
        estilo = estilo === b.dataset.filtroEstilo ? null : b.dataset.filtroEstilo
        aplicar()
      })
    })
    limpar.addEventListener('click', function () {
      cor = null
      estilo = null
      aplicar()
    })
    var q = new URLSearchParams(location.search)
    cor = bCor.some(function (b) { return b.dataset.filtroCor === q.get('cor') }) ? q.get('cor') : null
    estilo = bEstilo.some(function (b) { return b.dataset.filtroEstilo === q.get('estilo') }) ? q.get('estilo') : null
    if (cor || estilo) aplicar()

    // Foto ampliada
    var zoom = $('[data-zoom]')
    var zImg = $('img', zoom)
    $$('.tile-foto').forEach(function (b) {
      b.addEventListener('click', function () {
        zImg.width = +b.dataset.w
        zImg.height = +b.dataset.h
        zImg.src = b.dataset.grande
        zImg.alt = b.dataset.t
        $('[data-zoom-t]', zoom).textContent = b.dataset.t
        $('[data-zoom-wa]', zoom).href = b.dataset.wa
        zoom.showModal()
      })
    })
    $('[data-zoom-fechar]', zoom).addEventListener('click', function () { zoom.close() })
    zoom.addEventListener('click', function (e) {
      if (e.target === zoom) zoom.close()
    })
  }
})()
