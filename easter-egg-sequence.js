(function () {
  const STEPS = ["tl", "br", "tr", "stats", "cat"];
  let step = 0;
  let resetTimer = null;

  function updateAwaiting() {
    document.body.classList.remove(
      "egg-await-tl",
      "egg-await-br",
      "egg-await-tr",
      "egg-step-cat"
    );

    const next = STEPS[step];
    if (next === "tl") document.body.classList.add("egg-await-tl");
    if (next === "br") document.body.classList.add("egg-await-br");
    if (next === "tr") document.body.classList.add("egg-await-tr");
    if (next === "cat") document.body.classList.add("egg-step-cat");
  }

  function resetSequence() {
    step = 0;
    updateAwaiting();
  }

  function scheduleReset() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(resetSequence, 12000);
  }

  function advance(expected) {
    if (STEPS[step] !== expected) {
      resetSequence();
      return;
    }

    step += 1;
    scheduleReset();
    updateAwaiting();

    if (step === STEPS.length) {
      window.location.href = "easter-egg.html";
    }
  }

  document.querySelectorAll("[data-egg-zone]").forEach((zone) => {
    zone.addEventListener("click", (event) => {
      event.stopPropagation();
      advance(zone.dataset.eggZone);
    });
  });

  const credibilityBtn = document.getElementById("credibility-btn");
  if (credibilityBtn) {
    credibilityBtn.addEventListener("click", () => {
      const willOpen = credibilityBtn.getAttribute("aria-expanded") !== "true";
      if (willOpen) {
        advance("stats");
      }
    });
  }

  const catTrigger = document.getElementById("version-cat-trigger");
  if (catTrigger) {
    catTrigger.addEventListener("click", (event) => {
      if (step !== 4) return;
      event.preventDefault();
      event.stopPropagation();
      advance("cat");
    });
  }

  updateAwaiting();
})();
