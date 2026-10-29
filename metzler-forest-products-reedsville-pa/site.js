// Landscape Center open/closed, from the hours posted on their site, in Reedsville's time zone.
;(function () {
  const els = document.querySelectorAll('[data-status]')
  const rows = document.querySelectorAll('tr[data-days]')
  if (!els.length && !rows.length) return
  const hours = { 1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 17], 6: [8, 13] }
  const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const fmt = (h) => (h === 12 ? '12 pm' : h > 12 ? (h - 12) + ' pm' : h + ' am')
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t).value
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  const now = +get('hour') + get('minute') / 60
  const today = hours[day]
  let open = false
  let text
  if (today && now >= today[0] && now < today[1]) {
    open = true
    text = 'Landscape Center is open now, until ' + fmt(today[1]) + '.'
  } else if (today && now < today[0]) {
    text = 'Landscape Center opens today at ' + fmt(today[0]) + '.'
  } else {
    let d = day
    do { d = (d + 1) % 7 } while (!hours[d])
    text = 'Landscape Center is closed now. Opens ' + (d === (day + 1) % 7 ? 'tomorrow' : names[d]) + ' at ' + fmt(hours[d][0]) + '.'
  }
  els.forEach((el) => {
    el.classList.add(open ? 'open' : 'closed')
    el.querySelector('[data-status-text]').textContent = text
  })
  rows.forEach((tr) => {
    if (tr.dataset.days.split(',').includes(String(day))) { tr.classList.add('today'); tr.setAttribute('aria-current', 'date') }
  })
})()

// Forty rings, one per year since 1986. Slightly irregular, like a real cookie cut from a log.
;(function () {
  const g = document.querySelector('[data-ring-g]')
  if (!g) return
  const NS = 'http://www.w3.org/2000/svg'
  const R = 214
  const N = 40
  let seed = 7
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  const wob = Array.from({ length: 5 }, () => [rnd() * 2 * Math.PI, 0.5 + rnd()])
  for (let i = 1; i <= N; i++) {
    const r = R * Math.pow(i / N, 0.82)
    let d = ''
    for (let k = 0; k <= 72; k++) {
      const a = (k / 72) * 2 * Math.PI
      const w = wob.reduce((s, [p, m], j) => s + Math.sin(a * (j + 2) + p) * m, 0) * (0.35 + r * 0.007)
      d += (k ? 'L' : 'M') + (Math.cos(a) * (r + w)).toFixed(1) + ' ' + (Math.sin(a) * (r + w) * 0.97).toFixed(1)
    }
    const p = document.createElementNS(NS, 'path')
    p.setAttribute('d', d + 'Z')
    p.setAttribute('class', 'ring' + (i === 6 || i === N ? ' mark-r' : i > 30 ? ' late' : ''))
    p.style.transitionDelay = (i * 28) + 'ms'
    g.appendChild(p)
  }
  const outer = g.lastChild.getAttribute('d')
  const bark = document.createElementNS(NS, 'path')
  bark.setAttribute('d', outer)
  bark.setAttribute('class', 'bark')
  const face = document.createElementNS(NS, 'path')
  face.setAttribute('d', outer)
  face.setAttribute('class', 'face')
  g.prepend(face)
  g.prepend(bark)
  const cookie = document.querySelector('[data-rings]')
  if (!('IntersectionObserver' in window)) return cookie.classList.add('in')
  new IntersectionObserver(([e], o) => { if (e.isIntersecting) { cookie.classList.add('in'); o.disconnect() } }, { threshold: 0.3 }).observe(cookie)
})()

// Phones: long tables start closed, and the call buttons dock once the page's own call buttons scroll away.
;(function () {
  if (matchMedia('(max-width: 900px)').matches) document.querySelectorAll('details[data-closed-m]').forEach((d) => { d.open = false })
  const dock = document.querySelector('.dock')
  const anchor = document.querySelector('[data-dock-anchor]')
  if (!dock || !anchor || !('IntersectionObserver' in window)) return
  new IntersectionObserver(([e]) => {
    dock.classList.toggle('on', !e.isIntersecting)
    document.body.classList.toggle('dock-on', !e.isIntersecting)
  }).observe(anchor)
})()

// Menus close on Escape or a click elsewhere.
;(function () {
  const menus = document.querySelectorAll('.drop, .menu details')
  const close = (except) => menus.forEach((m) => { if (m !== except) m.open = false })
  document.addEventListener('click', (e) => close(e.target.closest('.drop, .menu details')))
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
})()
