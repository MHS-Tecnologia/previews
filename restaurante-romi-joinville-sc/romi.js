// Frase do dia a partir do horário real (fuso de Joinville) e CTA fixo no celular.
(function () {
  var alvo = document.getElementById('hoje');
  if (alvo) {
    try {
      var p = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false
      }).formatToParts(new Date());
      var v = {};
      p.forEach(function (x) { v[x.type] = x.value; });
      var dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(v.weekday);
      var min = (+v.hour % 24) * 60 + +v.minute;
      var util = dia >= 1 && dia <= 5;
      var texto;
      if (util && min < 690) texto = 'Hoje tem almoço das 11:30 às 14:00';
      else if (util && min < 840) texto = 'Hoje tem almoço até as 14:00';
      else if (dia >= 1 && dia <= 4) texto = 'Amanhã tem almoço a partir das 11:30';
      else texto = 'Segunda tem almoço a partir das 11:30';
      alvo.textContent = texto;
    } catch (e) { /* fica o horário fixo do HTML */ }
  }

  var fixo = document.getElementById('fixo');
  var heroi = document.querySelector('.heroi, .pag-cab');
  if (fixo && heroi && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      fixo.classList.toggle('visivel', !e[0].isIntersecting);
    }).observe(heroi);
  }
})();
