// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS3B — RENDER                                      ║
// ║  Vult index.html met waarden uit CONTENT (content.js).      ║
// ║  content.js = enige bron van waarheid voor de teksten.      ║
// ╚══════════════════════════════════════════════════════════════╝
(function () {
  if (typeof CONTENT === 'undefined') {
    console.warn('[render] CONTENT niet geladen — content.js ontbreekt?');
    return;
  }
  var C = CONTENT;

  // CONTENT komt uit ons eigen admin-paneel (GitHub content.js), geen user-input.
  // We parsen het via DOMParser zodat we HTML (<strong>, <br>, <em>) kunnen
  // injecteren zonder script-execution of onx= handlers uit te voeren.
  var parser = new DOMParser();
  function parseHTML(str) {
    var doc = parser.parseFromString('<body>' + String(str) + '</body>', 'text/html');
    var frag = document.createDocumentFragment();
    var nodes = doc.body.childNodes;
    while (nodes.length) frag.appendChild(nodes[0]);
    return frag;
  }
  function replaceChildren(el, fragOrNode) {
    while (el.firstChild) el.removeChild(el.firstChild);
    if (fragOrNode) el.appendChild(fragOrNode);
  }
  function setHTML(sel, val) {
    var el = document.querySelector(sel);
    if (!el || val == null) return;
    replaceChildren(el, parseHTML(val));
  }
  function setText(sel, val) {
    var el = document.querySelector(sel);
    if (el && val != null) el.textContent = val;
  }
  function setAttr(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el && val != null) el.setAttribute(attr, val);
  }

  // <head>
  if (C.siteTitle) document.title = C.siteTitle;
  setAttr('meta[name="description"]', 'content', C.metaDescription);
  setAttr('meta[property="og:title"]', 'content', C.siteTitle);
  setAttr('meta[property="og:description"]', 'content', C.ogDescription);

  // Header
  setText('header .eyebrow', C.eyebrow);
  setText('header .tagline', C.tagline);

  // Locatie
  setText('.location-bar span', C.locationText);

  // Intro
  setHTML('.intro p', C.introText);

  // Access items — behoud icoon, vervang tekst
  if (Array.isArray(C.accessItems)) {
    var accessEls = document.querySelectorAll('.access-detail .access-item');
    C.accessItems.forEach(function (txt, i) {
      var el = accessEls[i];
      if (!el) return;
      var ico = el.querySelector('.ico');
      replaceChildren(el, ico || null);
      el.appendChild(document.createTextNode(' ' + txt));
    });
  }

  // De maatvoering van de fotorij, ingesteld in het admin-paneel en opgeslagen
  // in photos.js als {ratio:"4/3", perBeeld:3, autoplay:0, vervaging:0}. De
  // stylesheet houdt dezelfde waarden als terugval aan, dus een photos.js zonder
  // deze sleutel laat de rij er precies zo uitzien als voordat dit bestond.
  //
  // perBeeld is hoeveel foto's er op een breed scherm naast elkaar staan. Er zit
  // geen tussenruimte tussen de vakjes, dus de breedte is een schone deling.
  // Op een telefoon telt perBeeld niet mee -- daar is één foto per keer het
  // enige dat leesbaar is, alleen wordt een staande foto smaller gehouden
  // omdat hij anders langer wordt dan het scherm hoog is.
  function zetStripFormaat(baan, opties) {
    var o = opties || {};
    var ratio = typeof o.ratio === 'string' && /^\d+(\.\d+)?\s*\/\s*\d+(\.\d+)?$/.test(o.ratio) ? o.ratio : '4/3';
    var per = Math.max(1, Math.min(6, parseInt(o.perBeeld, 10) || 3));
    var delen = ratio.split('/');
    var staand = parseFloat(delen[0]) / parseFloat(delen[1]) < 1;
    baan.style.setProperty('--strip-ratio', ratio);
    baan.style.setProperty('--strip-basis', 'calc(100% / ' + per + ')');
    baan.style.setProperty('--strip-basis-mob', staand ? '62%' : '88%');
    // Seconden in de admin, milliseconden voor de timer in index.html.
    var auto = Math.max(0, parseFloat(o.autoplay) || 0);
    if (auto) baan.dataset.autoplay = Math.round(auto * 1000);
    else delete baan.dataset.autoplay;
    // De vervaging hoort bij de rij als geheel en niet bij een los vakje, dus
    // hij gaat op de laag eromheen. Een percentage van de striphoogte, zodat
    // hij bij elk formaat dezelfde verhouding houdt.
    var laag = baan.parentNode && baan.parentNode.classList.contains('ps-viewport') ? baan.parentNode : baan;
    var fade = Math.max(0, Math.min(50, parseFloat(o.vervaging) || 0));
    laag.style.setProperty('--strip-fade', fade + '%');
  }

  // Offers
  if (Array.isArray(C.offers)) {
    var offerCards = document.querySelectorAll('.offer-grid .offer-card');
    C.offers.forEach(function (o, i) {
      var card = offerCards[i];
      if (!card) return;
      var h3 = card.querySelector('h3');
      var p = card.querySelector('p');
      if (h3) h3.textContent = o.title || '';
      if (p) replaceChildren(p, parseHTML(o.text || ''));
    });
  }

  // Machines — lijst opnieuw opbouwen
  if (Array.isArray(C.machines)) {
    var machineList = document.querySelector('.machines-block .machine-list');
    if (machineList) {
      replaceChildren(machineList, null);
      C.machines.forEach(function (m) {
        var span = document.createElement('span');
        span.className = 'machine-tag' + (m.highlight ? ' highlight' : '');
        span.textContent = m.name || '';
        machineList.appendChild(span);
      });
    }
  }

  // Pricing rows
  if (Array.isArray(C.pricing)) {
    var priceRows = document.querySelectorAll('.pricing-block .pricing-row');
    C.pricing.forEach(function (p, i) {
      var row = priceRows[i];
      if (!row) return;
      var label = row.querySelector('.label');
      var sub = row.querySelector('.sub');
      var price = row.querySelector('.price');
      if (label) label.textContent = p.label || '';
      if (sub) sub.textContent = p.sub || '';
      if (price) {
        replaceChildren(price, document.createTextNode(p.price || ''));
        var small = document.createElement('small');
        small.textContent = p.unit || '';
        price.appendChild(small);
      }
    });
  }

  // Pricing note
  setText('.pricing-note', C.pricingNote);

  // Voor wie
  if (Array.isArray(C.targetAudience)) {
    var critList = document.querySelector('.for-who .criteria-list');
    if (critList) {
      replaceChildren(critList, null);
      C.targetAudience.forEach(function (t) {
        var li = document.createElement('li');
        var check = document.createElement('span');
        check.className = 'check';
        check.textContent = '✦';
        li.appendChild(check);
        li.appendChild(document.createTextNode(' ' + t));
        critList.appendChild(li);
      });
    }
  }
  setHTML('.for-who .not-for', C.notForText);

  // Wie zijn wij — sectielabel, menulabel, intro, personen, noot
  setText('#wij', C.aboutLabel);
  setText('.nav-links a[href="#wij"]', C.aboutNavLabel);
  setHTML('.about-block .about-lead', C.aboutLead);
  setHTML('.about-block .about-note', C.aboutNote);

  // Personen opnieuw opbouwen: het aantal is niet vast, admin kan er een
  // toevoegen of weghalen. Een lege tekstregel levert geen lege <p> op.
  if (Array.isArray(C.team)) {
    var people = document.querySelector('.about-people');
    if (people) {
      replaceChildren(people, null);
      C.team.forEach(function (p) {
        if (!p || !p.name) return;
        var card = document.createElement('div');
        card.className = 'person';
        if (p.photo) {
          var fig = document.createElement('div');
          fig.className = 'person-photo';
          var foto = document.createElement('img');
          foto.src = p.photo + (p.photo.indexOf('?') === -1 ? '?t=' + Date.now() : '');
          foto.alt = p.name;
          foto.loading = 'lazy';
          // Leeg laten wint hier van "midden" zetten: dan blijft de CSS-regel
          // center 30% gelden, die het hoofd net iets hoger in beeld houdt.
          if (p.pos) foto.style.objectPosition = p.pos;
          fig.appendChild(foto);
          card.appendChild(fig);
        } else {
          // Geen foto: de beginletter houdt de kaart in balans naast een
          // buurman die er wel een heeft.
          var ini = document.createElement('span');
          ini.className = 'initial';
          ini.textContent = String(p.name).trim().charAt(0).toUpperCase();
          card.appendChild(ini);
        }
        var h3 = document.createElement('h3');
        h3.textContent = p.name;
        card.appendChild(h3);
        if (p.role) {
          var role = document.createElement('span');
          role.className = 'role';
          role.textContent = p.role;
          card.appendChild(role);
        }
        if (p.text) {
          var txt = document.createElement('p');
          txt.appendChild(parseHTML(p.text));
          card.appendChild(txt);
        }
        people.appendChild(card);
      });
    }
  }

  // CTA heading
  setHTML('.cta-block h2', C.ctaHeading);

  // Mail knop
  var mailBtn = document.querySelector('.cta-actions a.btn-primary');
  if (mailBtn && C.email) mailBtn.setAttribute('href', 'mailto:' + C.email);

  // WhatsApp knop
  var waBtn = document.querySelector('.cta-actions a.btn-secondary');
  if (waBtn && C.whatsappNumber) {
    var waText = encodeURIComponent(C.whatsappText || '');
    waBtn.setAttribute('href', 'https://wa.me/' + C.whatsappNumber + '?text=' + waText);
  }

  // CTA info lines
  if (Array.isArray(C.contactLines)) {
    var ctaLines = document.querySelectorAll('.cta-info .cta-line');
    C.contactLines.forEach(function (txt, i) {
      var line = ctaLines[i];
      if (!line) return;
      var span = line.querySelector('span');
      if (!span) return;
      if (/rondleiding/i.test(txt) && C.email) {
        replaceChildren(span, document.createTextNode(txt + ' — '));
        var a = document.createElement('a');
        a.href = 'mailto:' + C.email;
        a.textContent = C.email;
        span.appendChild(a);
      } else {
        span.textContent = txt;
      }
    });
  }

  // Instagram
  var igLink = document.querySelector('.insta-handle a');
  if (igLink) {
    if (C.instagramUrl) igLink.setAttribute('href', C.instagramUrl);
    if (C.instagramHandle) igLink.textContent = C.instagramHandle;
  }

  // Footer hashtags
  setHTML('footer .hashtags', C.hashtags);

  // Photos — hero + strip. photos.js definieert PHOTOS = {hero, strip:[..]}
  if (typeof PHOTOS !== 'undefined' && PHOTOS) {
    // PHOTOS.pos houdt per slot de uitsnede vast ("50% 30%"). Alleen
    // afwijkingen staan erin; een slot dat ontbreekt valt terug op het midden.
    var POS = PHOTOS.pos || {};
    function imgFor(path, alt, slotId) {
      var img = document.createElement('img');
      img.src = path + (path.indexOf('?') === -1 ? '?t=' + Date.now() : '');
      img.alt = alt || '';
      img.loading = 'lazy';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.objectPosition = POS[slotId] || '50% 50%';
      img.style.display = 'block';
      return img;
    }
    // De vervaging van de grote foto staat los van die van de rij: het zijn
    // twee verschillende plekken op de pagina en de ene mag zachter dan de
    // andere. Buiten het if-blok hieronder, want hij hoort ook te werken als er
    // (nog) geen foto in staat en de getekende hal in beeld is.
    var heroWrap = document.querySelector('.hero-image');
    if (heroWrap) {
      var hf = (PHOTOS.heroFormaat && typeof PHOTOS.heroFormaat === 'object') ? PHOTOS.heroFormaat : {};
      heroWrap.style.setProperty('--hero-fade', Math.max(0, Math.min(50, parseFloat(hf.vervaging) || 0)) + '%');
      if (PHOTOS.hero) replaceChildren(heroWrap, imgFor(PHOTOS.hero, 'Werkplaats3b', 'hero'));
    }
    if (Array.isArray(PHOTOS.strip)) {
      // De pagina heeft drie vakjes met een getekende placeholder erin. Zijn er
      // meer foto's dan dat, dan maken we er vakjes bij -- de slider schuift ze
      // vanzelf mee. Zo kunnen er foto's bij zonder de pagina aan te raken.
      var baan = document.querySelector('.photo-strip');
      var echteFotos = PHOTOS.strip.filter(Boolean).length;
      if (baan) {
        zetStripFormaat(baan, PHOTOS.stripFormaat);
        var vakjes = baan.querySelectorAll('.photo-placeholder');
        for (var n = vakjes.length; n < PHOTOS.strip.length; n++) {
          var extra = document.createElement('div');
          extra.className = 'photo-placeholder';
          baan.appendChild(extra);
        }
        // Minder foto's dan vakjes: de overtollige weg. Alleen als er ECHT
        // foto's staan -- op een verse site zonder photos.js-inhoud horen de
        // drie getekende placeholders gewoon te blijven staan.
        if (echteFotos) {
          var over = baan.querySelectorAll('.photo-placeholder');
          for (var m = over.length - 1; m >= PHOTOS.strip.length; m--) {
            over[m].parentNode.removeChild(over[m]);
          }
        }
      }
      var strip = document.querySelectorAll('.photo-strip .photo-placeholder');
      PHOTOS.strip.forEach(function (p, i) {
        if (!p || !strip[i]) return;
        replaceChildren(strip[i], imgFor(p, 'Sfeerbeeld ' + (i + 1), 'strip-' + i));
        strip[i].classList.add('has-photo');
      });
    }
  }

  // Copyright (admin link behouden)
  var copy = document.querySelector('footer .copy');
  if (copy && C.copyright) {
    var adminLink = copy.querySelector('a[href="admin.html"]');
    replaceChildren(copy, document.createTextNode(C.copyright + ' · '));
    if (adminLink) copy.appendChild(adminLink);
  }

  // ── TEKSTOPMAAK ────────────────────────────────────────────────
  // Kleur en tekstgrootte per tekstsoort, ingesteld in het admin-paneel en
  // opgeslagen in CONTENT.styles. Staat er niets, dan gebeurt hier niets en
  // blijft de stylesheet alleen de baas — precies zoals vóór deze sectie.
  //
  // De sleutels hieronder zijn dezelfde als in CE_SCHEMA (admin.html); daar
  // kiest de beheerder ze, hier weten we welke elementen erbij horen.
  var STYLE_TARGETS = {
    eyebrow:        'header .eyebrow',
    tagline:        'header .tagline',
    locationText:   '.location-bar span',
    introText:      '.intro p',
    accessItems:    '.access-detail .access-item',
    offerTitle:     '.offer-grid .offer-card h3',
    offerText:      '.offer-grid .offer-card p',
    machines:       '.machines-block .machine-tag',
    pricingLabel:   '.pricing-block .pricing-row .label',
    pricingPrice:   '.pricing-block .pricing-row .price',
    pricingNote:    '.pricing-note',
    targetAudience: '.for-who .criteria-list li',
    notForText:     '.for-who .not-for',
    aboutLead:      '.about-block .about-lead',
    teamName:       '.about-people .person h3, .about-people .person .initial',
    teamRole:       '.about-people .person .role',
    teamText:       '.about-people .person p',
    aboutNote:      '.about-block .about-note',
    ctaHeading:     '.cta-block h2',
    contactLines:   '.cta-info .cta-line span',
    hashtags:       'footer .hashtags',
    copyright:      'footer .copy',
    // Onderdelen waarvan de TEKST in index.html staat en dus niet via de
    // content-editor loopt. De opmaak hoort wel bij te stellen te zijn: het
    // gaat om koppen en knoppen die de bezoeker als eerste ziet.
    sectionLabels:  '.section-label',
    siteTitle:      'header h1',
    navLinks:       '.nav-links a',
    brandName:      '.nav-brand, footer .brand',
    pricingSub:     '.pricing-block .pricing-row .sub',
    floorplanText:  '.fp-tab, .legend-item, #fp-hint',
    buttons:        '.btn-primary, .btn-secondary',
    // Dikgedrukte woorden binnen een tekst. Zonder eigen instelling houden ze
    // de kleur die per sectie in de stylesheet staat (crème, amber). Zet je
    // hier wél een kleur, dan geldt die overal -- handig juist wanneer je een
    // alinea de kleur geeft die zijn nadruk al had.
    emphasis:       '.page strong'
  };

  function applyStyles() {
    var st = C.styles;
    if (!st) return;
    // De grootte is één getal voor de hele site, maar een telefoon heeft zijn
    // eigen, al ruimere basismaten. 200% op een kop werd daar 28px met brede
    // letterafstand: twee regels per kop en een pagina die uit elkaar valt.
    // Op een telefoon houden we daarom de maten van de stylesheet aan. Kleur
    // en vet gelden wel overal -- die kosten geen ruimte.
    var telefoon = window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
    Object.keys(STYLE_TARGETS).forEach(function (key) {
      var regels = st[key];
      var els = document.querySelectorAll(STYLE_TARGETS[key]);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        el.style.color = (regels && regels.color) ? regels.color : '';
        // Leeg laten = de stylesheet beslist. Sommige onderdelen staan al op
        // 500 of 600; die horen hun eigen gewicht te houden zolang "vet" uit
        // staat, in plaats van naar 400 teruggezet te worden.
        el.style.fontWeight = (regels && regels.bold) ? '700' : '';
        // De grootte is een factor op wat de stylesheet zegt, niet een vaste
        // pixelmaat: de site heeft mediaqueries op de tekstschaal, en die
        // moeten blijven werken. Eerst onze eigen inline-waarde weghalen,
        // anders meten we onze vorige uitkomst in plaats van de basis.
        el.style.fontSize = '';
        if (!telefoon && regels && regels.size && regels.size !== 100) {
          var basis = parseFloat(window.getComputedStyle(el).fontSize);
          if (basis) el.style.fontSize = (basis * regels.size / 100).toFixed(2) + 'px';
        }
      }
    });
  }

  applyStyles();

  // Onderdelen die pas later ontstaan (de legenda onder de plattegrond) halen
  // hun opmaak hiermee alsnog op.
  window.applyContentStyles = applyStyles;

  // Laadt de pagina terwijl het venster nog van maat verandert (een preview-
  // paneel dat openklapt, een browser die zijn vorige afmeting herstelt), dan
  // is de gemeten basis die van een ander breekpunt en staat de factor op een
  // verkeerd getal vast -- zonder dat er ooit een resize langskomt om het te
  // herstellen. Bij `load` ligt de opmaak vast, dus daar één keer overdoen.
  window.addEventListener('load', applyStyles);

  // Bij een andere vensterbreedte gelden andere basisgroottes, dus dan moet
  // de factor opnieuw gerekend worden.
  var styleTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(styleTimer);
    styleTimer = setTimeout(applyStyles, 150);
  });
})();
