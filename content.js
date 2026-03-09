// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS17 — CONTENT CONFIGURATIE                       ║
// ║  Pas hier alle teksten, prijzen en contactgegevens aan.    ║
// ║  Na aanpassing: opslaan → site herlaadt automatisch.       ║
// ╚══════════════════════════════════════════════════════════════╝

const CONTENT = {

  // ── META & SEO ──
  siteTitle: "Werkplaats17 — Professionele werkruimte Rotterdam",
  metaDescription: "Volwaardige werkruimte voor zelfstandige vakmensen en kleine studio's. Vaste werkplek met toegang tot professionele machines. Schaapherderweg 17, Rotterdam.",
  ogDescription: "Volwaardige werkruimte voor zelfstandige vakmensen en kleine studio's. Vaste werkplek, professionele machines, flexspace.",

  // ── HEADER ──
  eyebrow: "Beschikbaar · Rotterdam Ring-oost",
  tagline: "Volwaardige werkruimte voor<br>professionele makers",

  // ── LOCATIE ──
  locationText: "Schaapherderweg 17 · Afslag IJsselmonde (A15) · Direct aan de ring",

  // ── INTRO ──
  introText: `Werkplaats17 is een <strong>volledig uitgeruste werkplaats</strong> voor zelfstandige vakmensen en kleine studio's. Je huurt een vaste werkplek én toegang tot professionele machines — inclusief de ruimte om te groeien als een project het vraagt.<br><br>Gevestigd naast een actieve meubelmakerij. Directe toegang, gedeelde kennis, professionele omgeving.`,

  // ── KENMERKEN (naast intro) ──
  accessItems: [
    "24/7 toegang",
    "Eigen sleutel",
    "Kantoor & ontvangstruimte",
  ],

  // ── FOTOSTRIP LABELS ──
  photoLabels: ["Werkvloer", "Machines", "Entresol"],

  // ── AANBOD (4 kaarten) ──
  offers: [
    { title: "Vaste werkplek", text: "Open unit op de entresol. Altijd beschikbaar, laat je project staan." },
    { title: "Flexspace", text: "Werkvloer voor grote projecten. Meer ruimte wanneer je die nodig hebt." },
    { title: "Opslag", text: "Basisopslag inbegrepen bij je werkplek. Extra opslag huurbaar." },
    { title: "Faciliteiten", text: "Bureauruimte, gezamenlijke ruimte, 2 overheaddeuren, parkeren op eigen terrein." },
  ],

  // ── MACHINES (highlight = amber gemarkeerd) ──
  machines: [
    { name: "Formaatzaag", highlight: true },
    { name: "Vlak- & vandiktebank", highlight: true },
    { name: "Lintzaag", highlight: true },
    { name: "3D printer", highlight: true },
    { name: "Metaalzaag", highlight: false },
    { name: "Straalcabine", highlight: false },
    { name: "Afzuiging", highlight: false },
    { name: "Perslucht", highlight: false },
    { name: "Alle handgereedschappen", highlight: false },
  ],

  // ── TARIEVEN ──
  pricing: [
    { label: "Werkplek entresol", sub: "~25 m² · machines inbegrepen", price: "€950", unit: "/mnd" },
    { label: "Extra opslag", sub: "Plaatrek of vloerruimte", price: "v.a. €60", unit: "/mnd" },
  ],
  pricingNote: "Alle prijzen excl. BTW. Exacte prijs afhankelijk van unit en afspraken — neem contact op voor een rondleiding.",

  // ── VOOR WIE ──
  targetAudience: [
    "Zelfstandig meubelmaker of restaurateur",
    "Interieurontwerper die zelf prototypes bouwt",
    "Kleine studio zonder eigen productieruimte",
    "Timmerman / interieurbouwer met eigen projecten",
    "Maker die meer ruimte en machines nodig heeft",
  ],
  notForText: `<strong>KvK-inschrijving verplicht.</strong> Werkplaats17 is uitsluitend voor professionele gebruikers. Particulieren en hobbyisten kunnen hier niet terecht.`,

  // ── CTA / CONTACT ──
  ctaHeading: 'Interesse?<br>Kom <em>kijken.</em>',
  email: "info@werkplaats17.nl",
  whatsappNumber: "31612345678",  // Zonder + of spaties
  whatsappText: "Hoi, ik heb interesse in een werkplek bij Werkplaats17.",
  contactLines: [
    "Schaapherderweg 17, Rotterdam ring-oost (afslag IJsselmonde)",
    "Beperkt aantal plekken beschikbaar",
  ],

  // ── INSTAGRAM ──
  instagramHandle: "@werkplaats17",
  instagramUrl: "https://instagram.com/werkplaats17",

  // ── FOOTER ──
  hashtags: "#werkplaats17 #rotterdam<br>#makerspace #meubelmaker<br>#vakman #werkruimte",
  copyright: "© 2025 Werkplaats17",
};
