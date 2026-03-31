# Werkplaats17

Marketing website for a professional workspace/makerspace in Rotterdam. Static HTML site deployed via GitHub Pages.

## Stack

- Plain HTML, CSS, JavaScript (no framework, no build step)
- GitHub Pages deployment (gh-pages branch = production)

## Key Commands

```bash
# No build step needed -- edit files directly
# Deploy: commit + push to trigger GitHub Pages
git add -A && git commit -m "update" && git push
```

## Architecture

- `index.html`: Main landing page
- `admin.html`: Admin panel
- `advertorial.html`: Advertorial/marketing page
- `content.js`: All site text, prices, contact info -- single source of truth for content
- `floorplan-data.js`: Floor plan configuration data
- `photos.js`: Photo gallery data
- `placed-objects.js`: Interactive floor plan object placement

## Conventions

- Content changes go in `content.js` (structured as `CONTENT` object)
- Dutch language site
- Auto-deploy: any push triggers GitHub Pages update
- Git remote: `https://github.com/midirectiekade14-debug/werkplaats17.git`
