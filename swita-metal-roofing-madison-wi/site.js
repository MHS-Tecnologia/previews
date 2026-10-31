// Three small jobs: the seam you can drag, the phone menu, the sticky call bar.
(function () {
  var frame = document.querySelector('.frame');
  if (frame) {
    var range = frame.querySelector('input');
    var move = function () {
      frame.querySelectorAll('.strip').forEach(function (s) { s.remove(); });
      var v = Number(range.value);
      frame.style.setProperty('--x', v + '%');
      frame.dataset.end = v < 12 ? 'b' : v > 88 ? 'a' : '';
    };
    range.addEventListener('input', move);
  }

  // Long galleries collapse on phones only.
  var wide = window.matchMedia('(min-width:861px)');
  var galleries = function () {
    document.querySelectorAll('.gal-more').forEach(function (d) { if (wide.matches) d.open = true; });
  };
  galleries();
  wide.addEventListener('change', galleries);

  var menu = document.querySelector('.menu');
  if (menu) {
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') menu.open = false; });
    document.addEventListener('click', function (e) { if (menu.open && !menu.contains(e.target)) menu.open = false; });
  }

  var bar = document.querySelector('.callbar');
  var first = document.querySelector('.hero, .top');
  if (bar && first && 'IntersectionObserver' in window) {
    document.body.classList.add('has-bar');
    new IntersectionObserver(function (es) {
      bar.classList.toggle('on', !es[0].isIntersecting);
    }).observe(first);
  }
})();
