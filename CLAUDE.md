# Werkplaats3b — website

> **Geschiedenis mapnaam:** deze repo woonde t/m 2026-08-05 in `~/projects/werkplaats17/`
> (bewuste divergentie, besluit 2026-07-28 — zie git-historie voor de volledige
> kosten-afweging). Op 2026-08-05 samengevoegd met de businesscase-workspace in
> `~/projects/werkplaats3b/`; deze map is nu zowel de site-repo (root) als de
> businesscase-workspace (`.claude/CLAUDE.md`, `.claude/INDEX.md`, `.claude/session_state.md`
> — gitignored, niet publiek). Zustermap `~/projects/werkplaats17-rotterdam/` is écht
> werkplaats17 (Van Maasdijkweg 29, Rotterdam), repo `werkplaats17-rotterdam`, branch `main`.

Deze repo = de website (werkplaats3b.nl). Bedrijfsvoering, huurcontract, BV-oprichting, BAL
→ zie `.claude/CLAUDE.md` in dezelfde map.

Static HTML site deployed via GitHub Pages.

## Stack

- Plain HTML, CSS, JavaScript (no framework, no build step)
- GitHub Pages vanaf master (push naar master = deploy)

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
- **Na elke wijziging: commit + push zelf uitvoeren.** Niet vragen, gewoon doen — de site is pas gewijzigd als hij gepusht is. (Stond in `~/.claude/rules/werkplaats17.md`; die laag wordt door niets geladen, daarom hier geborgd — 2026-07-28.)
- Git remote: `https://github.com/midirectiekade14-debug/werkplaats3b.git`
