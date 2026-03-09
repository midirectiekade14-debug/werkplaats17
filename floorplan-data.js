// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS17 — PLATTEGROND DATA                           ║
// ║  Bewerk via admin.html → Publiceer naar GitHub             ║
// ╚══════════════════════════════════════════════════════════════╝

const FLOORPLAN = {
  lastModified: "2026-03-09T15:00:00Z",

  floors: [
    { id: "all", label: "Overzicht" },
    { id: "entresol", label: "Entresol" },
    { id: "bg", label: "Begane grond" }
  ],

  // Matches original SVG viewBox
  viewBox: { width: 500, height: 320 },

  objects: [
    // ── ENTRESOL (top band, y=20..100) ──
    { id: "unit-a", type: "huurunit", label: "Unit A", floor: "entresol", x: 20, y: 20, width: 115, height: 80, rotation: 0, color: "#7a7060", bg: "rgba(224,154,47,0.04)", status: "beschikbaar", area: 25, price: "€950/mnd" },
    { id: "unit-b", type: "huurunit", label: "Unit B", floor: "entresol", x: 135, y: 20, width: 115, height: 80, rotation: 0, color: "#7a7060", bg: "rgba(224,154,47,0.04)", status: "bezet", area: 25, price: "€950/mnd" },
    { id: "unit-c", type: "huurunit", label: "Unit C", floor: "entresol", x: 250, y: 20, width: 115, height: 80, rotation: 0, color: "#7a7060", bg: "rgba(224,154,47,0.04)", status: "beschikbaar", area: 25, price: "€950/mnd" },
    { id: "unit-d", type: "huurunit", label: "Unit D", floor: "entresol", x: 365, y: 20, width: 115, height: 80, rotation: 0, color: "#7a7060", bg: "rgba(224,154,47,0.04)", status: "bezet", area: 25, price: "€950/mnd" },

    // ── BEGANE GROND — Werkvloer (y=100..280) ──
    { id: "machinezone", type: "infra", label: "Machinezone", floor: "bg", x: 40, y: 145, width: 180, height: 80, rotation: 0, color: "#E09A2F", bg: "rgba(224,154,47,0.03)", status: null, area: null, price: null },
    { id: "fz", type: "machine", label: "FZ", floor: "bg", x: 55, y: 172, width: 30, height: 18, rotation: 0, color: "#7a7060", bg: "none", status: null, area: null, price: null },
    { id: "vd", type: "machine", label: "VD", floor: "bg", x: 95, y: 172, width: 30, height: 18, rotation: 0, color: "#7a7060", bg: "none", status: null, area: null, price: null },
    { id: "lz", type: "machine", label: "LZ", floor: "bg", x: 135, y: 172, width: 30, height: 18, rotation: 0, color: "#7a7060", bg: "none", status: null, area: null, price: null },
    { id: "mz", type: "machine", label: "MZ", floor: "bg", x: 175, y: 172, width: 30, height: 18, rotation: 0, color: "#7a7060", bg: "none", status: null, area: null, price: null },

    // Flexspace
    { id: "flexspace", type: "werkplek", label: "Flexspace", floor: "bg", x: 240, y: 145, width: 220, height: 80, rotation: 0, color: "#7a7060", bg: "rgba(240,234,224,0.02)", status: null, area: null, price: null },

    // Onderste rij
    { id: "opslag", type: "opslag", label: "Opslag", floor: "bg", x: 20, y: 240, width: 140, height: 40, rotation: 0, color: "#7a7060", bg: "rgba(224,154,47,0.03)", status: null, area: null, price: null },
    { id: "kantoor", type: "infra", label: "Kantoor", floor: "bg", x: 170, y: 240, width: 100, height: 40, rotation: 0, color: "#7a7060", bg: "rgba(240,234,224,0.02)", status: null, area: null, price: null },
    { id: "bureau", type: "infra", label: "Bureau", floor: "bg", x: 280, y: 240, width: 100, height: 40, rotation: 0, color: "#7a7060", bg: "rgba(240,234,224,0.02)", status: null, area: null, price: null },

    // Overheaddeuren
    { id: "deur1", type: "infra", label: "Deur 1", floor: "bg", x: 400, y: 272, width: 40, height: 8, rotation: 0, color: "#E09A2F", bg: "rgba(224,154,47,0.12)", status: null, area: null, price: null },
    { id: "deur2", type: "infra", label: "Deur 2", floor: "bg", x: 450, y: 272, width: 30, height: 8, rotation: 0, color: "#E09A2F", bg: "rgba(224,154,47,0.12)", status: null, area: null, price: null }
  ],

  legend: [
    { label: "Beschikbaar", color: "rgba(76,175,80,0.15)", borderColor: "#4CAF50" },
    { label: "Bezet", color: "rgba(120,120,120,0.1)", borderColor: "#666" },
    { label: "Gereserveerd", color: "rgba(255,152,0,0.15)", borderColor: "#FF9800" },
    { label: "Machinezone", color: "rgba(224,154,47,0.06)", borderColor: "#E09A2F" },
    { label: "Overig", color: "rgba(240,234,224,0.04)", borderColor: "#3a3425" }
  ]
};
