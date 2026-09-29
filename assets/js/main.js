// Lähde – sivun toiminnot: mobiilivalikko, paketin valinta ja demolomake.
(function () {
  "use strict";

  // Vuosiluku alatunnisteeseen
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobiilivalikko
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    var setOpen = function (open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Sulje valikko" : "Avaa valikko");
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Hinnoittelukorttien painikkeet merkitsevät valitun paketin lomakkeeseen
  var planInput = document.getElementById("f-plan");
  document.querySelectorAll("[data-plan]").forEach(function (el) {
    el.addEventListener("click", function () {
      if (planInput) planInput.value = el.getAttribute("data-plan") || "";
    });
  });

  // Demolomake
  var form = document.getElementById("demo-form");
  var status = document.getElementById("form-status");
  if (!form || !status) return;

  var show = function (msg, kind) {
    status.textContent = msg;
    status.className = "form-status" + (kind ? " " + kind : "");
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      var firstInvalid = form.querySelector(":invalid");
      show("Täytä nimi, järjestö ja toimiva sähköpostiosoite sekä hyväksy tietojen käyttö.", "err");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var action = form.getAttribute("action") || "";
    if (action.indexOf("YOUR_FORM_ID") !== -1) {
      show("Lomaketta ei ole vielä kytketty. Lähetä viesti sähköpostilla: [sähköposti]", "err");
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    if (button) { button.disabled = true; button.textContent = "Lähetetään…"; }
    show("", "");

    fetch(action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        show("Kiitos! Otamme yhteyttä pian.", "ok");
      })
      .catch(function () {
        show("Lähetys epäonnistui. Yritä uudelleen tai lähetä viesti sähköpostilla.", "err");
      })
      .finally(function () {
        if (button) { button.disabled = false; button.textContent = "Pyydä demo"; }
      });
  });
})();
