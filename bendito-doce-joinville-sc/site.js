(function () {
  var calmo = matchMedia('(prefers-reduced-motion: reduce)').matches

  // Menu do celular
  var abre = document.querySelector('.abre-menu')
  var caixa = document.getElementById('menu')
  function menu(aberto) {
    caixa.classList.toggle('aberto', aberto)
    abre.setAttribute('aria-expanded', aberto)
    abre.textContent = aberto ? 'Fechar' : 'Menu'
    document.documentElement.style.overflow = aberto ? 'hidden' : ''
  }
  if (abre && caixa) {
    abre.addEventListener('click', function () { menu(!caixa.classList.contains('aberto')) })
    caixa.addEventListener('click', function (e) { if (e.target.closest('a')) menu(false) })
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && caixa.classList.contains('aberto')) { menu(false); abre.focus() }
    })
    addEventListener('resize', function () { if (innerWidth > 860) menu(false) })
  }

  // A cor se espalha a partir de onde a pessoa tocou, e o bolo troca junto.
  function trocarCor(campo, cor, origem) {
    var classe = 'c-' + cor
    if (campo.classList.contains(classe)) return
    var antes = Array.prototype.find.call(campo.classList, function (c) { return c.indexOf('c-') === 0 })
    if (calmo || !campo.animate) {
      campo.classList.remove(antes); campo.classList.add(classe)
      return
    }
    var caixaCampo = campo.getBoundingClientRect()
    var x = 50, y = 50
    if (origem) {
      var o = origem.getBoundingClientRect()
      x = o.left + o.width / 2 - caixaCampo.left
      y = o.top + o.height / 2 - caixaCampo.top
    }
    var r = Math.hypot(Math.max(x, caixaCampo.width - x), Math.max(y, caixaCampo.height - y))
    var onda = document.createElement('div')
    onda.className = 'onda ' + classe
    campo.style.backgroundColor = getComputedStyle(campo).backgroundColor
    campo.insertBefore(onda, campo.firstChild)
    campo.classList.remove(antes); campo.classList.add(classe)
    onda.animate(
      [{ clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }, { clipPath: 'circle(' + r + 'px at ' + x + 'px ' + y + 'px)' }],
      { duration: 620, easing: 'cubic-bezier(.3,.7,.2,1)' }
    ).onfinish = function () {
      campo.style.backgroundColor = ''
      onda.remove()
    }
  }

  function trocarBolo(palco, cor) {
    if (!palco) return
    var atual = palco.querySelector('img.ativo')
    var nova = palco.querySelector('img[data-cor="' + cor + '"]')
    if (!nova || nova === atual) return
    if (nova.dataset.srcset) { nova.srcset = nova.dataset.srcset; nova.removeAttribute('data-srcset') }
    if (atual) {
      atual.classList.remove('ativo'); atual.classList.add('saindo')
      setTimeout(function () { atual.classList.remove('saindo') }, 560)
    }
    nova.classList.add('ativo')
  }

  // Carrega os outros bolos só depois da página pronta.
  function carregar(palco) {
    palco.querySelectorAll('img[data-srcset]').forEach(function (im) {
      var previa = new Image()
      previa.sizes = im.sizes
      previa.srcset = im.dataset.srcset
    })
  }

  var hero = document.querySelector('.hero')
  if (hero) {
    var palco = hero.querySelector('.palco')
    var botoes = [].slice.call(hero.querySelectorAll('.bolinha'))
    var legenda = hero.querySelector('.legenda')
    var mostrar = function (b) {
      botoes.forEach(function (o) { o.setAttribute('aria-pressed', o === b) })
      trocarCor(hero, b.dataset.cor, b)
      trocarBolo(palco, b.dataset.cor)
      if (legenda) legenda.textContent = b.dataset.nome
    }
    var mexeu = false
    botoes.forEach(function (b) {
      b.addEventListener('click', function () { mexeu = true; mostrar(b) })
    })
    addEventListener('load', function () {
      carregar(palco)
      // Duas trocas sozinhas ao abrir, para mostrar que os bolos mudam. Depois para.
      if (calmo) return
      ;[1, 2].forEach(function (n) {
        setTimeout(function () {
          if (mexeu || scrollY > 200 || document.hidden) return
          mostrar(botoes[n])
        }, 2000 * n)
      })
    })
  }

  // CTA fixo no celular: aparece depois da abertura e sai perto do fecho.
  var fixo = document.querySelector('.fixo')
  var inicio = document.querySelector('[data-abertura]')
  var fecho = document.querySelector('[data-fecho]')
  if (fixo && inicio && 'IntersectionObserver' in window) {
    var passou = false, noFecho = false
    var aplica = function () { fixo.classList.toggle('ver', passou && !noFecho) }
    new IntersectionObserver(function (es) { passou = !es[0].isIntersecting; aplica() }).observe(inicio)
    if (fecho) new IntersectionObserver(function (es) { noFecho = es[0].isIntersecting; aplica() }).observe(fecho)
  }

  // Monte seu pedido
  var monte = document.querySelector('.monte')
  if (monte) {
    var numero = monte.dataset.numero
    var previa = monte.querySelector('.previa')
    var conta = monte.querySelector('.conta')
    var data = monte.querySelector('.data')
    var saidas = document.querySelectorAll('[data-enviar]')
    var palcoMonte = monte.querySelector('.palco')
    var pedido = { ocasiao: '', cor: '' }
    var hoje = new Date(); hoje.setHours(0, 0, 0, 0)
    var diasAte = function (valor) {
      var p = valor.split('-')
      return Math.round((new Date(+p[0], +p[1] - 1, +p[2]) - hoje) / 864e5)
    }
    var minimo = new Date(hoje); minimo.setDate(minimo.getDate() + 5)
    data.min = minimo.getFullYear() + '-' + String(minimo.getMonth() + 1).padStart(2, '0') + '-' + String(minimo.getDate()).padStart(2, '0')
    var montar = function () {
      var t = 'Oi! Quero encomendar um bolo personalizado'
      if (pedido.ocasiao) t += ' para ' + pedido.ocasiao
      if (pedido.cor) t += ', ' + pedido.cor
      if (data.value && diasAte(data.value) >= 0) {
        var p = data.value.split('-')
        t += ', para o dia ' + p[2] + '/' + p[1] + '/' + p[0]
      }
      t += '.'
      previa.textContent = t
      saidas.forEach(function (a) { a.href = 'https://wa.me/' + numero + '?text=' + encodeURIComponent(t) })
    }
    monte.querySelectorAll('[data-grupo]').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var f = e.target.closest('.ficha')
        if (!f) return
        var ligado = f.getAttribute('aria-pressed') === 'true'
        g.querySelectorAll('.ficha').forEach(function (o) { o.setAttribute('aria-pressed', 'false') })
        f.setAttribute('aria-pressed', ligado ? 'false' : 'true')
        pedido[g.dataset.grupo] = ligado ? '' : f.dataset.texto
        if (g.dataset.grupo === 'cor' && !ligado) {
          trocarCor(monte, f.dataset.cor, f)
          trocarBolo(palcoMonte, f.dataset.cor)
        }
        montar()
      })
    })
    data.addEventListener('change', function () {
      if (!data.value) { conta.textContent = ''; return montar() }
      var dias = diasAte(data.value)
      var prazo = ' A encomenda pede 5 dias de antecedência.'
      if (dias < 0) conta.textContent = 'Essa data já passou. Escolha outra.'
      else if (dias === 0) conta.textContent = 'A festa é hoje.' + prazo
      else if (dias === 1) conta.textContent = 'A festa é amanhã.' + prazo
      else if (dias < 5) conta.textContent = 'Faltam ' + dias + ' dias.' + prazo
      else conta.textContent = 'Faltam ' + dias + ' dias. Dá para encomendar.'
      montar()
    })
    if (palcoMonte) addEventListener('load', function () { carregar(palcoMonte) })
    montar()
  }
})()
