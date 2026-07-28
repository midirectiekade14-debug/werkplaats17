# Werkplaats3b — website

> ## ⚠ MAPNAAM ≠ PROJECTNAAM — dit is bewuste divergentie, niet hernoemen
>
> Deze map heet `werkplaats17`, maar bevat de **werkplaats3b**-repo (Maasland).
> Alles hieronder klopt; de mapnaam is historisch.
>
> | | |
> |---|---|
> | Map | `~/projects/werkplaats17/` |
> | Repo | `midirectiekade14-debug/werkplaats3b` |
> | Site | werkplaats3b.nl (CNAME) · Pages vanaf `master` |
> | Locatie | Oud Camp 3B, Maasland |
>
> **Waarom niet hernoemd (besluit 2026-07-28):** `~/projects/werkplaats3b/` is al bezet
> door de businesscase-workspace (huurcontract, BV, BAL) — hernoemen botst frontaal.
> Een derde naam (`werkplaats3b-site`) zou de sessie-historie in
> `~/.claude/projects/C--Users-midir-projects-werkplaats17/` (~5 MB transcripts) wezen
> en 8+ harness-verwijzingen breken, tegenover nul functionele winst: routing dekt beide
> namen al (`route-project-index.py` mapt `werkplaats17` én `werkplaats3b` op dezelfde graph).
>
> **Zustermap** `~/projects/werkplaats17-rotterdam/` klopt wél — dat is écht werkplaats17
> (Van Maasdijkweg 29, Rotterdam), repo `werkplaats17-rotterdam`, branch `main`.

Deze repo = alleen de website (werkplaats3b.nl). Bedrijfsvoering, huurcontract, BV-oprichting, BAL → **workspace** `~/projects/werkplaats3b/` (eigen CLAUDE.md).

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
