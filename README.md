# Amr Hossam — Data Analyst Portfolio

## What's inside
- `index.html` — Hero → Projects → Profile (About + Skills + Tools) → Contact
- `project-1.html` — Case Study 01: Indian E-commerce Platform Data Analysis
- `project-2.html` — Case Study 02: Sales Analysis & Strategic Business Report
- `styles.css`, `script.js` — design system + animations
- `assets/` — screenshots, demo video, profile photo, CV

## How to view it right now
Double-click `index.html`.

## How to publish it (free, ~2 minutes)
**Netlify Drop** — https://app.netlify.com/drop — drag the `portfolio` folder in.

## What changed in this pass
- **Typography:** added Space Grotesk as a dedicated display face for
  headlines, numbers, and the logo — paired with IBM Plex Sans for body text
  and IBM Plex Mono for labels. Three faces, each with a clear job.
- **Skills section:** reorganized into three labeled groups (Analysis,
  Communication, Approach) instead of one flat list — easier to scan.
- **More animation, still calm:** hero content fades/slides in on load; every
  KPI number and stat (revenue, %, counts) now counts up from zero when it
  scrolls into view; skill tags animate in one by one instead of all at once;
  tags/pills get a subtle lift on hover.

Same structure, same palette, same project content as the last version —
only typography and motion changed. All numbers were tested to make sure
they land on the exact correct value after animating (no rounding drift).

## Editing content later
Plain HTML/CSS, no build step. Open a `.html` file in a text editor, edit, save, refresh.

## Animation + type pass (latest)
- Numbers now use the mono face everywhere (KPI values, stat figures) —
  data reads as data. Headlines, card titles, and the name/logo use Space
  Grotesk. Body copy stays IBM Plex Sans. Each face has one job.
- Added: nav gets a subtle shadow on scroll; KPI cards, finding-cards,
  fix-cards and skill categories all animate in with a staggered
  fade+rise as you scroll; tool/skill icons get a small hover motion;
  buttons get a subtle light sweep on hover.
- Re-tested every animated number across both case studies after this pass
  to confirm they still land on the exact source value (no rounding drift).
