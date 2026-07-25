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
- `js/app.js` — all logic: form state, live preview rendering, template switching, autosave to
  the browser's local storage, and PDF export (via html2pdf.js, loaded from CDN)
- `assets/mark.svg` — app mark / favicon

## Features
- Two templates: **Sidebar** (photo + colored sidebar) and **Classic** (single-column, ATS-friendly)
- Repeatable Experience, Education, Skills, Projects, Certifications, and Languages sections
- Optional profile photo upload
- Autosaves to the browser as you type (nothing leaves your device)
- "Load sample" to preview with realistic content, "Clear" to start fresh
- Fully responsive: side-by-side on desktop, an Editing/Preview switch on mobile
- One-click "Download PDF" sized to true A4

## Notes
- Autosave uses `localStorage`, so it's per-browser, not synced anywhere.
- Fonts (Fraunces, Inter, IBM Plex Mono) and the PDF library load from public CDNs,
  so an internet connection is needed the first time a browser opens the page.
