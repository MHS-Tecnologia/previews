// Shared by every page. Nothing here is needed to read the page; it only adds behaviour.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches

// The route on the home page lays its trace once, when the board scrolls into view.
const steps = document.getElementById('steps')
if (steps) {
  if ('IntersectionObserver' in window && !reduce) {
    document.documentElement.classList.add('armed')
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { steps.classList.add('in'); io.disconnect() } }, { threshold: .25 })
    io.observe(steps)
  } else steps.classList.add('in')
}

// Capability lists collapse on phones only (the initial state is set inline, before paint).
const phone = matchMedia('(max-width: 640px)')
const caps = document.querySelectorAll('.cap')
phone.addEventListener('change', () => caps.forEach((d) => { d.open = !phone.matches }))

// The menu closes on Escape and when a click lands outside it.
const menu = document.querySelector('.menu')
if (menu) {
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus() } })
  addEventListener('click', (e) => { if (menu.open && !menu.contains(e.target)) menu.open = false })
}

// Home: route the hero trace from the Call button to the photo's courtyard corner.
const trace = document.getElementById('lead-trace')
if (trace) {
  const hero = document.querySelector('.hero'), call = document.getElementById('hero-call'), frame = document.getElementById('hero-frame')
  const pad = (el, x, y) => { el.setAttribute('cx', x); el.setAttribute('cy', y) }
  const route = () => {
    const h = hero.getBoundingClientRect(), c = call.getBoundingClientRect(), f = frame.getBoundingClientRect()
    const cl = f.left - 9 - h.left, ct = f.top - 9 - h.top, cb = f.bottom + 9 - h.top
    let d
    if (f.left > c.right) {
      // side by side: leave the button, jog 45 degrees, land on the bottom-left corner
      const sx = c.right - h.left + 14, sy = c.top + c.height / 2 - h.top, run = Math.abs(cb - sy)
      const x1 = Math.max(sx + 8, sx + (cl - sx - run) / 2)
      d = `M${sx} ${sy}H${x1}L${x1 + run} ${cb}H${cl}`
      pad(trace.querySelector('.p1'), sx, sy); pad(trace.querySelector('.p2'), cl, cb)
    } else {
      // stacked: drop straight from the button onto the courtyard's top edge
      const x = c.left + c.width / 2 - h.left
      d = `M${x} ${c.bottom - h.top}V${ct}`
      pad(trace.querySelector('.p1'), -99, -99); pad(trace.querySelector('.p2'), x, ct)
    }
    trace.querySelector('path').setAttribute('d', d)
  }
  route()
  if (document.fonts) document.fonts.ready.then(route)
  addEventListener('resize', route)
}

// The sticky quote bar shows up once the page's first screen is gone.
const dock = document.getElementById('dock')
const first = document.querySelector('.hero, .sub')
if (dock && first) {
  new IntersectionObserver(([e]) => {
    const on = !e.isIntersecting
    dock.classList.toggle('on', on)
    dock.setAttribute('aria-hidden', String(!on))
    dock.querySelectorAll('a').forEach((a) => (on ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')))
  }).observe(first)
}
