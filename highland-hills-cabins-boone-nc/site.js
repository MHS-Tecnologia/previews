(function () {
  var body = document.body;

  // Sticky call bar: on the home page it appears once the hero call button
  // has scrolled away; on inner pages it is there from the start.
  var cta = document.getElementById('hero-cta');
  if (!cta) {
    body.classList.add('show-bar');
  } else if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      var e = es[0];
      body.classList.toggle('show-bar', !e.isIntersecting && e.boundingClientRect.top < 0);
    }).observe(cta);
  }

  // Mobile menu: close on Escape or a click outside.
  var menu = document.querySelector('.menu');
  if (menu) {
    document.addEventListener('click', function (e) {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.open) { menu.open = false; menu.querySelector('summary').focus(); }
    });
  }

  // Group-size picker.
  var seats = document.querySelectorAll('.seat');
  var units = document.querySelectorAll('.unit');
  var status = document.getElementById('pick-status');
  var big = document.getElementById('big-group');
  if (!seats.length) return;
  var current = 0;
  function pick(n) {
    current = current === n ? 0 : n;
    seats.forEach(function (s) { s.setAttribute('aria-pressed', String(+s.dataset.n === current)); });
    var fits = 0;
    units.forEach(function (u) {
      var ok = !current || current > 12 || +u.dataset.sleeps >= current;
      u.classList.toggle('no', !ok);
      u.classList.toggle('fit', ok && !!current);
      if (ok) fits++;
    });
    big.hidden = current < 12;
    if (!current) status.textContent = 'Every cabin and condo, largest first.';
    else if (current > 12) status.textContent = 'More than 12: book several units together.';
    else status.textContent = fits + (fits === 1 ? ' unit sleeps ' : ' units sleep ') + current + (current === 1 ? ' guest.' : ' or more.');
  }
  seats.forEach(function (s) { s.addEventListener('click', function () { pick(+s.dataset.n); }); });
})();
