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
    label: "Stats",
    title: "TSE profile + testimonials",
    prompt: "“Add a stats panel with CSAT, support tenure, and anonymized customer quotes.”",
    changes: [
      "TSE Profile panel: CSAT, enterprise volume, years of experience",
      "Anonymized customer testimonial quotes",
      "Moved to subtle bottom-right corner toggle",
      "Responsive layout on narrow viewports",
    ],
    preview: "v15",
  },
  {
    version: "v1.6",
    label: "Connect",
    title: "Connect with me page",
    prompt: "“Add a Connect with me button and contact form page.”",
    changes: [
      "Orange Connect CTA on main menu",
      "Dedicated contact.html with form layout",
      "Secured submission pipeline (later iterations)",
    ],
    preview: "v16",
  },
  {
    version: "v1.7",
    label: "Theme",
    title: "TSE purple glassmorphism",
    prompt: "“Match TSE portfolio theme — purple glass panels, skills, tools, achievements.”",
    changes: [
      "Purple / indigo glassmorphism across site",
      "TSE Profile: skills orbit, experience, tools grid",
      "Reference cat on version badge (later moved)",
      "Contact form security hardening",
    ],
    preview: "v17",
  },
  {
    version: "v1.8",
    label: "Easter egg",
    title: "Hidden portfolio unlock",
    prompt: "“Add a secret page mimicking a minimalist portfolio layout.”",
    changes: [
      "Easter egg sequence unlocks easter-egg.html",
      "Split-layout portfolio homage page",
      "Verified-review click trigger (v1.9)",
    ],
    preview: "v18",
  },
  {
    version: "v1.9",
    label: "Verified",
    title: "Easter egg via reviews",
    prompt: "“Change easter egg to click all three Verified labels in customer reviews.”",
    changes: [
      "Removed corner-click + cat sequence",
      "Click three Verified attributions in TSE Profile",
      "Opens easter-egg.html when complete",
    ],
    preview: "v19",
  },
  {
    version: "v2.0",
    label: "Polish",
    title: "Ruby case + UI refinement",
    prompt: "“User-provided Ruby log case study, subtler buttons, larger eyebrow.”",
    changes: [
      "Single support case: Ruby log parsing pipeline",
      "Translucent CTA buttons retain color families",
      "Fixed empty customer review quote",
      "Version cat graphic beside cyan V",
    ],
    preview: "v20",
  },
  {
    version: "v2.1",
    label: "Layout",
    title: "Corner version + IT background",
    prompt: "“Move version to bottom-left; swap background to IT infrastructure theme.”",
    changes: [
      "Removed center version badge from hero",
      "v2.x stamp fixed bottom-left with subtle hop",
      "Circuit grid, network topology, hex mesh background",
    ],
    preview: "v21",
  },
  {
    version: "v2.2",
    label: "Current",
    title: "Timeline sync + maintenance contact",
    prompt: "“Bring version timeline up to date; contact under maintenance; capitalize skillsets.”",
    changes: [
      "Timeline cards through v2.2 — chronological and current",
      "Connect page shows under-maintenance notice",
      "Hero skillsets in Title Case from TSE profile",
    ],
    preview: "v22",
    current: true,
  },
];

const SUPPORT_CASES = [
  {
    id: "CASE-RUBY-LOG",
    title: "Parsing variable-structure Ruby application logs",
    severity: "P2",
    steps: {
      ticket: {
        label: "Ticket",
        content: `Customer needed Ruby/Rails application logs broken into structured, searchable fields. The meaningful data lived in a trailing free-form key=value payload whose shape changed log-to-log — fields appeared and disappeared (extra location=, empty ip_address=), creating too many permutations for static grok patterns.

Additional blockers:
• user_agent values contained spaces and special characters, breaking naive key=value splits
• A global parsing rule was interfering and generating _grokparsefailure noise

Outcome target: fully structured, queryable logs. Customer later rated the interaction extremely satisfied, pleasant, and fast.`,
      },
      repro: {
        label: "Repro",
        content: `1. Ingest sample Ruby logs where message_data ends with variable key=value pairs
2. Observe fields shift between entries — sometimes 5 KV pairs, sometimes 15
3. Run naive KV on raw payload → user_agent bleeds into adjacent fields
4. Note _grokparsefailure events from a global rule touching the same pipeline
5. Confirm logs without UUID/request ID fail the single-pattern Ruby parser`,
      },
      rootCause: {
        label: "Root cause",
        content: `Static grok alone was too brittle for a payload with dynamic keys. KV was the right adaptive parser, but only after isolating user_agent (space-heavy) and params before KV ran.

Contributing factors:
• Global rule conflict polluted the baseline
• user_agent=... params=... ordering caused regex bleed when extracted loosely
• Base Ruby parser had only one grok pattern — lines without request UUID were silently dropped`,
      },
      reply: {
        label: "Reply",
        content: `Approach delivered:
1. Disabled interfering global rule for a clean test baseline
2. Grok-extracted user_agent + params before KV
3. gsub stripped the user_agent segment from message_data
4. KV filter parsed the cleaned payload adaptively
5. Conditional wrapper — logic runs only when user_agent= is present
6. Added fallback Ruby grok pattern for logs without request UUID

Key exchange (sanitized):
Support: Reviewing your case now — KV will parse KEY=VALUE segments once we handle user_agent spacing.
Customer: Can we extract user_agent first, then KV the rest?
Support: Shared grok → gsub → kv pipeline inside a conditional. Added second Ruby parser pattern for non-UUID lines.
Customer: Looking really good. Thank you!

Customer confirmed parsing working across variable log shapes.`,
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
  v16: `
    <div class="mock mock-dark">
      <div class="mock-grid"></div>
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v1.6</span>
        <div class="mock-title dark">Built with <em>Cursor AI</em></div>
        <div class="mock-btn accent sharp">Timeline</div>
        <div class="mock-btn orange">Connect</div>
      </div>
    </div>`,
  v17: `
    <div class="mock mock-dark">
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v1.7</span>
        <div class="mock-title dark">Technical Support <em>Engineer</em></div>
        <div class="mock-skill-row"><span></span><span></span><span></span></div>
        <div class="mock-btn accent sharp">Timeline</div>
        <div class="mock-btn purple sharp">Cases</div>
      </div>
    </div>`,
  v18: `
    <div class="mock mock-dark">
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v1.8</span>
        <div class="mock-title dark">Built with <em>Cursor AI</em></div>
        <div class="mock-btn accent sharp">Timeline</div>
        <div class="mock-btn purple sharp">Cases</div>
        <div class="mock-btn orange">Connect</div>
      </div>
    </div>`,
  v19: `
    <div class="mock mock-dark">
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v1.9</span>
        <div class="mock-title dark">TSE <em>Profile</em></div>
        <div class="mock-quote-strip"></div>
        <div class="mock-tag-row"><span>Verified</span><span>Verified</span><span>Verified</span></div>
      </div>
    </div>`,
  v20: `
    <div class="mock mock-dark">
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v2.0</span>
        <div class="mock-title dark">Technical Support <em>Engineer</em></div>
        <div class="mock-version-row"><span>V</span><span class="mock-cat-dot"></span><span>2.0</span></div>
        <div class="mock-btn ghost-soft">Timeline</div>
      </div>
    </div>`,
  v21: `
    <div class="mock mock-dark">
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v2.1</span>
        <div class="mock-title dark">Technical Support <em>Engineer</em></div>
        <div class="mock-it-bg-strip"></div>
        <div class="mock-corner-tag">v2.1</div>
      </div>
    </div>`,
  v22: `
    <div class="mock mock-dark">
      <div class="mock-card dark">
        <span class="mock-eyebrow mono shimmer">v2.2</span>
        <div class="mock-title dark">Technical Support <em>Engineer</em></div>
        <div class="mock-timeline-row">
          <span></span><span></span><span></span><span></span><span class="active"></span>
        </div>
        <div class="mock-corner-tag">v2.2</div>
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
const timelineTrack = document.querySelector(".timeline-track");
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
    const currentCard = aboutPanel.querySelector(".iteration-card.is-current");
    currentCard?.scrollIntoView({ behavior: "smooth", inline: "end", block: "nearest" });
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

timelineTrack?.addEventListener(
  "wheel",
  (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    timelineTrack.scrollLeft += event.deltaY;
    event.preventDefault();
  },
  { passive: false }
);
