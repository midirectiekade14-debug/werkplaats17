// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS17 — RENDER                                      ║
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

  // Photo labels
  if (Array.isArray(C.photoLabels)) {
    var phLabels = document.querySelectorAll('.photo-strip .ph-label');
    C.photoLabels.forEach(function (txt, i) {
      if (phLabels[i]) phLabels[i].textContent = txt;
    });
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
    function imgFor(path, alt) {
      var img = document.createElement('img');
      img.src = path + (path.indexOf('?') === -1 ? '?t=' + Date.now() : '');
      img.alt = alt || '';
      img.loading = 'lazy';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      return img;
    }
    if (PHOTOS.hero) {
      var heroWrap = document.querySelector('.hero-image');
      if (heroWrap) replaceChildren(heroWrap, imgFor(PHOTOS.hero, 'Werkplaats17'));
    }
    if (Array.isArray(PHOTOS.strip)) {
      var strip = document.querySelectorAll('.photo-strip .photo-placeholder');
      PHOTOS.strip.forEach(function (p, i) {
        if (!p || !strip[i]) return;
        var label = strip[i].querySelector('.ph-label');
        replaceChildren(strip[i], imgFor(p, 'Sfeerbeeld ' + (i + 1)));
        if (label) strip[i].appendChild(label);
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
})();
