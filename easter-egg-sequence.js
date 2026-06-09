(function () {
  const triggers = document.querySelectorAll("[data-egg-verified]");
  const clicked = new Set();

  function tryActivate(trigger) {
    const id = trigger.dataset.eggVerified;
    if (!id || clicked.has(id)) return;

    clicked.add(id);
    trigger.classList.add("egg-verified-tapped");

    if (clicked.size >= triggers.length) {
      window.location.href = "easter-egg.html";
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      tryActivate(trigger);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        tryActivate(trigger);
      }
    });
  });
})();
