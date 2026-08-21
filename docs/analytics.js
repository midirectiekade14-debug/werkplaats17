// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS3B — ANALYTICS-FUNDAMENT                           ║
// ║  Eén verantwoordelijkheid: meten. Werkt volledig met alle     ║
// ║  ID's leeg -- dan draait alleen de interne event-laag, naast  ║
// ║  de losstaande Cloudflare-beacon in index.html (cookieloos,   ║
// ║  altijd aan, hoort hier niet bij).                            ║
// ╚══════════════════════════════════════════════════════════════╝
(function () {

  // ── CONFIG ──
  // ga4Id: Google Analytics 4 meet-ID. GA4 → Beheer → Gegevensstromen →
  //   (je webstream) → bovenaan de Stream-ID, formaat 'G-XXXXXXXXXX'.
  // metaPixelId: Meta-pixel-ID. Meta Events Manager → Databronnen →
  //   (je pixel) → Instellingen, een getal van 15-16 cijfers.
  // googleAdsId: Google Ads-account-ID bij de conversieactie. Google Ads →
  //   Tools en instellingen → Metingen → Conversies → (actie) →
  //   Instellingen → "Tag zelf instellen" → het stuk vóór de '/',
  //   formaat 'AW-XXXXXXXXX'.
  // googleAdsLabel: hetzelfde scherm, het stuk ná de '/' in dat fragment.
  // debug: true logt elk event ook naar de console; in productie false.
  // Een leeg ID betekent: die bestemming laadt niet. Alle vier leeg
  // opleveren -- dit bestand moet daarmee compleet werken.
  var CONFIG = {
    ga4Id:            '',   // 'G-XXXXXXXXXX'
    metaPixelId:      '',   // '1234567890123456'
    googleAdsId:      '',   // 'AW-XXXXXXXXX'
    googleAdsLabel:   '',   // conversielabel voor de aanvraag
    debug:            false // true => events ook naar console
  };

  // ── INTERNE STAAT ──
  var LOG = [];                       // ring-buffer, max 50, altijd gevuld
  var GELADEN = { ga: false, meta: false };
  var ZES_MAANDEN_MS = 1000 * 60 * 60 * 24 * 182;
  var HERKOMST_VELDEN = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
    'utm_content', 'gclid', 'fbclid', 'msclkid'];
  // Meta-standaardevents; wat hier niet in staat gaat via trackCustom.
  var META_STANDAARD = {
    contact_mail: 'Contact',
    contact_whatsapp: 'Contact',
    contact_telefoon: 'Contact',
    aanvraag_bevestigd: 'Lead' // bedankt.html, ná een echt verstuurde aanvraag
  };

  // ── TOESTEMMING (AVG) ──
  // Sleutel 'w3b_consent' draagt letterlijk 'granted' of 'denied'. De
  // timestamp staat in een eigen sleutel ('w3b_consent_ts') -- alleen zo kan
  // een 'denied' na 6 maanden vanzelf verlopen (opnieuw vragen) zonder de
  // waarde van 'w3b_consent' zelf iets anders te laten zijn dan die twee
  // woorden.
  function heeftPrivacySignaal() {
    try {
      if (navigator.globalPrivacyControl === true) return true;
      if (navigator.doNotTrack === '1') return true;
    } catch (e) {}
    return false;
  }

  // Effectieve status: 'granted' | 'denied' | null (nog geen keuze).
  // GPC/DNT wint altijd, ook van een oudere expliciete 'granted' -- het is
  // een levend browsersignaal, geen eenmalige keuze.
  function consentStatus() {
    if (heeftPrivacySignaal()) return 'denied';
    var waarde = null, ts = null;
    try {
      waarde = window.localStorage.getItem('w3b_consent');
      ts = window.localStorage.getItem('w3b_consent_ts');
    } catch (e) { return null; }
    if (waarde === 'granted') return 'granted';
    if (waarde === 'denied') {
      var tijd = ts ? parseInt(ts, 10) : 0;
      if (tijd && (Date.now() - tijd) < ZES_MAANDEN_MS) return 'denied';
      return null; // verlopen: opnieuw vragen
    }
    return null;
  }

  function schrijfKeuze(status) {
    try {
      window.localStorage.setItem('w3b_consent', status);
      window.localStorage.setItem('w3b_consent_ts', String(Date.now()));
    } catch (e) {}
  }

  // ── Banner tonen/verbergen ──
  // De markup zelf staat in index.html; hier alleen het mechaniek.
  function bannerHoogteZetten(el) {
    try {
      var h = Math.ceil(el.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--w3b-banner-h', h + 'px');
    } catch (e) {}
  }
  var resizeGekoppeld = false;
  function toonBanner() {
    // Hard grens: met een actief privacysignaal verschijnt de balk nooit,
    // ongeacht wie toonBanner() aanroept (init(), reset(), of iets anders
    // later). Dit is de enige plek die dat voor "tonen" hoeft te bewaken.
    if (heeftPrivacySignaal()) return;
    try {
      var el = document.getElementById('w3b-consent');
      if (!el) return;
      el.hidden = false;
      document.body.classList.add('w3b-banner-open');
      bannerHoogteZetten(el);
      // .mob-cta moet boven de balk blijven ook als het venster van formaat
      // verandert terwijl de balk nog open staat.
      if (!resizeGekoppeld) {
        resizeGekoppeld = true;
        window.addEventListener('resize', function () {
          if (document.body.classList.contains('w3b-banner-open')) bannerHoogteZetten(el);
        });
      }
    } catch (e) {}
  }
  function verbergBanner() {
    try {
      var el = document.getElementById('w3b-consent');
      if (el) el.hidden = true;
      document.body.classList.remove('w3b-banner-open');
      document.documentElement.style.removeProperty('--w3b-banner-h');
    } catch (e) {}
  }
  function koppelBanner() {
    try {
      var accepteren = document.getElementById('w3b-consent-accepteren');
      var weigeren = document.getElementById('w3b-consent-weigeren');
      var meer = document.getElementById('w3b-consent-meer');
      var uitleg = document.getElementById('w3b-consent-uitleg');
      if (accepteren) accepteren.addEventListener('click', function () { CONSENT.grant(); });
      if (weigeren) weigeren.addEventListener('click', function () { CONSENT.deny(); });
      if (meer && uitleg) meer.addEventListener('click', function () {
        var open = uitleg.hidden;
        uitleg.hidden = !open;
        meer.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      var privacySluit = document.getElementById('w3b-privacy-melding-sluit');
      if (privacySluit) privacySluit.addEventListener('click', verbergPrivacyMelding);
    } catch (e) {}
  }

  // ── Privacysignaal-melding (R8) ──
  // Vervangt de vroegere window.alert(): een systeemdialoog is een stijlbreuk
  // op deze site en treft precies de privacybewuste bezoekers het vaakst. De
  // markup staat in index.html, zelfde vaste-balkbehandeling als de
  // toestemmingsbalk hierboven, maar een eigen resize-koppeling: deze en de
  // toestemmingsbalk verschijnen nooit tegelijk (toonBanner() weigert al
  // zodra heeftPrivacySignaal() true is), maar delen daarom niet dezelfde
  // afgesloten 'resizeGekoppeld'-vlag/element hierboven.
  var privacyMeldingResizeGekoppeld = false;
  var privacyMeldingTimer = null;
  function toonPrivacyMelding() {
    try {
      var el = document.getElementById('w3b-privacy-melding');
      if (!el) return;
      el.hidden = false;
      document.body.classList.add('w3b-banner-open');
      bannerHoogteZetten(el);
      if (!privacyMeldingResizeGekoppeld) {
        privacyMeldingResizeGekoppeld = true;
        window.addEventListener('resize', function () {
          if (!el.hidden) bannerHoogteZetten(el);
        });
      }
      if (privacyMeldingTimer) clearTimeout(privacyMeldingTimer);
      privacyMeldingTimer = setTimeout(verbergPrivacyMelding, 6000);
    } catch (e) {}
  }
  function verbergPrivacyMelding() {
    try {
      var el = document.getElementById('w3b-privacy-melding');
      if (el) el.hidden = true;
      document.body.classList.remove('w3b-banner-open');
      document.documentElement.style.removeProperty('--w3b-banner-h');
      if (privacyMeldingTimer) { clearTimeout(privacyMeldingTimer); privacyMeldingTimer = null; }
    } catch (e) {}
  }

  // Zichtbare, eerlijke reactie in plaats van een stille no-op: een actief
  // GPC/DNT-signaal wint altijd, ook van een expliciete grant()-aanroep
  // (bijv. vanaf de console) of van de "Cookievoorkeur"-link in de footer.
  // Er is dan niets te kiezen -- de browser dwingt weigeren al af -- dus
  // zeggen we dat in plaats van net te doen alsof de klik niets deed.
  function meldPrivacySignaal() {
    toonPrivacyMelding();
  }

  var CONSENT = {
    grant: function () {
      if (heeftPrivacySignaal()) { verbergBanner(); meldPrivacySignaal(); return; }
      schrijfKeuze('granted');
      verbergBanner();
      laadTags();
    },
    deny: function () {
      schrijfKeuze('denied');
      verbergBanner();
    },
    status: function () { return consentStatus(); },
    // Voor de "Cookievoorkeur"-link in de footer: wist de keuze en toont de
    // balk meteen weer -- tenzij een privacysignaal actief is, dan blijft de
    // balk dicht en krijgt de bezoeker in plaats daarvan de melding hierboven.
    reset: function () {
      try {
        window.localStorage.removeItem('w3b_consent');
        window.localStorage.removeItem('w3b_consent_ts');
      } catch (e) {}
      if (heeftPrivacySignaal()) { meldPrivacySignaal(); return; }
      toonBanner();
    }
  };

  // ── Tags laden (alleen ná toestemming, alleen als het ID gevuld is) ──
  function laadGoogle() {
    if (GELADEN.ga) return;
    // Nogmaals bewaakt op het laadpunt zelf (niet alleen bij de aanroeper):
    // zo blijft de garantie staan ook als laadGoogle() ooit ergens anders
    // vandaan aangeroepen wordt.
    if (heeftPrivacySignaal()) return;
    var heeftAds = CONFIG.googleAdsId && CONFIG.googleAdsLabel;
    var id = CONFIG.ga4Id || (heeftAds ? CONFIG.googleAdsId : '');
    if (!id) return;
    try {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      // Alleen GA4 krijgt een config-call; Ads wordt uitsluitend gebruikt
      // voor de aanvraag-conversie via send_to (trackConversie), niet voor
      // een algemene remarketing-tag op elke pagina.
      if (CONFIG.ga4Id) window.gtag('config', CONFIG.ga4Id);
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
      document.head.appendChild(s);
      GELADEN.ga = true;
    } catch (e) {}
  }
  function laadMeta() {
    if (GELADEN.meta || !CONFIG.metaPixelId) return;
    if (heeftPrivacySignaal()) return;
    try {
      // Officiële Meta Pixel-basiscode.
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = true; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = true;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
      window.fbq('init', CONFIG.metaPixelId);
      window.fbq('track', 'PageView');
      GELADEN.meta = true;
    } catch (e) {}
  }
  function laadTags() {
    laadGoogle();
    laadMeta();
  }

  // ── Event-API ──
  function schrijfLog(naam, props) {
    try {
      LOG.push({ naam: naam, props: props, ts: Date.now() });
      if (LOG.length > 50) LOG.shift();
      if (CONFIG.debug) console.info('[w3b]', naam, props);
    } catch (e) {}
  }
  function stuurGA4(naam, props) {
    try {
      if (!CONFIG.ga4Id) return;
      if (consentStatus() !== 'granted') return;
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', naam, props);
    } catch (e) {}
  }
  function stuurMeta(naam, props) {
    try {
      if (!CONFIG.metaPixelId) return;
      if (consentStatus() !== 'granted') return;
      if (typeof window.fbq !== 'function') return;
      var standaard = META_STANDAARD[naam];
      if (standaard) window.fbq('track', standaard, props);
      else window.fbq('trackCustom', naam, props);
    } catch (e) {}
  }
  function stuurAdsConversie() {
    try {
      if (!CONFIG.googleAdsId || !CONFIG.googleAdsLabel) return;
      if (consentStatus() !== 'granted') return;
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', 'conversion', { send_to: CONFIG.googleAdsId + '/' + CONFIG.googleAdsLabel });
    } catch (e) {}
  }
  function track(naam, props) {
    props = props || {};
    stuurGA4(naam, props);
    stuurMeta(naam, props);
    schrijfLog(naam, props);
    return props;
  }
  // Doet alles wat track() doet, en vuurt daarnaast de Google Ads-conversie
  // af -- maar alleen als beide config-waarden gevuld zijn én er
  // toestemming is. Zonder die waarden gedraagt hij zich exact als track().
  function trackConversie(naam, props) {
    props = props || {};
    track(naam, props);
    stuurAdsConversie();
    return props;
  }

  // ── Eerste-aanraking-herkomst ──
  // First-party gegevens die de bezoeker zelf meestuurt in de eigen URL of
  // via document.referrer, en die alleen bij een aanvraag verzonden worden
  // -- dat vraagt geen toestemming. First-touch (localStorage) wordt na de
  // eerste keer nooit meer overschreven; last-touch (sessionStorage) wél,
  // telkens als een bezoek een van deze velden meebrengt.
  function refDomein() {
    try {
      if (!document.referrer) return '';
      return new URL(document.referrer).hostname;
    } catch (e) { return ''; }
  }
  function huidigeSnapshot() {
    var snap = {};
    try {
      var params = new URLSearchParams(window.location.search);
      HERKOMST_VELDEN.forEach(function (v) {
        var val = params.get(v);
        if (val) snap[v] = val;
      });
    } catch (e) {}
    snap.referrer = refDomein();
    snap.landing = window.location.pathname;
    snap.ts = new Date().toISOString();
    return snap;
  }
  function heeftHerkomstVelden(snap) {
    return HERKOMST_VELDEN.some(function (v) { return !!snap[v]; });
  }
  function leesJSON(store, key) {
    try {
      var raw = store.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }
  function initHerkomst() {
    var snap = huidigeSnapshot();
    try {
      if (!window.localStorage.getItem('w3b_herkomst')) {
        window.localStorage.setItem('w3b_herkomst', JSON.stringify(snap));
      }
    } catch (e) {}
    try {
      if (heeftHerkomstVelden(snap)) {
        window.sessionStorage.setItem('w3b_sessie', JSON.stringify(snap));
      }
    } catch (e) {}
  }
  function herkomst() {
    return {
      first: leesJSON(window.localStorage, 'w3b_herkomst'),
      last: leesJSON(window.sessionStorage, 'w3b_sessie')
    };
  }

  // ── Automatische klik-events ──
  // Eén gedelegeerde listener op document; werkt ook voor knoppen die pas
  // later in de pagina bijkomen (mob-cta, plattegrond-links, etc.).
  function plaatsVan(a) {
    if (a.closest('.mob-cta')) return 'mob-cta';
    if (a.closest('.cta-block')) return 'cta-block';
    if (a.closest('footer')) return 'footer';
    return 'overig';
  }
  function labelVan(a) {
    return (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
  }
  function koppelKlikEvents() {
    document.addEventListener('click', function (e) {
      try {
        var a = e.target && e.target.closest ? e.target.closest('a') : null;
        if (!a) return;
        var href = a.getAttribute('href') || '';
        var naam = null;
        if (href.indexOf('mailto:') === 0) naam = 'contact_mail';
        else if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) naam = 'contact_whatsapp';
        else if (href.indexOf('tel:') === 0) naam = 'contact_telefoon';
        else if (href.indexOf('instagram.com') !== -1) naam = 'social_instagram';
        else if (/\.pdf$/i.test(href)) naam = 'download_pdf';
        if (!naam) return;
        track(naam, { label: labelVan(a), plaats: plaatsVan(a), href: href });
      } catch (e) {}
    });
  }

  // ── Betrokkenheid ──
  // Scrolldiepte en sectie-in-beeld via IntersectionObserver (met
  // feature-detect); de 30-seconden-timer werkt via visibilitychange, zoals
  // gevraagd.
  function initSectieGezien() {
    if (typeof IntersectionObserver === 'undefined') return;
    try {
      var els = [].slice.call(document.querySelectorAll('.section-label'));
      var contact = document.getElementById('contact');
      if (contact) els.push(contact);
      if (!els.length) return;
      var gezien = {};
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var naam = entry.target.__w3bSectie;
          if (!naam || gezien[naam]) return;
          gezien[naam] = true;
          track('sectie_gezien', { sectie: naam });
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.5 });
      els.forEach(function (el) {
        // #contact heeft zelf geen .section-label ervoor; 'contact' (de id)
        // is dan de naam.
        var naam = el === contact ? 'contact' : (el.textContent || '').trim().toLowerCase();
        if (!naam) return;
        el.__w3bSectie = naam;
        obs.observe(el);
      });
    } catch (e) {}
  }
  function initScrollDiepte() {
    if (typeof IntersectionObserver === 'undefined') return;
    function plaatsMarkers() {
      try {
        var hoogte = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        if (!hoogte) return;
        var gezien = {};
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var p = entry.target.__w3bProcent;
            if (gezien[p]) return;
            gezien[p] = true;
            track('scroll_diepte', { procent: p });
            obs.unobserve(entry.target);
          });
        });
        [25, 50, 75, 100].forEach(function (p) {
          var top = Math.max(0, Math.round(hoogte * p / 100) - 1);
          var marker = document.createElement('div');
          marker.setAttribute('aria-hidden', 'true');
          marker.style.cssText = 'position:absolute;left:0;width:1px;height:1px;opacity:0;pointer-events:none;top:' + top + 'px;';
          marker.__w3bProcent = p;
          document.body.appendChild(marker);
          obs.observe(marker);
        });
      } catch (e) {}
    }
    // Pas meten als de pagina (incl. async geladen content) klaar is --
    // anders klopt scrollHeight nog niet en landen de markers te hoog.
    if (document.readyState === 'complete') plaatsMarkers();
    else window.addEventListener('load', plaatsMarkers);
  }
  function initBetrokkenBezoek() {
    var DUUR = 30000;
    var opgeteld = 0;    // actieve tijd tot nu toe, in ms
    var begin = null;    // start van de huidige actieve periode
    var klaar = false;
    var timer = null;
    function stop() {
      if (timer) { clearTimeout(timer); timer = null; }
      if (begin !== null) { opgeteld += Date.now() - begin; begin = null; }
    }
    function vuur() {
      if (klaar) return;
      klaar = true;
      stop();
      track('betrokken_bezoek', {});
    }
    function start() {
      if (klaar || begin !== null) return;
      if (document.visibilityState !== 'visible') return;
      begin = Date.now();
      timer = setTimeout(vuur, Math.max(0, DUUR - opgeteld));
    }
    try {
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') start(); else stop();
      });
      start();
    } catch (e) {}
  }

  // ── Init ──
  function init() {
    koppelBanner();
    var status = consentStatus();
    if (status === 'granted') laadTags();
    else if (status === null) toonBanner();
    // 'denied': niets doen, balk blijft verborgen.

    initHerkomst();
    koppelKlikEvents();
    initSectieGezien();
    initScrollDiepte();
    initBetrokkenBezoek();
  }
  try { init(); } catch (e) { /* analytics mag de site nooit meeslepen */ }

  // ── Publieke API ──
  window.w3b = {
    track: track,
    trackConversie: trackConversie,
    consent: CONSENT,
    herkomst: herkomst,
    _log: LOG
  };

})();
