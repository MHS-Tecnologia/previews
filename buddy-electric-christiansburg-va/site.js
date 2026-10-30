(function () {
  var bar = document.querySelector('.bar');
  var mark = document.querySelector('[data-after]');
  if (bar && mark && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      bar.classList.toggle('up', !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
    }).observe(mark);
  } else if (bar) bar.classList.add('up');

  var panel = document.querySelector('.panel');
  if (!panel) return;
  var img = document.getElementById('vimg');
  var title = document.getElementById('vt');
  var cap = document.getElementById('vc');
  var btns = panel.querySelectorAll('.brk');
  var more = panel.querySelector('.more');
  panel.classList.add('shut');
  more.addEventListener('click', function () {
    var shut = panel.classList.toggle('shut');
    more.textContent = shut ? 'Show all 16 circuits' : 'Show fewer circuits';
    more.setAttribute('aria-expanded', String(!shut));
  });
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.getAttribute('aria-pressed') === 'true') return;
      btns.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
      b.setAttribute('aria-pressed', 'true');
      var next = new Image();
      next.onload = function () {
        img.src = next.src;
        img.alt = b.dataset.alt;
        img.classList.toggle('fit', 'fit' in b.dataset);
        img.classList.remove('on');
        void img.offsetWidth;
        img.classList.add('on');
        title.textContent = b.dataset.t;
        cap.textContent = b.dataset.c;
      };
      next.src = 'img/' + b.dataset.i + '-800.webp';
    });
  });
})();
