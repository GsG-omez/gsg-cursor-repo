# Event Log — gsg-cursor-repo / Cursor AI Website Project

> Generated: 2026-06-08  
> Purpose: Complete record of work done in Cursor chat sessions.  
> **Not published** — local reference only.

---

## Project locations

| Path | Description |
|------|-------------|
| `C:\Users\briel\Projects\log-regex-tester` | Log Regex Tester (separate early project) |
| `C:\Users\briel\Projects\interview-greeting` | Original interview-greeting prototype (local) |
| `C:\Users\briel\Documents\GitHub\gsg-cursor-repo` | **Active repo** — GitHub + GitHub Pages |
| **Live URL** | https://gsg-omez.github.io/gsg-cursor-repo/ |
| **GitHub remote** | https://github.com/GsG-omez/gsg-cursor-repo.git |

---

## Session timeline

### Event 1 — Log Regex Tester (separate tool)

**User request:** Build a log parsing tester for REGEX.

**Delivered:**
- Web app at `C:\Users\briel\Projects\log-regex-tester`
- Features: multiline logs, regex flags (g/i/m/s), live match highlighting, capture groups, sample logs (nginx, JSON, syslog, Apache), copy as JSON
- Stack: HTML + CSS + JS (Vite optional; standalone `index.html` works without Node)

**Status:** Built locally; not tied to gsg-cursor-repo.

---

### Event 2 — Interview greeting site (genesis)

**User request:** Website that says "Hi ___" where blank = hiring manager for interview company.

**Delivered:** `C:\Users\briel\Projects\interview-greeting`
- Company + hiring manager inputs
- Live greeting (first name)
- Saved interviews via localStorage
- Warm cream / serif theme (Fraunces + DM Sans)

**Version:** v0.1 (conceptual)

---

### Event 3 — Fixed name: GABESICK

**User request:** Change the blank to "GABESICK".

**Changes:**
- Removed dynamic hiring manager field
- Greeting locked to **Hi GABESICK**
- Company field retained

**Version:** v0.2 (conceptual)

---

### Event 4 — Hello world + minimalist rebrand

**User request:** Blank → "Hello world"; button → "Click me to show how I was made"; minimalist future-sleek colors.

**Changes:**
- Dark grid background
- **Hi Hello world** greeting
- Single reveal panel (HTML / CSS / JS stack info)
- Removed interview form

**Version:** v1.0

---

### Event 5 — Harveen + version control story (v1.1)

**User request:** Blank → "Harveen"; version iteration; button opens iteration panels; exercise = organic growth with Cursor + version control; GitHub Desktop available.

**Changes:**
- Greeting: **Hi Harveen**
- Version badge v1.1
- "Click me to show how I was made" → expandable iteration history
- Each panel: Cursor prompt, changes list, mini UI preview
- Iterations: v0.1 → v0.2 → v1.0 → v1.1
- `CHANGELOG.md`, `versions/v1.0/` snapshot
- Git footer with commit message: `v1.1 - H + iteration`

**Version:** v1.1

---

### Event 6 — Connect to GitHub (gsg-cursor-repo)

**User context:** Connected Cursor to **gsg-cursor-repo** via GitHub Desktop; repo was empty (only `.gitattributes`).

**Agent action:**
- Copied full v1.1 site into `C:\Users\briel\Documents\GitHub\gsg-cursor-repo`
- Clarified: Cursor connection ≠ agent push access; user commits/pushes via GitHub Desktop

**User steps (completed in Desktop):**
1. Commit: `v1.1 - H + iteration`
2. Publish repository to GitHub
3. Enable GitHub Pages (main branch, root)

---

### Event 7 — Deployment & cache troubleshooting

**Issue:** Site visible in GitHub Desktop history but live site looked like old version.

**Root cause:** Browser cached `style.css` / `app.js` while `index.html` updated (split-brain).

**Fix:**
- Hard refresh: `Ctrl + Shift + R`
- Added cache-busting query strings (`?v=1.2`, etc.) on CSS/JS links

**Clarification:** Commit (local) vs Push (to GitHub) — user confirmed in follow-up.

---

### Event 8 — v1.2: Horizontal timeline + bold CTA

**User request:** New version; button pops more; timeline boxes left-to-right; push to repo; show version control.

**Changes:**
- Cyan accent button with glow (distinct from background)
- Version cards flow **left → right** chronologically
- Page widens when timeline open
- Staggered slide-in animation per card
- v1.1 marked non-current; v1.2 added to timeline
- `versions/v1.2/` snapshot
- Suggested commit: `v1.2 - horizontal timeline`

**Version:** v1.2

---

### Event 9 — v1.3: Support case examples

**User request:** Second section below timeline; header "Support case examples"; accordion Ticket → Repro → Root cause → Reply (v1.1 pattern).

**Changes:**
- Two sample cases: GSG-1042 (GitHub Pages cache), GSG-1038 (mobile timeline)
- Purple accent for case section
- Initially nested inside timeline panel

**Version:** v1.3

---

### Event 10 — v1.3.1: Separate cases button

**User request:** Support cases must live **outside** "Click me to show how I was made"; own purple button below cyan button.

**Changes:**
- Timeline button → timeline only
- **Support case examples** → separate purple panel + button
- Independent toggle state for each panel

**Version:** v1.3.1 (patch)

---

### Event 11 — v1.4: Built with Cursor AI rebrand

**User request:**
- Rename **Hi Harveen** → **Built with Cursor AI**
- v1.3 badge more dynamic (shimmer / subtle motion)
- Subtle AI/tech background
- Buttons less rounded, more engaging hover/click

**Changes:**
- Hero: **Built with Cursor AI** (slow gradient shift on "Cursor AI")
- AI background: drifting cyan/purple orbs, node mesh, softened grid
- Version badge shimmer + float → shipped as **v1.4**
- Buttons: 6px radius, lift on hover, press on click
- `prefers-reduced-motion` support
- Suggested commit: `v1.4 - cursor ai rebrand`

**Version:** v1.4

---

### Event 12 — v1.4.2: Toggle arrows + stick figure on V

**User request:**
- Arrows on all buttons: `›` closed (before title), `⌄` open/active
- Apply to ALL buttons and sub-buttons (future pattern)
- v1.4 emphasis: emoji or stick figure sitting on the **V** of version badge

**Changes:**
- Universal `.toggle-arrow` + `TOGGLE_ARROW` constant in `app.js`
- Main CTAs, case cards, and step accordions all use same pattern
- CSS stick figure perched on **V** in **V1.4** badge
- Cache bust: `?v=1.4.2`
- Suggested commit: `v1.4.2 - toggle arrows`

**Version:** v1.4.2 (current as of this log)

---

## Version summary

| Version | Greeting / headline | Key feature |
|---------|---------------------|-------------|
| v0.1 | Hi [Hiring Manager] | Interview greeter + company form |
| v0.2 | Hi GABESICK | Fixed name |
| v1.0 | Hi Hello world | Dark minimalist + single about panel |
| v1.1 | Hi Harveen | Vertical iteration accordions |
| v1.2 | Hi Harveen | Horizontal timeline + cyan CTA |
| v1.3 | Hi Harveen | Support case examples (in timeline) |
| v1.3.1 | Hi Harveen | Cases moved to separate purple button |
| v1.4 | Built with Cursor AI | AI background, shimmer badge, sharp buttons |
| v1.4.2 | Built with Cursor AI | Toggle arrows + stick figure on V |

---

## File structure (current repo)

```
gsg-cursor-repo/
├── index.html          # Main page
├── style.css           # All styles
├── app.js              # Iterations, cases, toggles
├── CHANGELOG.md        # Version history
├── EVENT-LOG.md        # This file (local only — do not publish unless desired)
├── .gitignore
├── .gitattributes
└── versions/
    ├── v1.0/           # Hello world snapshot
    ├── v1.1/           # Harveen vertical snapshot
    └── v1.2/           # Horizontal timeline snapshot
```

---

## Git commits (from GitHub Desktop history)

| Commit message | Notes |
|----------------|-------|
| Initial commit | Empty repo bootstrap |
| `v1.1 - H + iteration` | First full site publish |
| `v1.2 - horizontal timeline` | Horizontal layout + cyan button |
| *(user may have additional commits for v1.3+)* | Check Desktop History tab |

**Suggested commits not yet confirmed in chat:**
- `v1.3 - support cases`
- `v1.3.1 - cases button`
- `v1.4 - cursor ai rebrand`
- `v1.4.2 - toggle arrows`

---

## GitHub Desktop workflow (reference)

1. **Commit** — saves locally (`Commit to main`)
2. **Push origin** — uploads to GitHub
3. **GitHub Pages** — Settings → Pages → branch `main`, folder `/ (root)`
4. **Hard refresh** live site after push: `Ctrl + Shift + R`

---

## Cursor prompts used (paraphrased archive)

1. "Help me build a Log parsing tester for REGEX"
2. "Make a website Hi ___ hiring manager for company interviewing"
3. "Edit blank to say GABESICK"
4. "How to upload so website accessible online"
5. "Blank say Hello world, button Click me to show how I was made, minimalist future sleek"
6. "Blank Harveen, version control, v1.1, iteration panels, GitHub Desktop"
7. "Commit summary v1.1 - H + iteration"
8. "Connected gsg-cursor-repo from GitHub Desktop"
9. "v1.2: button pops, boxes left-to-right, push to repo"
10. "Website same after push" → cache diagnosis
11. "v1.3: Support case examples below timeline, Ticket→Repro→Root cause→Reply"
12. "Cases outside main button, purple button separate"
13. "Built with Cursor AI, shimmer v1.4, AI background, sharper buttons"
14. "Toggle arrows all buttons, stick figure on V"
15. "Event log file to download, don't publish"

---

## Technical notes

- **Stack:** Static HTML, CSS, JavaScript — no build step required
- **Fonts:** Inter, JetBrains Mono (Google Fonts)
- **Agent limitation:** Cannot access GitHub Desktop UI or push via terminal (git not in agent PATH on user machine)
- **Cache busting:** Asset URLs use `?v=x.x.x` query params on `style.css` and `app.js`

---

## End of event log
