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
