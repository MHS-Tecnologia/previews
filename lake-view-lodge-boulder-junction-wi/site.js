// Room dialog for the lodge section drawing, and the mobile call bar.
(() => {
  const dlg = document.querySelector('.room-dialog')
  if (dlg && typeof dlg.showModal === 'function') {
    const im = dlg.querySelector('.dlg-img')
    const title = dlg.querySelector('#dlg-title')
    const text = dlg.querySelector('.dlg-text')
    const more = dlg.querySelector('.dlg-more')
    let opener = null
    document.querySelectorAll('.room[data-img]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        opener = a
        im.removeAttribute('src')
        im.width = +a.dataset.w
        im.height = +a.dataset.h
        im.srcset = a.dataset.srcset
        im.src = a.dataset.img
        im.alt = a.dataset.alt
        title.textContent = a.querySelector('.room-name').textContent
        text.textContent = a.dataset.text
        more.href = a.getAttribute('href')
        dlg.showModal()
      })
    })
    dlg.querySelector('.close').addEventListener('click', () => dlg.close())
    dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close() })
    dlg.addEventListener('close', () => { if (opener) opener.focus() })
  }

  const bar = document.querySelector('.callbar')
  const hero = document.querySelector('.hero, .page-head, .owners, .find')
  if (bar && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => {
      const show = !en.isIntersecting && en.boundingClientRect.top < 0
      bar.hidden = !show
      document.body.classList.toggle('has-bar', show)
    }).observe(hero)
  }

  document.addEventListener('click', (e) => {
    const m = document.querySelector('.menu[open]')
    if (m && !m.contains(e.target)) m.removeAttribute('open')
  })
})()
