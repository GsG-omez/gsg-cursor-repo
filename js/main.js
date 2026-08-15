(function () {
  var spot = document.getElementById("spotlight");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (spot && !reduce) {
    window.addEventListener(
      "pointermove",
      function (e) {
        spot.style.setProperty("--x", e.clientX + "px");
        spot.style.setProperty("--y", e.clientY + "px");
      },
      { passive: true }
    );
  }

  var links = document.querySelectorAll(".jump a[data-section]");
  var sections = [];
  links.forEach(function (link) {
    var el = document.getElementById(link.getAttribute("data-section"));
    if (el) sections.push({ link: link, el: el });
  });

  function setActive(id) {
    links.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-section") === id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      io.observe(s.el);
    });
  } else if (sections[0]) {
    setActive(sections[0].el.id);
  }

  var img = document.querySelector(".portrait");
  if (img) {
    function useFallback() {
      if (!img.parentNode) return;
      var fallback = document.createElement("div");
      fallback.className = "portrait portrait-fallback";
      fallback.title = "Add assets/portrait.jpg";
      fallback.setAttribute("aria-hidden", "true");
      fallback.textContent = "GG";
      img.replaceWith(fallback);
    }
    img.addEventListener("error", useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  }
})();
