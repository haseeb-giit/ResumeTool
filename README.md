# Dossier — Resume & CV Builder

A polished, single-page resume builder: fill the form on the left, watch a live
A4 preview update on the right, then export a print-ready PDF.

## Run it
No build step — it's plain HTML/CSS/JS.

- Easiest: double-click `index.html` to open it in a browser.
- Recommended: serve it locally so fonts/PDF export behave exactly like production:
  ```
  npx serve .
  ```
  or
  ```
  python3 -m http.server 8080
  ```
  then open `http://localhost:8080`.
- Or deploy the whole folder as-is to Vercel / Netlify / GitHub Pages.

## What's inside
- `index.html` — app shell
- `css/style.css` — full design system (tokens, layout, two resume templates, responsive rules)
- `js/app.js` — all logic: form state, live preview rendering, template switching, theme
  colors, autosave to the browser's local storage, and PDF export (via html2pdf.js,
  loaded from CDN)
- `assets/mark.svg` — app mark / favicon

## Features
- Two templates: **Sidebar** (photo + colored sidebar) and **Classic** (single-column, ATS-friendly)
- **Theme picker** — 30 preset two-color combinations (e.g. Pine & Gold, Navy & Rust,
  Charcoal & Teal, Burgundy & Cream...) applied live to the resume preview and the exported
  PDF. Click the "Theme" button in the top bar to open the full swatch grid (scrolls if it
  doesn't fit). Only the resume's colors change — the app's own UI color stays fixed, so the
  two never get mixed up.
- Repeatable Experience, Education, Skills, Projects, Certifications, and Languages sections
- Optional profile photo upload
- Independently scrolling panels — the form and the preview each scroll on their own,
  so scrolling through the form never moves the preview (and vice versa)
- Autosaves to the browser as you type (nothing leaves your device)
- "Load sample" to preview with realistic content, "Clear" to start fresh
- Fully responsive: side-by-side on desktop, an Editing/Preview switch on mobile
- One-click "Download PDF" sized to true A4, with the chosen theme baked in

## Notes
- Autosave uses `localStorage`, so it's per-browser, not synced anywhere. No data ever
  leaves the device — there is no server, email, or network call anywhere in this app.
- Fonts (Fraunces, Inter, IBM Plex Mono) and the PDF library load from public CDNs,
  so an internet connection is needed the first time a browser opens the page.
- PDF export uses `html2pdf.js` (bundling `html2canvas` + `jsPDF`). Before capturing, the
  app briefly neutralizes a couple of browser-only layout tricks that don't translate to a
  canvas screenshot (the Sidebar template's flex-stretched color panel, and the preview
  panel's internal scroll clipping), then restores them — this is why the Sidebar template
  now exports with a full-height color panel instead of a short/cut one, and why long
  resumes don't get cut mid-entry across a page break.

## Customizing
- **Add a theme**: edit the `THEMES` array near the top of `js/app.js` — each entry is
  `{ id, name, accent, accent2 }`.
- **Add a template**: templates are rendered as HTML strings in `js/app.js`
  (`renderSidebar()` / `renderClassic()`) and styled under the matching
  `.resume-page[data-template="..."]` block in `css/style.css`. Use the
  `var(--resume-accent)` / `var(--resume-accent-2)` CSS variables for anything that should
  follow the selected theme.
