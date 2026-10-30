(function () {
  var bar = document.querySelector('.callbar'), mark = document.querySelector('[data-after]');
  if (bar && mark && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) { var l = e[e.length - 1]; bar.classList.toggle('on', !l.isIntersecting && l.boundingClientRect.top < 0); }).observe(mark);
  }
  var wide = window.matchMedia('(min-width: 861px)');
  function folds() { document.querySelectorAll('details.fold').forEach(function (d) { if (wide.matches) d.open = true; }); }
  folds(); wide.addEventListener('change', folds);
  var rv = document.querySelector('.rv'), mr = document.getElementById('more-rev');
  if (rv && mr) { rv.classList.add('collapsed'); mr.addEventListener('click', function () { rv.classList.remove('collapsed'); }); }
  var chips = document.querySelectorAll('.chips button'), items = document.querySelectorAll('.grid figure'), more = document.getElementById('more-work');
  if (chips.length) {
    var cap = window.matchMedia('(max-width: 860px)').matches ? 10 : 999, cat = 'all';
    function show() {
      var n = 0, over = false;
      items.forEach(function (f) {
        var hit = cat === 'all' || f.dataset.cat.split(' ').indexOf(cat) > -1;
        if (hit) n++;
        f.hidden = !hit || n > cap;
        if (hit && n > cap) over = true;
      });
      more.hidden = !over;
    }
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        chips.forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
        cat = b.dataset.f; show();
      });
    });
    more.addEventListener('click', function () { cap = 999; show(); });
    show();
  }
})();
