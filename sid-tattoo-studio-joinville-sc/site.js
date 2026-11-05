// Sticky WhatsApp button on phones, once the first call to action has scrolled away.
(function () {
  var fixo = document.getElementById('fixo')
  var alvo = document.querySelector('.heroi .acoes, .cabeca')
  if (!fixo || !alvo || !('IntersectionObserver' in window)) return
  new IntersectionObserver(function (e) {
    fixo.classList.toggle('ativo', !e[0].isIntersecting && e[0].boundingClientRect.top < 0)
  }).observe(alvo)
})();

// Gallery: filter by motif, and open each photo in a dialog.
(function () {
  var galeria = document.querySelector('.galeria')
  if (!galeria) return
  var itens = [].slice.call(galeria.querySelectorAll('li'))
  var botoes = [].slice.call(document.querySelectorAll('.filtros button'))
  var contagem = document.getElementById('contagem')

  function filtrar(m) {
    var n = 0
    itens.forEach(function (li) {
      var mostra = m === 'todos' || li.dataset.motivos.split(' ').indexOf(m) >= 0
      li.hidden = !mostra
      if (mostra) n++
    })
    botoes.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.motivo === m)) })
    if (contagem) contagem.textContent = n === 1 ? '1 trabalho' : n + ' trabalhos'
  }
  botoes.forEach(function (b) {
    b.addEventListener('click', function () {
      filtrar(b.dataset.motivo)
      var url = new URL(location.href)
      if (b.dataset.motivo === 'todos') url.searchParams.delete('motivo')
      else url.searchParams.set('motivo', b.dataset.motivo)
      history.replaceState(null, '', url)
    })
  })
  var inicial = new URLSearchParams(location.search).get('motivo')
  filtrar(botoes.some(function (b) { return b.dataset.motivo === inicial }) ? inicial : 'todos')

  var luz = document.getElementById('luz')
  var img = luz.querySelector('img')
  var txt = luz.querySelector('p')
  var atual = 0
  function visiveis() { return itens.filter(function (li) { return !li.hidden }) }
  function mostrar(li) {
    var f = li.querySelector('img')
    img.src = f.dataset.grande
    img.alt = f.alt
    var leg = li.querySelector('.legenda')
    txt.textContent = leg.querySelector('b').textContent + '. ' + leg.lastChild.textContent.trim()
  }
  itens.forEach(function (li) {
    li.querySelector('button').addEventListener('click', function () {
      atual = visiveis().indexOf(li)
      mostrar(li)
      luz.showModal()
    })
  })
  function passo(d) {
    var v = visiveis()
    atual = (atual + d + v.length) % v.length
    mostrar(v[atual])
  }
  luz.querySelector('[data-acao="anterior"]').addEventListener('click', function () { passo(-1) })
  luz.querySelector('[data-acao="proxima"]').addEventListener('click', function () { passo(1) })
  luz.querySelector('[data-acao="fechar"]').addEventListener('click', function () { luz.close() })
  luz.addEventListener('click', function (e) { if (e.target === luz) luz.close() })
  luz.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') passo(-1)
    if (e.key === 'ArrowRight') passo(1)
  })
})();
