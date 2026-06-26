---
type: workspace-index
project: Werkplaats3b — website
cwd: ~/projects/werkplaats17
updated: 2026-06-26
soft-cap: 60 regels
---

# INDEX — Werkplaats3b website

Website-repo voor werkplaats3b.nl. Voor businesscase, BV, huurcontract → [~/Documents/Claude/Projects/Werkplaats3b/](file:///C:/Users/midir/Documents/Claude/Projects/Werkplaats3b/).

## Key files

| File | Rol |
|---|---|
| `index.html` | Main landing page |
| `admin.html` | Admin panel (ww: WMH2026) |
| `content.js` | Alle tekst/prijzen/contact — single source of truth |
| `floorplan-data.js` | Plattegrond configuratie |
| `photos.js` | Fotogalerij data |
| `placed-objects.js` | Interactieve plattegrond objecten — admin laadt vanuit GitHub bij init |
| `astro/` | Astro rewrite — in ontwikkeling, niet deployed |

## Deploy

```bash
git add -A && git commit -m "update" && git push
```
Master → GitHub Pages → werkplaats3b.nl (automatisch live).
Rotterdam: `~/projects/werkplaats17-rotterdam/` branch `main`.
