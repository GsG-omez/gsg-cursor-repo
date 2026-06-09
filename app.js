const ITERATIONS = [
  {
    version: "v0.1",
    label: "Genesis",
    title: "Interview greeter",
    prompt: "“Help me build a website that says Hi ___ where the blank is a hiring manager for a company I’m interviewing for.”",
    changes: [
      "Company + hiring manager inputs",
      "Live greeting with first name",
      "Saved interviews via localStorage",
      "Warm cream & serif typography",
    ],
    preview: "v01",
  },
  {
    version: "v0.2",
    label: "Pivot",
    title: "Fixed name — GABESICK",
    prompt: "“Edit the blank to now say GABESICK.”",
    changes: [
      "Removed dynamic manager field",
      "Greeting locked to Hi GABESICK",
      "Company field kept for context",
    ],
    preview: "v02",
  },
  {
    version: "v1.0",
    label: "Release",
    title: "Hello world — minimalist dark",
    prompt: "“Make the blank say Hello world, change the button, go minimalist & future sleek.”",
    changes: [
      "Dark grid background",
      "Hello world greeting",
      "Single “how I was made” panel",
      "Version badge v1.0",
    ],
    preview: "v10",
    snapshot: "versions/v1.0/",
  },
  {
    version: "v1.1",
    label: "Current",
    title: "Harveen + iteration timeline",
    prompt: "“Make the blank Harveen, add version control story, button opens iteration panels — v1.1.”",
    changes: [
      "Greeting: Hi Harveen",
      "Button reveals full version history",
      "Mini previews of every iteration",
      "GitHub Desktop workflow notes",
    ],
    preview: "v11",
    current: true,
  },
];

const PREVIEWS = {
  v01: `
    <div class="mock mock-warm">
      <div class="mock-card">
        <span class="mock-eyebrow">Your interview</span>
        <div class="mock-title">Hi <em>Alex</em></div>
        <div class="mock-field"></div>
        <div class="mock-field short"></div>
        <div class="mock-btn warm">Update greeting</div>
      </div>
    </div>`,
  v02: `
    <div class="mock mock-warm">
      <div class="mock-card">
        <span class="mock-eyebrow">Stripe</span>
        <div class="mock-title">Hi <em>GABESICK</em></div>
        <div class="mock-field"></div>
        <div class="mock-btn warm">Update greeting</div>
      </div>
    </div>`,
  v10: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono">v1.0</span>
        <div class="mock-title dark">Hi <em>Hello world</em></div>
        <div class="mock-btn ghost">Click me to show how I was made</div>
      </div>
    </div>`,
  v11: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono">v1.1</span>
        <div class="mock-title dark">Hi <em>Harveen</em></div>
        <div class="mock-btn ghost">Click me to show how I was made</div>
        <div class="mock-panel-strip"></div>
      </div>
    </div>`,
};

const revealBtn = document.getElementById("reveal-btn");
const aboutPanel = document.getElementById("about-panel");
const iterationList = document.getElementById("iteration-list");

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderIterations() {
  iterationList.innerHTML = ITERATIONS.map(
    (item, index) => `
    <article class="iteration-card${item.current ? " is-current" : ""}" data-index="${index}">
      <button type="button" class="iteration-toggle" aria-expanded="false">
        <div class="iteration-meta">
          <span class="version-badge">${escapeHtml(item.version)}</span>
          ${item.label ? `<span class="version-label">${escapeHtml(item.label)}</span>` : ""}
          ${item.current ? '<span class="current-pill">You are here</span>' : ""}
        </div>
        <h3 class="iteration-title">${escapeHtml(item.title)}</h3>
        <span class="chevron" aria-hidden="true"></span>
      </button>
      <div class="iteration-body" hidden>
        <blockquote class="cursor-prompt">${escapeHtml(item.prompt)}</blockquote>
        <ul class="change-list">
          ${item.changes.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
        </ul>
        ${PREVIEWS[item.preview] ?? ""}
        ${
          item.snapshot
            ? `<p class="snapshot-note">Snapshot saved at <code>${escapeHtml(item.snapshot)}</code> for git diff.</p>`
            : ""
        }
      </div>
    </article>`
  ).join("");
}

function bindIterationToggles() {
  iterationList.querySelectorAll(".iteration-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".iteration-card");
      const body = card.querySelector(".iteration-body");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!isOpen));
      body.hidden = isOpen;
      card.classList.toggle("is-open", !isOpen);
    });
  });
}

revealBtn.addEventListener("click", () => {
  const isOpen = revealBtn.getAttribute("aria-expanded") === "true";

  revealBtn.setAttribute("aria-expanded", String(!isOpen));
  aboutPanel.hidden = isOpen;

  if (!isOpen) {
    aboutPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

renderIterations();
bindIterationToggles();
