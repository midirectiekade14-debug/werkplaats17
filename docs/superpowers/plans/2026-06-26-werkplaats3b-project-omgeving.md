# Werkplaats3b — Eigen Project-Omgeving

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Werkplaats3b een geïsoleerde context-bubble geven identiek aan het BMI-model — bij opstarten in ~/projects/werkplaats17/ laadt alleen relevante werkplaats-context, niet de volledige home-graph met 143+ nodes.

**Architecture:** Drie lagen zoals BMI: (1) dedicated memory-dir met eigen graph.json zodat route-project-index.py de lean werkplaats-graph laadt via PROJECT_GRAPHS; (2) workspace INDEX.md in de cwd als compact sessie-router met stop-protocol; (3) session_state.md als project-level carry-over. Home memory behoudt een pointer (INDEX-werkplaats17.md) voor per-turn routing in andere sessies.

**Tech Stack:** Python (build-memory-graph.py, route-project-index.py), Markdown (memory-files), JSON (graph.json)

---

## Bestandsoverzicht

| Actie | Pad |
|---|---|
| Create | `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/MEMORY.md` |
| Create | `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/INDEX-werkplaats3b.md` |
| Create | `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/project_werkplaats3b_businesscase.md` |
| Create (auto) | `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/graphify-out/graph.json` |
| Modify | `~/.claude/hooks/route-project-index.py` |
| Create | `~/projects/werkplaats17/INDEX.md` |
| Create | `~/projects/werkplaats17/session_state.md` |
| Modify | `~/.claude/projects/C--Users-midir/memory/INDEX-werkplaats17.md` (home pointer updaten) |
| Modify | `~/.claude/projects/C--Users-midir/memory/MEMORY.md` (pointer opschonen) |
| Delete | `~/.claude/projects/C--Users-midir/memory/project_werkplaats17.md` (stale "gemerged"-node) |
| Delete | `~/.claude/projects/C--Users-midir/memory/project_werkplaats17_businesscase.md` (verhuisd) |
| Run | `python ~/.claude/scripts/build-memory-graph.py ~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory` |
| Run | `python ~/.claude/scripts/build-memory-graph.py ~/.claude/projects/C--Users-midir/memory` |

---

## Task 1: Dedicated memory-dir aanmaken + MEMORY.md

**Files:**
- Create: `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/MEMORY.md`

- [ ] **Stap 1: Maak memory-dir aan**

```bash
mkdir -p "$HOME/.claude/projects/C--Users-midir-projects-werkplaats3b/memory"
```

- [ ] **Stap 2: Schrijf MEMORY.md**

Inhoud:
```markdown
# Memory — Werkplaats3b

Project-memory index voor ~/projects/werkplaats17 (website + businesscase Oud Camp 3B Maasland).

## Index
- [INDEX-werkplaats3b](INDEX-werkplaats3b.md) — project-overzicht, sessie-protocol, locaties, stack
- [project_werkplaats3b_businesscase](project_werkplaats3b_businesscase.md) — huurcontract Oud Camp 3B, partijen, deadlines, contractwijzigingen
```

- [ ] **Stap 3: Verifieer**

```bash
ls "$HOME/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/"
```
Verwacht: `MEMORY.md`

---

## Task 2: INDEX-werkplaats3b.md in dedicated memory

**Files:**
- Create: `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/INDEX-werkplaats3b.md`

- [ ] **Stap 1: Schrijf INDEX-werkplaats3b.md**

```markdown
---
name: INDEX-werkplaats3b
description: Werkplaats3b — website (GitHub Pages, HTML/CSS/JS) + businesscase (Oud Camp 3B Maasland, huurcontract €54.720/jr). Workspace-router in ~/projects/werkplaats17/INDEX.md.
type: index
keywords: [werkplaats3b, werkplaats17, w17, maasland, oud-camp-3b, huurcontract, businesscase, github-pages, html, css, js, floorplan, admin, content, deploy, plattegrond, rotterdam, werkruimte, atelier, meubelmakerij, bv-oprichting, kvk, bal-melding, kevin, evert, malkenhorst, fokker]
updated: 2026-06-26
---

## Wanneer relevant
cwd `~/projects/werkplaats17/` (website Maasland + businesscase) of `~/projects/werkplaats17-rotterdam/` (Rotterdam locatie).

## Sessie-start protocol
1. **[INDEX.md](file:///C:/Users/midir/projects/werkplaats17/INDEX.md)** — staat in ≤150 regels
2. **[session_state.md](file:///C:/Users/midir/projects/werkplaats17/session_state.md)** — open acties + beslissingen
3. **Stop** — complete staat geladen, geen losse memory-files nodig

Dieper: gerichte Read op files uit INDEX §1/§2.

## Twee locaties
- **Maasland**: Oud Camp 3B, 904m2 — `~/projects/werkplaats17/`, branch `master`, CNAME `werkplaats3b.nl`
- **Rotterdam**: Van Maasdijkweg 29, 785m2 — `~/projects/werkplaats17-rotterdam/`, branch `main`

## Stack
Plain HTML/CSS/JS, geen build step, GitHub Pages. Admin wachtwoord: WMH2026.
Auto-deploy: elke commit+push → live (geen CI nodig).

## Detail-memory
→ [project_werkplaats3b_businesscase.md](project_werkplaats3b_businesscase.md) — huurcontract details
```

---

## Task 3: Businesscase-memory migreren naar dedicated dir

**Files:**
- Create: `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/project_werkplaats3b_businesscase.md`
- Delete later (Task 8): `~/.claude/projects/C--Users-midir/memory/project_werkplaats17_businesscase.md`

- [ ] **Stap 1: Kopieer en hernoem businesscase-file**

Inhoud voor `project_werkplaats3b_businesscase.md` (bijgewerkte versie van de home-memory file):

```markdown
---
name: project_werkplaats3b_businesscase
description: "Businesscase Werkplaats3b — huurcontract Oud Camp 3B Maasland, contractonderhandeling status, partijen, deadlines augustus 2026."
metadata:
  node_type: memory
  type: project
  keywords:
    - werkplaats3b
    - werkplaats17
    - huurcontract
    - oud-camp-3b
    - maasland
    - midden-delfland
    - businesscase
    - meubelmakerij
    - onderverhuur
    - bal-melding
    - bv-oprichting
    - malkenhorst
    - fokker
    - evert
    - kevin
updated: 2026-06-26
---

## Locatie & partijen

- **Pand**: Oud Camp 3B, 3155 DL Maasland (gemeente Midden-Delfland)
- **Verhuurder**: Kevin Rochten
- **Makelaar verhuurder**: Evert — `evert@malkenhorstmakelaars.nl` (Malkenhorst Makelaars)
- **Makelaar huurder**: Joiselle Fokker — `joiselle@fokkerrealestate.nl` (Fokker Real Estate)
- **Huurder**: nader op te richten BV (Harm van den Ven hoofdelijk aansprakelijk)
- **Ingangsdatum**: 1 september 2026 · Looptijd: 5 jaar
- **Jaarhuur**: €54.720 excl. BTW · Waarborgsom: €19.425,60

## Bestemmingsplan

- Plan: **Bedrijven Coldenhovenlaan 2013** (vastgesteld 19-07-2013, gemeente Midden-Delfland)
- Bestemming: Bedrijfsdoeleinden t/m **categorie B3.1**
- Meubelmakerij = VNG-categorie 2 → past ruim binnen B3.1 ✓

## Gmail-thread

- Subject: `Re: Concept huurovk [B100279-23629082]`
- Thread ID: `19edc13fbb938777`
- Concept huurovk verstuurd door makelaar: 24 juni 2026
- Harm's review-reply (draft): `r-508861397778231193` — **nog niet verstuurd**, Kevin CC ontbreekt

## Drive-folder

- Businesscase Werkplaats17 (folder ID: `1LYrPlZbysoH7-9MYKQVGp-waHOhJmoTI`)
- Documenten:
  - `Contractwijzigingsverzoek Oud Camp 3B — conceptmail makelaar.md`
  - `BAL-melding Werkplaats3B — invulconcept.md` (sectie D+E nog aanvullen)
  - `Werkplaats3b-bv-oprichtingsplan.pdf`

## 5 contractwijzigingspunten

1. **Art. 15**: Onderverhuur toestaan — max. 3 werkplekken, meubel/interieursector
2. **Art. 1.2**: Bestemming uitbreiden — "meubelbedrijf incl. verhuur werkruimten aan derden"
3. **Art. 13**: Servicekosten specificeren (componenten, maximum, afrekentermijn)
4. **Nieuw**: Ontbindende voorwaarden — BV-oprichting vóór 1-8-2026 en/of financiering
5. **Art. 4**: CPI-indexering methode b vastleggen (jan/jan, jaarlijks 1 september)

## Deadlines

| Actie | Deadline | Status |
|---|---|---|
| BV inschrijven KvK | 1 augustus 2026 | Open |
| eHerkenning EH2+ aanvragen | Z.s.m. na KvK | Open |
| Gmail-draft verzenden aan Evert + Kevin CC | Z.s.m. | Draft klaar, Kevin CC ontbreekt |
| BAL-melding indienen (omgevingsloket.nl) | 4 augustus 2026 | Concept klaar, BV+machineoverzicht nodig |
| VvE-reglement opvragen bij verhuurder | Vóór tekening | Open |

**Why:** Businesscase Werkplaats3b = meubelmakerij + onderverhuur werkplekken. Contractueel verbod op onderverhuur (art. 15) is de kritieke blokkade voor het businessmodel.
**How to apply:** Bij elke huurcontract/Oud Camp/BV vraag: check of contractwijzigingen al akkoord zijn en BV-oprichting loopt.
```

- [ ] **Stap 2: Verifieer aanmaak**

```bash
ls "$HOME/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/"
```
Verwacht: `MEMORY.md`, `INDEX-werkplaats3b.md`, `project_werkplaats3b_businesscase.md`

---

## Task 4: Lean graph.json bouwen

**Files:**
- Create (auto): `~/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/graphify-out/graph.json`

- [ ] **Stap 1: Bouw graph**

```bash
python "$HOME/.claude/scripts/build-memory-graph.py" \
  "$HOME/.claude/projects/C--Users-midir-projects-werkplaats3b/memory"
```

- [ ] **Stap 2: Verifieer graph.json**

```bash
python -c "
import json, pathlib
g = json.loads(pathlib.Path('$HOME/.claude/projects/C--Users-midir-projects-werkplaats3b/memory/graphify-out/graph.json').read_text())
print('Nodes:', len(g['nodes']))
for n in g['nodes']: print(' -', n['id'], n.get('type',''))
"
```
Verwacht: 2-3 nodes (INDEX-werkplaats3b, project_werkplaats3b_businesscase, evt. MEMORY)

---

## Task 5: PROJECT_GRAPHS entry registreren

**Files:**
- Modify: `~/.claude/hooks/route-project-index.py` (regel 24-27)

- [ ] **Stap 1: Voeg werkplaats17 toe aan PROJECT_GRAPHS**

Huidige inhoud (regels 24-27):
```python
PROJECT_GRAPHS: dict[str, Path] = {
    "dispuut bmi mvgm": Path.home() / ".claude" / "projects" /
        "C--Users-midir-Documents-Claude-Projects-Dispuut-BMI-MVGM" / "memory" / "graphify-out" / "graph.json",
}
```

Vervangen door:
```python
PROJECT_GRAPHS: dict[str, Path] = {
    "dispuut bmi mvgm": Path.home() / ".claude" / "projects" /
        "C--Users-midir-Documents-Claude-Projects-Dispuut-BMI-MVGM" / "memory" / "graphify-out" / "graph.json",
    "werkplaats3b": Path.home() / ".claude" / "projects" /
        "C--Users-midir-projects-werkplaats3b" / "memory" / "graphify-out" / "graph.json",
    "werkplaats17": Path.home() / ".claude" / "projects" /
        "C--Users-midir-projects-werkplaats3b" / "memory" / "graphify-out" / "graph.json",
}
```

> **Opmerking:** `"werkplaats17"` is een fallback voor zolang de lokale map nog niet hernoemd is. Na `ren werkplaats17 werkplaats3b` kan die regel verwijderd worden.

- [ ] **Stap 2: Test de routing-logica**

```bash
echo '{"cwd": "C:/Users/midir/projects/werkplaats17"}' | python "$HOME/.claude/hooks/route-project-index.py"
```
Verwacht: output bevat `werkplaats3b` of `INDEX-werkplaats3b`, NIET BMI of andere ongerelateerde nodes.

---

## Task 6: Workspace INDEX.md aanmaken in cwd

**Files:**
- Create: `~/projects/werkplaats17/INDEX.md`

- [ ] **Stap 1: Schrijf INDEX.md**

```markdown
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
Git remote: `https://github.com/midirectiekade14-debug/werkplaats17.git`

## 2. Businesscase — Status & deadlines

**Partijen:**
- Verhuurder: Kevin Rochten · via Evert `evert@malkenhorstmakelaars.nl`
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
```

- [ ] **Stap 2: Verifieer aanmaak**

```bash
head -5 "C:/Users/midir/projects/werkplaats17/INDEX.md"
```
Verwacht: YAML frontmatter met `type: workspace-index`

---

## Task 7: session_state.md aanmaken in cwd

**Files:**
- Create: `~/projects/werkplaats17/session_state.md`

- [ ] **Stap 1: Schrijf session_state.md**

```markdown
# session_state.md — Werkplaats3b

*Bijwerken na elke sessie met relevante veranderingen. Peildatum: 2026-06-26*

## Open acties

| Actie | Prioriteit | Context |
|---|---|---|
| Gmail-draft versturen (Kevin CC toevoegen) | Hoog | Thread `19edc13fbb938777`, draft `r-508861397778231193` |
| BV inschrijven KvK | Hoog | Deadline 1 aug 2026 |
| eHerkenning EH2+ aanvragen | Hoog | Z.s.m. na KvK-inschrijving |
| BAL-melding sectie D+E completeren | Medium | Machineoverzicht + BV-naam nodig; deadline 4 aug 2026 |
| VvE-reglement opvragen bij verhuurder | Medium | Vóór tekening huurcontract |

## Beslissingen (meest recent bovenaan)

- **2026-06-25**: Rebrand werkplaats17 → werkplaats3b voltooid in codebase (CNAME, content, README)
- **2026-06-26**: Eigen project-omgeving opgezet (dedicated memory, PROJECT_GRAPHS, workspace INDEX)

## Carry-over

- Astro rewrite (`astro/`) — niet urgente achtergrondontwikkeling, NIET deployed
- 5 contractwijzigingspunten in Gmail-draft; wachten op Kevin's e-mailadres van makelaar
- `placed-objects.js` = single source of truth voor plattegrond — admin laadt altijd vanuit GitHub bij init
```

---

## Task 8: Home memory opschonen

**Files:**
- Modify: `~/.claude/projects/C--Users-midir/memory/INDEX-werkplaats17.md`
- Modify: `~/.claude/projects/C--Users-midir/memory/MEMORY.md`
- Delete: `~/.claude/projects/C--Users-midir/memory/project_werkplaats17_businesscase.md`
- Delete: `~/.claude/projects/C--Users-midir/memory/project_werkplaats17.md` (stale node)

- [ ] **Stap 1: Update INDEX-werkplaats17.md — sessie-protocol toevoegen + pointer naar workspace**

Vervang volledige inhoud van [INDEX-werkplaats17.md](file:///C:/Users/midir/.claude/projects/C--Users-midir/memory/INDEX-werkplaats17.md) door:

```markdown
---
name: INDEX-werkplaats17
description: Werkplaats3b — website (GitHub Pages, HTML/CSS/JS) + businesscase (Oud Camp 3B Maasland). Workspace-router in ~/projects/werkplaats17/INDEX.md.
type: index
keywords: [werkplaats3b, werkplaats17, w17, maasland, oud-camp-3b, huurcontract, businesscase, github-pages, html, css, js, floorplan, admin, content, deploy, plattegrond, rotterdam, werkruimte, atelier, meubelmakerij, bv-oprichting, kvk, bal-melding, kevin, evert, malkenhorst, fokker]
updated: 2026-06-26
---

## Wanneer relevant
cwd `~/projects/werkplaats17/` (website + businesscase Maasland) of `~/projects/werkplaats17-rotterdam/` (Rotterdam).

## Sessie-start protocol (cwd ~/projects/werkplaats17/)
1. **[INDEX.md](file:///C:/Users/midir/projects/werkplaats17/INDEX.md)** — overzicht in ≤150r
2. **[session_state.md](file:///C:/Users/midir/projects/werkplaats17/session_state.md)** — open acties
3. **Stop** — complete staat geladen

## Twee locaties
- **Maasland**: Oud Camp 3B, 904m2 — `~/projects/werkplaats17/`, branch `master`, CNAME werkplaats3b.nl
- **Rotterdam**: Van Maasdijkweg 29, 785m2 — `~/projects/werkplaats17-rotterdam/`, branch `main`

## Stack
Plain HTML/CSS/JS, geen build step, GitHub Pages. Admin wachtwoord: WMH2026.

## Detail
→ [Workspace INDEX.md](file:///C:/Users/midir/projects/werkplaats17/INDEX.md) — complete staat
```

- [ ] **Stap 2: Verwijder stale home memory files**

```bash
rm "$HOME/.claude/projects/C--Users-midir/memory/project_werkplaats17_businesscase.md"
rm "$HOME/.claude/projects/C--Users-midir/memory/project_werkplaats17.md"
```

- [ ] **Stap 3: Update MEMORY.md pointer in home memory**

In [MEMORY.md](file:///C:/Users/midir/.claude/projects/C--Users-midir/memory/MEMORY.md):

Zoek de werkplaats-regels (huidige sectie Sessie & projecten) en vervang inline werkplaats-entries door:
```
- [Werkplaats3b](INDEX-werkplaats17.md) — website GH-Pages + businesscase Oud Camp 3B [2026-06-26]
```
(verwijder losse `project_werkplaats17_businesscase` en `project_werkplaats17` entries)

---

## Task 9: Beide graphs rebuilden

- [ ] **Stap 1: Rebuild home graph**

```bash
python "$HOME/.claude/scripts/build-memory-graph.py" \
  "$HOME/.claude/projects/C--Users-midir/memory"
```

Verwacht: geen error; `graphify-out/graph.json` bijgewerkt, werkplaats17/businesscase nodes verwijderd.

- [ ] **Stap 2: Rebuild werkplaats graph (controle)**

```bash
python "$HOME/.claude/scripts/build-memory-graph.py" \
  "$HOME/.claude/projects/C--Users-midir-projects-werkplaats3b/memory"
```

---

## Task 10: Verifieer isolatie

- [ ] **Stap 1: Simuleer sessie-start routing**

```bash
echo '{"cwd": "C:/Users/midir/projects/werkplaats17"}' | python "$HOME/.claude/hooks/route-project-index.py"
```
Verwacht output:
```
[graph-context] N node(s) geladen uit C--Users-midir-projects-werkplaats3b/graphify-out/graph.json:
  [index] INDEX-werkplaats3b -- Werkplaats3b ...
  [project] project_werkplaats3b_businesscase -- ...
```
NIET aanwezig: BMI-nodes, ikbenok-nodes, ikbenok-nodes, of andere home-project nodes.

- [ ] **Stap 2: Verifieer home-cwd routing niet aangetast**

```bash
echo '{"cwd": "C:/Users/midir"}' | python "$HOME/.claude/hooks/route-project-index.py"
```
Verwacht: home graph (INDEX-werkplaats17 etc.) nog steeds bereikbaar.

- [ ] **Stap 3: Verifieer BMI routing niet aangetast**

```bash
echo '{"cwd": "C:/Users/midir/Documents/Claude/Projects/Dispuut BMI MVGM"}' | python "$HOME/.claude/hooks/route-project-index.py"
```
Verwacht: BMI-dedicated graph laadt (INDEX-dispuut-bmi-mvgm), NIET werkplaats.

- [ ] **Stap 4: Commit INDEX.md en session_state.md**

```bash
cd "C:/Users/midir/projects/werkplaats17"
git add INDEX.md session_state.md
git commit -m "chore: voeg workspace INDEX.md + session_state.md toe (project-omgeving isolatie)"
```

---

## Self-Review

**Spec-coverage:**
- ✓ Dedicated memory-dir (Task 1-3)
- ✓ Lean graph.json (Task 4)
- ✓ PROJECT_GRAPHS entry (Task 5) — cwd match `"werkplaats17"` in `c:/users/midir/projects/werkplaats17` ✓
- ✓ Workspace INDEX.md met sessie-protocol (Task 6)
- ✓ session_state.md (Task 7)
- ✓ Home memory opschonen (Task 8)
- ✓ Graph rebuilds (Task 9)
- ✓ Isolatie-verificatie (Task 10)

**Placeholder-scan:** geen TBD/TODO in code-content — alle file-inhouden uitgeschreven.

**Risico's:**
- `route-tech-index-graph.py` (per-turn hook) gebruikt uitsluitend home graph — werkplaats per-turn routing werkt via de bijgewerkte `INDEX-werkplaats17.md` pointer in home memory ✓
- Home graph rebuild kan sneller dan verwacht falen als er syntax-fouten in andere memory-files zitten — build-memory-graph.py faalt graceful ✓
- `project_werkplaats17.md` verwijderen is veilig: node is gelabeld "Gemerged in INDEX-werkplaats17.md (2026-06-14 dream-consolidatie)" ✓
