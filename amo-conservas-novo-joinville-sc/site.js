// The sign takes the colour of the jar. The mobile bar appears once the page's
// main button has scrolled away. On desktop the other-brand lists start open.
(function () {
  var placa = document.getElementById("placa");
  if (placa) {
    var txt = document.getElementById("placa-txt");
    var cta = document.getElementById("placa-cta");
    var ctaT = document.getElementById("placa-cta-t");
    var inicial = cta.getAttribute("href");
    var atual = null;
    var num = inicial.split("?")[0];
    var fixo = document.querySelector(".fixo");
    var fixoT = fixo && fixo.querySelector(".fixo-t");
    var fixoHref = fixo && fixo.getAttribute("href");
    var fixoTxt = fixoT && fixoT.textContent;
    document.querySelectorAll(".vidro").forEach(function (v) {
      v.addEventListener("click", function () {
        if (atual) atual.setAttribute("aria-pressed", "false");
        if (atual === v) {
          atual = null;
          placa.style.removeProperty("--cor");
          placa.style.removeProperty("--letra");
          txt.textContent = txt.dataset.original;
          cta.href = inicial;
          ctaT.textContent = "Pedir a tabela no WhatsApp";
          if (fixo) {
            fixo.href = fixoHref;
            fixoT.textContent = fixoTxt;
          }
          return;
        }
        atual = v;
        v.setAttribute("aria-pressed", "true");
        v.style.setProperty("--c", v.dataset.cor);
        placa.style.setProperty("--cor", v.dataset.cor);
        placa.style.setProperty("--letra", v.dataset.tinta);
        txt.textContent = "";
        var s = document.createElement("strong");
        s.textContent = v.dataset.nome;
        txt.appendChild(s);
        txt.appendChild(document.createTextNode(v.dataset.peso + ", com o rótulo Amo."));
        cta.href = num + "?text=" + encodeURIComponent("Olá! Quero o preço de " + v.dataset.nome + " (" + v.dataset.peso + ").");
        ctaT.textContent = "Pedir o preço deste vidro";
        if (fixo) {
          fixo.href = cta.href;
          fixoT.textContent = "Pedir preço: " + v.dataset.nome;
        }
      });
    });
    txt.dataset.original = txt.textContent;
  }

  var fixo = document.querySelector(".fixo");
  var topo = document.querySelector("[data-cta-topo]");
  if (fixo && topo && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      fixo.hidden = e[0].isIntersecting || e[0].boundingClientRect.top > 0;
    }).observe(topo);
  }

  var menu = document.querySelector(".menu");
  if (menu) {
    document.addEventListener("click", function (e) {
      if (menu.open && !menu.contains(e.target)) menu.open = false;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") menu.open = false;
    });
  }

  if (window.matchMedia("(min-width: 761px)").matches) {
    document.querySelectorAll(".outra").forEach(function (d) {
      d.open = true;
    });
  }
})();
