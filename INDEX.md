---
type: workspace-index
project: Werkplaats3b
cwd: ~/projects/werkplaats17
updated: 2026-06-26
soft-cap: 150 regels
keywords: [werkplaats3b, werkplaats17, w17, maasland, oud-camp-3b, huurcontract, businesscase, github-pages, html, css, js, floorplan, admin, content, bv-oprichting, kvk, bal-melding]
---

# INDEX — Werkplaats3b

**Doel:** entry-point voor elke sessie in ~/projects/werkplaats17.
Geeft in ≤150 regels de complete projectstaat — geen losse memory-files bij start nodig.

## 0. Kern

Twee statische websites (GitHub Pages) voor professionele werkruimte Werkplaats3b:
- **Maasland** (Oud Camp 3B, 904m2): deze repo — master → werkplaats3b.nl
- **Rotterdam** (Van Maasdijkweg 29, 785m2): ~/projects/werkplaats17-rotterdam/ — main

Parallel: **businesscase** huurcontract Oud Camp 3B (€54.720/jr, 5 jaar, start 1-9-2026).
Kritieke blokkade: onderverhuurverbod art. 15 + 5 contractwijzigingspunten in Gmail-draft.

## 1. Website — Key files

| File | Rol |
|---|---|
| `index.html` | Main landing page |
| `admin.html` | Admin panel (ww: WMH2026) |
| `content.js` | Alle tekst/prijzen/contact — single source of truth |
| `floorplan-data.js` | Plattegrond configuratie |
| `photos.js` | Fotogalerij data |
| `placed-objects.js` | Interactieve plattegrond objecten |
| `astro/` | Astro rewrite — in ontwikkeling, niet deployed |

Deploy: `git commit + push` naar master → GitHub Pages automatisch live.
Git remote: `https://github.com/midirectiekade14-debug/werkplaats3b.git`

## 2. Businesscase — Status & deadlines

**Partijen:**
- Verhuurder: Kevin Rochten (e-mail onbekend) · via Evert `evert@malkenhorstmakelaars.nl`
- Huurder makelaar: Joiselle `joiselle@fokkerrealestate.nl` (Fokker Real Estate)
- Huurder: nader op te richten BV (Harm v.d. Ven pers. aansprakelijk)

**Gmail-thread:** `Re: Concept huurovk [B100279-23629082]` · ID: `19edc13fbb938777`
**Draft ID:** `r-508861397778231193` — niet verstuurd, Kevin CC ontbreekt

| Deadline | Actie | Status |
|---|---|---|
| **1 aug 2026** | BV inschrijven KvK | Open |
| **4 aug 2026** | BAL-melding indienen (omgevingsloket.nl) | Concept klaar (D+E open) |
| Z.s.m. | Gmail-draft Evert + Kevin CC | Draft klaar |
| Vóór tekening | VvE-reglement opvragen | Open |

## 3. Sessie-start protocol

1. **Dit bestand** (INDEX.md) — staat in ≤150 regels
2. **[session_state.md](session_state.md)** — open acties + beslissingen
3. **Stop** — alle relevante staat nu geladen

Dieper: gerichte Read op files uit §1 of §2.

## 4. Plannen & docs

- [docs/superpowers/plans/](docs/superpowers/plans/) — implementatieplannen
- [docs/2026-06-11-werkplaats3b-bv-opzet.md](docs/2026-06-11-werkplaats3b-bv-opzet.md) — BV-opzet
