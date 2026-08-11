// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS3B — ENTREE-CARROUSEL                             ║
// ║  Verticale story-intro over de site bij eerste bezoek.       ║
// ║  Inhoud staat in entree-slides.js (ENTREE); het boot-blok    ║
// ║  bovenaan de <body> zet #entree-laag klaar en laadt dit      ║
// ║  bestand alleen als de bezoeker deze versie nog niet zag.    ║
// ║  Grondregel: de carrousel mag de site nooit gijzelen.        ║
// ╚══════════════════════════════════════════════════════════════╝
(function () {
  var SLIDE_MS = 4000;         // vier seconden per slide
  var FADE_MS = 400;           // overvloeier bij sluiten
  var EERSTE_BEELD_MS = 2000;  // eerste beeld niet op tijd binnen → overslaan
  var HOLD_MS = 250;           // ingedrukt houden = pauze
  var SWIPE_PX = 40;           // veegdrempel
  var SLEUTEL = 'wp3b-entree-gezien';

  // de dekklaag kan ontbreken (stale cache: boot-blok wist nog niet van deze
  // campagne) — dan maakt bouw() hem alsnog aan, pas als het eerste beeld er is
  var laag = document.getElementById('entree-laag');
  if (window._entreeActief) return;

  var config = (typeof ENTREE !== 'undefined' && ENTREE) || null;
  if (!config || !Array.isArray(config.slides) || !config.slides.length) {
    if (window._entreeWeg) window._entreeWeg();
    return;
  }

  window._entreeActief = true;
  if (window._entreeVangnet) { clearTimeout(window._entreeVangnet); window._entreeVangnet = null; }

  var versie = config.versie || 1;
  var slides = config.slides;
  var kapot = [];              // beelden die niet laden — die slides slaan we over
  var huidig = 0;
  var open = false;
  var dichtBezig = false;
  var opgegeven = false;
  var timerId = null, timerStart = 0, timerRest = 0, gepauzeerd = false;

  // prefers-reduced-motion: niets loopt of beweegt vanzelf
  var stil = false;
  try { stil = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  var stijl = null, balkVullen = [], img = null, sluitKnop = null;
  var ariaOud = [], focusOud = null;

  // ── opruimen — elke afsluitroute komt hier uit; de laag gaat écht weg
  function haalWeg() {
    if (timerId) { clearTimeout(timerId); timerId = null; }
    document.removeEventListener('keydown', opToets, true);
    for (var i = 0; i < ariaOud.length; i++) {
      if (ariaOud[i].oud === null) ariaOud[i].el.removeAttribute('aria-hidden');
      else ariaOud[i].el.setAttribute('aria-hidden', ariaOud[i].oud);
    }
    ariaOud = [];
    document.body.style.overflow = '';
    if (laag && laag.parentNode) laag.parentNode.removeChild(laag);
    if (stijl && stijl.parentNode) stijl.parentNode.removeChild(stijl);
    if (focusOud && focusOud.focus) { try { focusOud.focus(); } catch (e) {} }
  }

  function sluit() {
    if (dichtBezig) return;
    dichtBezig = true;
    if (timerId) { clearTimeout(timerId); timerId = null; }
    if (stil) { haalWeg(); return; }
    laag.style.transition = 'opacity ' + FADE_MS + 'ms ease';
    laag.style.opacity = '0';
    setTimeout(haalWeg, FADE_MS + 50);
  }

  // ── slide-navigatie; kapotte beelden worden overgeslagen
  function volgendeIndex(v) {
    var j = v + 1;
    while (j < slides.length && kapot[j]) j++;
    return j < slides.length ? j : -1;
  }
  function vorigeIndex(v) {
    var j = v - 1;
    while (j >= 0 && kapot[j]) j--;
    return j;
  }
  function naarVolgende() {
    if (dichtBezig) return;
    var j = volgendeIndex(huidig);
    if (j === -1) sluit(); else toon(j);
  }
  function naarVorige() {
    if (dichtBezig) return;
    var j = vorigeIndex(huidig);
    if (j >= 0) toon(j);   // terugtikken op de eerste slide doet niets
  }

  // ── teller (4 s per slide); pauze bewaart de resttijd
  function startTeller() {
    if (timerId) clearTimeout(timerId);
    timerRest = SLIDE_MS;
    timerStart = Date.now();
    gepauzeerd = false;
    timerId = setTimeout(naarVolgende, timerRest);
  }
  function pauzeer() {
    if (stil || gepauzeerd) return;
    gepauzeerd = true;
    if (timerId) {
      clearTimeout(timerId); timerId = null;
      timerRest -= (Date.now() - timerStart);
    }
    if (balkVullen[huidig]) balkVullen[huidig].style.animationPlayState = 'paused';
  }
  function hervat() {
    if (stil || !gepauzeerd) return;
    gepauzeerd = false;
    timerStart = Date.now();
    if (timerRest > 0) timerId = setTimeout(naarVolgende, timerRest);
    else naarVolgende();
    if (balkVullen[huidig]) balkVullen[huidig].style.animationPlayState = 'running';
  }

  function toon(i) {
    huidig = i;
    img.alt = slides[i].alt || '';
    img.src = slides[i].src;
    for (var j = 0; j < balkVullen.length; j++) {
      var vul = balkVullen[j];
      vul.style.animation = 'none';
      if (j < i || (stil && j === i)) vul.style.transform = 'scaleX(1)';
      else vul.style.transform = 'scaleX(0)';
      if (!stil && j === i) {
        // herstart de vul-animatie: eerst resetten, dan opnieuw zetten
        void vul.offsetWidth;
        vul.style.animation = 'entree-vul ' + SLIDE_MS + 'ms linear forwards';
      }
    }
    if (!stil) startTeller();
  }

  function opToets(e) {
    if (e.key === 'Escape') { e.preventDefault(); sluit(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); naarVolgende(); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); naarVorige(); return; }
    if (e.key === 'Tab') { e.preventDefault(); if (sluitKnop) sluitKnop.focus(); }
    // spatie bereikt de sluitknop (daar staat de focus) en activeert die — bewust
  }

  function bouw() {
    open = true;

    // markeer als gezien zodra hij echt getoond wordt; mislukt de opslag
    // (privémodus), dan gewoon tonen — de site mag hier nooit op stuklopen
    try { window.localStorage.setItem(SLEUTEL, String(versie)); } catch (e) {}

    if (!laag) {
      laag = document.createElement('div');
      laag.id = 'entree-laag';
      laag.style.cssText = 'position:fixed;inset:0;z-index:9000;background:#161412';
      document.body.appendChild(laag);
      document.body.style.overflow = 'hidden';
    }

    stijl = document.createElement('style');
    stijl.textContent =
      '#entree-laag .entree-balken{position:absolute;top:12px;left:50%;transform:translateX(-50%);width:min(94vw,560px);display:flex;gap:5px;z-index:3;pointer-events:none}' +
      '#entree-laag .entree-balk{flex:1;height:3px;background:rgba(240,234,224,.25);border-radius:2px;overflow:hidden}' +
      '#entree-laag .entree-balk-vul{height:100%;width:100%;background:#F0EAE0;transform:scaleX(0);transform-origin:left center}' +
      '@keyframes entree-vul{from{transform:scaleX(0)}to{transform:scaleX(1)}}' +
      '#entree-laag .entree-sluit{position:absolute;top:22px;right:10px;z-index:3;background:none;border:none;color:#F0EAE0;font-size:26px;line-height:1;padding:10px 12px;cursor:pointer;font-family:inherit}' +
      '#entree-laag .entree-sluit:focus-visible{outline:2px solid #E09A2F;outline-offset:2px;border-radius:4px}' +
      '#entree-laag .entree-beeld{display:block;max-width:94vw;max-height:calc(100vh - 88px);max-height:calc(100dvh - 88px);width:auto;height:auto;border-radius:6px;box-shadow:0 8px 40px rgba(0,0,0,.5);-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;touch-action:none;cursor:pointer}';
    document.head.appendChild(stijl);

    // de dekkende bootlaag wordt de vervaagde story-laag
    laag.style.transition = 'background .45s ease';
    laag.style.background = 'rgba(17,15,13,0.82)';
    laag.style.webkitBackdropFilter = 'blur(14px)';
    laag.style.backdropFilter = 'blur(14px)';
    laag.style.display = 'flex';
    laag.style.alignItems = 'center';
    laag.style.justifyContent = 'center';
    laag.style.touchAction = 'none';
    laag.setAttribute('role', 'dialog');
    laag.setAttribute('aria-modal', 'true');
    laag.setAttribute('aria-label', 'Kennismaking met Werkplaats3b');

    // de rest van de pagina tijdelijk uit de toegankelijkheidsboom
    var kids = document.body.children;
    for (var i = 0; i < kids.length; i++) {
      var el = kids[i];
      if (el === laag || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') continue;
      ariaOud.push({ el: el, oud: el.getAttribute('aria-hidden') });
      el.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = 'hidden';

    var balken = document.createElement('div');
    balken.className = 'entree-balken';
    for (var b = 0; b < slides.length; b++) {
      var balk = document.createElement('div');
      balk.className = 'entree-balk';
      var vul = document.createElement('div');
      vul.className = 'entree-balk-vul';
      balk.appendChild(vul);
      balken.appendChild(balk);
      balkVullen.push(vul);
    }
    laag.appendChild(balken);

    sluitKnop = document.createElement('button');
    sluitKnop.className = 'entree-sluit';
    sluitKnop.type = 'button';
    sluitKnop.setAttribute('aria-label', 'Sluiten');
    sluitKnop.textContent = '✕';
    sluitKnop.addEventListener('click', sluit);
    laag.appendChild(sluitKnop);

    img = document.createElement('img');
    img.className = 'entree-beeld';
    img.draggable = false;
    img.onerror = function () {
      // beeld valt halverwege weg: die slide overslaan, de rest speelt door
      kapot[huidig] = true;
      naarVolgende();
    };
    laag.appendChild(img);

    // bediening: tikken/vegen/vasthouden op het beeld, sluiten daarbuiten.
    // Eén vinger heeft de regie (pId); extra vingers worden volledig genegeerd,
    // anders kaapt een tweede aanraking de hold-pauze of de veegmeting.
    var pDown = false, pId = null, pStartX = 0, holdTimer = null, holdActief = false, veeg = false;
    img.addEventListener('pointerdown', function (e) {
      if (dichtBezig || pDown) return;
      pDown = true; pId = e.pointerId; veeg = false; holdActief = false; pStartX = e.clientX;
      try { img.setPointerCapture(e.pointerId); } catch (err) {}
      if (holdTimer) clearTimeout(holdTimer);
      holdTimer = setTimeout(function () { holdActief = true; pauzeer(); }, HOLD_MS);
      e.preventDefault();
    });
    img.addEventListener('pointermove', function (e) {
      if (!pDown || e.pointerId !== pId) return;
      if (Math.abs(e.clientX - pStartX) > SWIPE_PX) {
        veeg = true;
        if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      }
    });
    img.addEventListener('pointerup', function (e) {
      if (!pDown || e.pointerId !== pId) return;
      pDown = false; pId = null;
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      var dx = e.clientX - pStartX;
      if (holdActief) {
        // vasthouden was pauze — loslaten hervat, en alleen een veeg telt nog
        holdActief = false;
        hervat();
        if (veeg) { if (dx < 0) naarVolgende(); else naarVorige(); }
        return;
      }
      if (veeg) { if (dx < 0) naarVolgende(); else naarVorige(); return; }
      var r = img.getBoundingClientRect();
      if (e.clientX < r.left + r.width / 2) naarVorige(); else naarVolgende();
    });
    img.addEventListener('pointercancel', function (e) {
      if (!pDown || e.pointerId !== pId) return;
      pDown = false; pId = null;
      if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
      if (holdActief) { holdActief = false; hervat(); }
    });

    laag.addEventListener('click', function (e) {
      if (e.target === laag) sluit();   // het vervaagde gebied naast het beeld
    });
    laag.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    document.addEventListener('keydown', opToets, true);
    focusOud = document.activeElement;
    sluitKnop.focus();

    toon(0);

    // overige beelden alvast binnenhalen terwijl slide 1 in beeld staat
    for (var v = 1; v < slides.length; v++) (function (idx) {
      var voor = new Image();
      voor.onerror = function () { kapot[idx] = true; };
      voor.src = slides[idx].src;
    })(v);
  }

  // ── start: DOM klaar én eerste beeld binnen, anders binnen 2 s opgeven
  var domKlaar = document.readyState !== 'loading';
  var eersteKlaar = false;
  var wacht = setTimeout(function () { geefOp(); }, EERSTE_BEELD_MS);

  function geefOp() {
    if (open || opgegeven) return;
    opgegeven = true;
    if (wacht) { clearTimeout(wacht); wacht = null; }
    // niet als gezien markeren: volgende bezoek krijgt een nieuwe kans
    haalWeg();
  }
  var wachtOpZicht = false;
  function probeerStart() {
    if (open || opgegeven) return;
    if (!(domKlaar && eersteKlaar)) return;
    if (wacht) { clearTimeout(wacht); wacht = null; }
    if (document.hidden) {
      // achtergrond-tab: niet onzichtbaar uitspelen en als gezien markeren,
      // maar klaarstaan tot de bezoeker de tab echt vooraan zet
      if (!wachtOpZicht) {
        wachtOpZicht = true;
        document.addEventListener('visibilitychange', function opZicht() {
          if (document.hidden) return;
          document.removeEventListener('visibilitychange', opZicht);
          if (!open && !opgegeven) bouw();
        });
      }
      return;
    }
    bouw();
  }

  if (!domKlaar) {
    document.addEventListener('DOMContentLoaded', function () { domKlaar = true; probeerStart(); });
  }
  var eerste = new Image();
  eerste.onload = function () { eersteKlaar = true; probeerStart(); };
  eerste.onerror = function () { geefOp(); };
  eerste.src = slides[0].src;
})();
