(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Signpost: planks swing level once, when the post scrolls into view.
  const posts = document.querySelectorAll('.post');
  if (!reduce && 'IntersectionObserver' in window && posts.length) {
    document.documentElement.classList.add('anim');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.25 });
    posts.forEach((p) => io.observe(p));
  }

  // Sticky call bar on the home page, once the hero has scrolled away.
  const sticky = document.getElementById('sticky');
  const hero = document.getElementById('hero');
  if (sticky && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { sticky.hidden = e.isIntersecting; }).observe(hero);
  }

  // Lightbox: photo grid buttons, and "See N photos" buttons on the rooms page.
  const lb = document.getElementById('lb');
  if (!lb || typeof lb.showModal !== 'function') return;
  const img = document.getElementById('lb-img');
  const cap = document.getElementById('lb-cap');
  const num = document.getElementById('lb-n');
  let set = [];
  let at = 0;
  const show = () => {
    const s = set[at];
    img.src = s.src;
    img.alt = s.alt;
    cap.textContent = s.alt;
    num.textContent = `${at + 1} of ${set.length}`;
  };
  const open = (items, i) => {
    set = items;
    at = i;
    show();
    lb.showModal();
  };
  const step = (d) => { at = (at + d + set.length) % set.length; show(); };
  const grid = [...document.querySelectorAll('.ph')];
  const gridItems = grid.map((b) => ({ src: b.dataset.src, alt: b.dataset.alt }));
  grid.forEach((b, i) => b.addEventListener('click', () => open(gridItems, i)));
  document.querySelectorAll('[data-gallery]').forEach((b) => {
    const t = document.querySelector(`template[data-set="${b.dataset.gallery}"]`);
    const items = [...t.content.querySelectorAll('i')].map((n) => ({ src: n.dataset.src, alt: n.dataset.alt }));
    b.addEventListener('click', () => open(items, 0));
  });
  document.getElementById('lb-prev').addEventListener('click', () => step(-1));
  document.getElementById('lb-next').addEventListener('click', () => step(1));
  document.getElementById('lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
  lb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
})();
