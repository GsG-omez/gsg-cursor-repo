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
    title: "Fixed display name",
    prompt: "“Edit the blank to now say [name].”",
    changes: [
      "Removed dynamic manager field",
      "Greeting locked to a fixed display name",
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
    label: "Timeline",
    title: "Named greeting + vertical panels",
    prompt: "“Add a personalized greeting, version control story, and iteration panels.”",
    changes: [
      "Personalized greeting headline",
      "Stacked accordion version history",
      "Mini previews of every iteration",
      "Published to static hosting",
    ],
    preview: "v11",
    snapshot: "versions/v1.1/",
  },
  {
    version: "v1.2",
    label: "Layout",
    title: "Horizontal timeline + bold CTA",
    prompt: "“Make the button pop more, show version boxes left-to-right chronologically — v1.2.”",
    changes: [
      "Cyan accent button that stands off the background",
      "Timeline flows left → right across the UI",
      "Wider layout when history is open",
      "Staggered reveal animation per version",
    ],
    preview: "v12",
    snapshot: "versions/v1.2/",
  },
  {
    version: "v1.3",
    label: "Cases",
    title: "Support case examples",
    prompt: "“Add Support case examples with Ticket → Repro → Root cause → Reply accordions — separate purple button.”",
    changes: [
      "Support cases in their own panel",
      "Purple CTA separate from timeline",
      "Four-step accordion flow per case",
      "Cases themed around real deploy issues",
    ],
    preview: "v13",
    snapshot: "versions/v1.3/",
  },
  {
    version: "v1.4",
    label: "Rebrand",
    title: "Built with Cursor AI + toggle arrows",
    prompt: "“Rebrand, AI background, stick figure on V, arrow indicators on every toggle button.”",
    changes: [
      "Hero: Built with Cursor AI",
      "Stick figure sitting on the V in v1.4",
      "› / ⌄ arrows on all buttons when open vs closed",
      "Sharper buttons with hover & click feedback",
    ],
    preview: "v14",
    snapshot: "versions/v1.4/",
  },
  {
    version: "v1.5",
    label: "Current",
    title: "CSAT stat band + testimonials",
    prompt: "“Add a stats panel with CSAT, support tenure, and anonymized customer quotes.”",
    changes: [
      "Stats panel: CSAT, enterprise volume, years of experience",
      "Anonymized customer testimonial quotes",
      "Subtle bottom-right corner toggle",
      "Responsive layout on narrow viewports",
    ],
    preview: "v15",
    current: true,
  },
];

const SUPPORT_CASES = [
  {
    id: "CASE-1042",
    title: "Live site still shows old version after push",
    severity: "P2",
    steps: {
      ticket: {
        label: "Ticket",
        content: `Customer pushed a new release to main and sees the commit in their git history, but the live static site still shows the previous layout and styles.`,
      },
      repro: {
        label: "Repro",
        content: `1. Push latest commit to main\n2. Open live URL in same browser session used during prior testing\n3. Observe updated HTML but stale CSS/JS behavior\n4. Hard refresh (Ctrl+Shift+R) → site updates correctly`,
      },
      rootCause: {
        label: "Root cause",
        content: `Browser cached style.css and app.js from the prior release. index.html updated but linked assets were served from cache — a common split-brain symptom on static hosting.`,
      },
      reply: {
        label: "Reply",
        content: `Hi — your push succeeded and the host is serving the new release. The mismatch is browser cache. Please hard-refresh (Ctrl+Shift+R) or try an incognito window. We've added cache-busting query params on asset URLs to reduce this going forward.`,
      },
    },
  },
  {
    id: "CASE-1038",
    title: "Timeline panel layout on mobile",
    severity: "P3",
    steps: {
      ticket: {
        label: "Ticket",
        content: `On mobile Safari, opening the timeline panel shows version cards stacked vertically instead of the horizontal scroll seen on desktop.`,
      },
      repro: {
        label: "Repro",
        content: `1. Open site on a mobile device\n2. Tap the timeline button\n3. Version cards wrap vertically — horizontal scroll track not obvious\n4. Desktop viewport shows correct left-to-right flow`,
      },
      rootCause: {
        label: "Root cause",
        content: `Flex row layout with min-width cards requires explicit overflow-x on the track container. On narrow viewports scroll affordance is easy to miss.`,
      },
      reply: {
        label: "Reply",
        content: `Thanks for the report. The timeline track uses horizontal scroll — on mobile, swipe left-to-right inside the version row to browse chronologically. Desktop layout is unaffected.`,
      },
    },
  },
];

const STEP_ORDER = ["ticket", "repro", "rootCause", "reply"];

/** Reusable arrow for all toggle buttons — closed: › right, open: ⌄ down */
const TOGGLE_ARROW = '<span class="toggle-arrow" aria-hidden="true"></span>';

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
        <span class="mock-eyebrow">Acme Co</span>
        <div class="mock-title">Hi <em>Alex</em></div>
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
        <div class="mock-title dark">Hi <em>…</em></div>
        <div class="mock-btn ghost">Click me to show how I was made</div>
        <div class="mock-panel-strip"></div>
      </div>
    </div>`,
  v12: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono">v1.2</span>
        <div class="mock-title dark">Hi <em>…</em></div>
        <div class="mock-btn accent">Click me to show how I was made</div>
        <div class="mock-timeline-row">
          <span></span><span></span><span></span><span></span><span class="active"></span>
        </div>
      </div>
    </div>`,
  v13: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono">v1.3</span>
        <div class="mock-title dark">Hi <em>…</em></div>
        <div class="mock-btn accent">Timeline</div>
        <div class="mock-btn purple">Cases</div>
      </div>
    </div>`,
  v14: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v1.4</span>
        <div class="mock-title dark">Built with <em>Cursor AI</em></div>
        <div class="mock-btn accent sharp">Timeline</div>
        <div class="mock-btn purple sharp">Cases</div>
      </div>
    </div>`,
  v15: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v1.5</span>
        <div class="mock-title dark">Built with <em>Cursor AI</em></div>
        <div class="mock-stat-row"><span>90%</span><span>High</span><span>4+ yrs</span></div>
        <div class="mock-quote-strip"></div>
        <div class="mock-btn accent sharp">Timeline</div>
      </div>
    </div>`,
};

const revealBtn = document.getElementById("reveal-btn");
const casesBtn = document.getElementById("cases-btn");
const credibilityBtn = document.getElementById("credibility-btn");
const credibilityPanel = document.getElementById("credibility-panel");
const aboutPanel = document.getElementById("about-panel");
const casesPanel = document.getElementById("cases-panel");
const iterationList = document.getElementById("iteration-list");
const casesList = document.getElementById("cases-list");
const page = document.getElementById("page");

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatContent(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

function renderIterations() {
  iterationList.innerHTML = ITERATIONS.map(
    (item, index) => `
    <article
      class="iteration-card${item.current ? " is-current" : ""}"
      data-index="${index}"
      style="--stagger: ${index}"
    >
      <div class="iteration-head">
        <div class="iteration-meta">
          <span class="version-badge">${escapeHtml(item.version)}</span>
          ${item.label ? `<span class="version-label">${escapeHtml(item.label)}</span>` : ""}
          ${item.current ? '<span class="current-pill">You are here</span>' : ""}
        </div>
        <h3 class="iteration-title">${escapeHtml(item.title)}</h3>
      </div>
      <div class="iteration-body">
        <blockquote class="cursor-prompt">${escapeHtml(item.prompt)}</blockquote>
        <ul class="change-list">
          ${item.changes.map((c) => `<li>${escapeHtml(c)}</li>`).join("")}
        </ul>
        ${PREVIEWS[item.preview] ?? ""}
        ${
          item.snapshot
            ? `<p class="snapshot-note">Snapshot at <code>${escapeHtml(item.snapshot)}</code></p>`
            : ""
        }
      </div>
      ${index < ITERATIONS.length - 1 ? '<span class="timeline-arrow" aria-hidden="true">→</span>' : ""}
    </article>`
  ).join("");
}

function renderCaseSteps(caseItem) {
  return STEP_ORDER.map(
    (key) => `
    <div class="accordion-item step-item">
      <button type="button" class="accordion-toggle step-toggle" aria-expanded="false">
        ${TOGGLE_ARROW}
        <span class="step-label">${escapeHtml(caseItem.steps[key].label)}</span>
      </button>
      <div class="accordion-body step-body" hidden>
        <div class="step-content">${formatContent(caseItem.steps[key].content)}</div>
      </div>
    </div>`
  ).join("");
}

function renderSupportCases() {
  casesList.innerHTML = SUPPORT_CASES.map(
    (caseItem) => `
    <article class="accordion-item case-card">
      <button type="button" class="accordion-toggle case-toggle" aria-expanded="false">
        ${TOGGLE_ARROW}
        <div class="case-toggle-body">
          <div class="case-meta">
            <span class="case-id">${escapeHtml(caseItem.id)}</span>
            <span class="case-severity">${escapeHtml(caseItem.severity)}</span>
          </div>
          <h3 class="case-title">${escapeHtml(caseItem.title)}</h3>
        </div>
      </button>
      <div class="accordion-body case-body" hidden>
        <div class="step-flow">
          ${renderCaseSteps(caseItem)}
        </div>
      </div>
    </article>`
  ).join("");
}

function bindAccordions(root) {
  root.querySelectorAll(".accordion-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      const body = item.querySelector(":scope > .accordion-body");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      btn.setAttribute("aria-expanded", String(!isOpen));
      body.hidden = isOpen;
      item.classList.toggle("is-open", !isOpen);
    });
  });
}

revealBtn.addEventListener("click", () => {
  const isOpen = revealBtn.getAttribute("aria-expanded") === "true";

  revealBtn.setAttribute("aria-expanded", String(!isOpen));
  aboutPanel.hidden = isOpen;
  page.classList.toggle("is-timeline-open", !isOpen);
  document.body.classList.toggle("is-timeline-open", !isOpen);

  if (!isOpen) {
    aboutPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

casesBtn.addEventListener("click", () => {
  const isOpen = casesBtn.getAttribute("aria-expanded") === "true";

  casesBtn.setAttribute("aria-expanded", String(!isOpen));
  casesPanel.hidden = isOpen;
  page.classList.toggle("is-cases-open", !isOpen);

  if (!isOpen) {
    casesPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

credibilityBtn.addEventListener("click", () => {
  const isOpen = credibilityBtn.getAttribute("aria-expanded") === "true";

  credibilityBtn.setAttribute("aria-expanded", String(!isOpen));
  credibilityPanel.hidden = isOpen;
});

renderIterations();
renderSupportCases();
bindAccordions(casesList);
