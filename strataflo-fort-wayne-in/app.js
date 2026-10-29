(() => {
  // Menu on small screens
  const head = document.getElementById('site-head')
  const btn = head && head.querySelector('.menu-btn')
  if (btn) btn.addEventListener('click', () => {
    const open = head.classList.toggle('open')
    btn.setAttribute('aria-expanded', String(open))
  })

  // Sticky call / email bar, once the page head has scrolled away
  const sticky = document.getElementById('sticky')
  const after = sticky && document.getElementById(sticky.dataset.after)
  if (sticky && after && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => {
      sticky.classList.toggle('show', !e.isIntersecting && e.boundingClientRect.top < 0)
    }).observe(after)
  }

  // Valve finder
  const list = document.getElementById('models')
  if (list) {
    const items = [...list.children]
    const count = document.getElementById('count')
    const more = document.getElementById('more')
    const state = { f: null, m: null }
    const mobile = matchMedia('(max-width: 860px)')
    let expanded = false
    const apply = () => {
      let n = 0
      items.forEach((li) => {
        const ok = (!state.f || li.dataset.fluids.split(' ').includes(state.f)) &&
                   (!state.m || li.dataset.mat.split(' ').includes(state.m))
        if (ok) n++
        li.hidden = !ok || (!expanded && !state.f && !state.m && mobile.matches && n > 10)
      })
      const filtered = state.f || state.m
      count.textContent = filtered ? `${n} valve${n === 1 ? '' : 's'} match` : `Showing all ${items.length} valves`
      more.hidden = expanded || filtered || !mobile.matches
    }
    document.querySelectorAll('.chip').forEach((c) => c.addEventListener('click', () => {
      const key = c.dataset.f ? 'f' : 'm'
      const val = c.dataset.f || c.dataset.m
      state[key] = state[key] === val ? null : val
      document.querySelectorAll(`.chip[data-${key}]`).forEach((o) =>
        o.setAttribute('aria-pressed', String(state[key] === (o.dataset.f || o.dataset.m))))
      apply()
    }))
    more.addEventListener('click', () => { expanded = true; apply() })
    mobile.addEventListener('change', apply)
    const h = decodeURIComponent(location.hash.slice(1))
    const chip = h && document.querySelector(`.chip[data-f="${CSS.escape(h)}"]`)
    if (chip) chip.click(); else apply()
  }

  // Modular builder
  const b = document.getElementById('builder')
  if (b) {
    const ends = JSON.parse(b.dataset.ends)
    const $ = (id) => document.getElementById(id)
    const fill = (side) => {
      const sizes = ends[$(side + '-type').value]
      const sel = $(side + '-size')
      const keep = sel.selectedIndex
      sel.innerHTML = sizes.map((s) => `<option>${s}</option>`).join('')
      sel.selectedIndex = Math.min(Math.max(keep, 0), sizes.length - 1)
    }
    const update = () => {
      const v = (n) => b.querySelector(`input[name="${n}"]:checked`).value
      const end = (side) => `${$(side + '-type').value}, ${$(side + '-size').value}`
      const spec = { Body: v('mat'), Seal: v('seal'), Inlet: end('inlet'), Outlet: end('outlet') }
      $('t-mat').textContent = spec.Body
      $('t-seal').textContent = spec.Seal
      $('t-in').textContent = spec.Inlet
      $('t-out').textContent = spec.Outlet
      const text = 'Hello Strataflo,\n\nI would like a quote for this modular check valve:\n\n' +
        Object.entries(spec).map(([k, x]) => `${k}: ${x}`).join('\n') +
        '\n\nQuantity:\nTiming:\n\nThank you.'
      $('t-mail').href = 'mailto:sales@strataflo.com?subject=' + encodeURIComponent('Modular valve quote') + '&body=' + encodeURIComponent(text)
    }
    ;['inlet', 'outlet'].forEach((s) => {
      $(s + '-type').addEventListener('change', () => { fill(s); update() })
      $(s + '-size').addEventListener('change', update)
    })
    $('outlet-type').value = 'Female pipe (NPT)'
    fill('inlet'); fill('outlet')
    b.addEventListener('change', update)
    update()
  }
})()
