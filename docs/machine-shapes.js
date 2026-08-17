// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS3B — MACHINE-SILHOUETTEN (BOVENAANZICHT)         ║
// ║  Eén bron voor de admin-editor én de publieke plattegrond.   ║
// ╚══════════════════════════════════════════════════════════════╝
//
// Elke vorm is getekend in een vierkant stelsel van 100×100, LIGGEND:
// de lange as van de machine loopt horizontaal. De <svg> krijgt
// preserveAspectRatio="none", dus de tekening rekt mee met de werkelijke
// afmeting van het object — een werkbank van 240×60 wordt vanzelf plat.
//
// Staat een object rechtop (dieper dan breed), dan draaien we de hele
// tekening een kwartslag binnen datzelfde stelsel. Dat gebeurt vóór het
// uitrekken, dus een staande lintzaag krijgt de lintzaag-tekening staand —
// niet een liggende tekening die tot onherkenbaarheid is uitgetrokken.
//
// GEEN OMSLUITEND KADER. Wat je ziet is de omtrek van de machine zelf:
// een formaatzaag steekt met zijn schuifslede voorbij het tafelblad, een
// werkbank heeft een bankschroef die uitsteekt, een kar heeft wielen naast
// de bak. Daarom loopt de ene vorm van rand tot rand en laat de andere
// ruimte over. Het object dat de vorm draagt tekent zelf ook geen rand meer.
//
// Klassen (opgemaakt in de stylesheet van de pagina):
//   b = machinelichaam, gevuld met een omtrek   f = massief detail
//   s = lijnwerk op de machine                  d = hulplijn, dun
// Lijndikte komt van vector-effect:non-scaling-stroke, zodat het uitrekken
// de lijnen niet meevervormt. Kleur volgt currentColor = kleur van het object.

(function (global) {

  var SHAPES = {

    // Schuiftafelzaag (Altendorf F45-type). Van bovenaf: een smalle
    // schuifslede die vóór en achter het tafelblad uit steekt, daarnaast het
    // gietijzeren blad, de zaagsnede ertussen, de dwarsaanslag haaks op de
    // slede en de parallelaanslag rechts van het blad.
    formaatzaag: {
      naam: 'Formaatzaag',
      svg: '<rect class="b" x="0" y="12" width="100" height="21"/>' +          // schuifslede
           '<rect class="b" x="29" y="33" width="65" height="53"/>' +          // gietijzeren tafel
           '<line class="s" x1="44" y1="37" x2="67" y2="37"/>' +               // zaagblad
           '<line class="d" x1="37" y1="37" x2="42" y2="37"/>' +               // voorritser
           '<rect class="f" x="15" y="3" width="6" height="44"/>' +            // dwarsaanslag
           '<rect class="f" x="29" y="58" width="65" height="4"/>' +           // parallelaanslag
           '<line class="d" x1="29" y1="82" x2="94" y2="82"/>'
    },

    // Twee tafels in lijn met het messenblok in de spleet ertussen, en de
    // langsgeleider over de volle lengte langs de achterzijde.
    vlakvandikte: {
      naam: 'Vlak- / vandiktebank',
      svg: '<rect class="b" x="0" y="26" width="46" height="60"/>' +           // invoertafel
           '<rect class="b" x="54" y="26" width="46" height="60"/>' +          // uitvoertafel
           '<rect class="f" x="45" y="28" width="10" height="56"/>' +          // messenblok
           '<rect class="f" x="0" y="19" width="100" height="5"/>'             // langsgeleider
    },

    // Vierkante tafel vóór, het wielhuis erachter, het zaagblad ertussen
    // door tot in de tafelsleuf.
    lintzaag: {
      naam: 'Lintzaag',
      svg: '<rect class="b" x="4" y="18" width="60" height="64"/>' +           // tafel
           '<rect class="b" x="64" y="5" width="32" height="90"/>' +           // wielhuis
           '<circle class="d" cx="80" cy="50" r="15"/>' +                      // wiel
           '<line class="s" x1="22" y1="50" x2="80" y2="50"/>' +               // zaagblad
           '<line class="d" x1="4" y1="50" x2="22" y2="50"/>'                  // tafelsleuf
    },

    // Doorvoermachine: paneel gaat er aan één kant in en komt er afgewerkt
    // uit. Aandrukrollen boven de baan, de stations eronder in volgorde —
    // lijm, afkorten, trimmen, schrapen, polijsten.
    kantenaanlijmer: {
      naam: 'Kantenaanlijmer',
      svg: '<rect class="b" x="0" y="30" width="100" height="44"/>' +          // machinebed
           '<line class="s" x1="0" y1="39" x2="100" y2="39"/>' +               // doorvoerbaan
           '<circle class="d" cx="12" cy="35" r="2.5"/><circle class="d" cx="30" cy="35" r="2.5"/>' +
           '<circle class="d" cx="48" cy="35" r="2.5"/><circle class="d" cx="66" cy="35" r="2.5"/>' +
           '<circle class="d" cx="84" cy="35" r="2.5"/>' +                     // aandrukrollen
           '<rect class="f" x="7" y="45" width="9" height="24"/>' +            // lijmstation
           '<rect class="f" x="24" y="45" width="7" height="24"/>' +
           '<rect class="f" x="40" y="45" width="7" height="24"/>' +
           '<rect class="f" x="56" y="45" width="7" height="24"/>' +
           '<rect class="f" x="72" y="45" width="7" height="24"/>'
    },

    // Verticale plaatzaag: staat plat tegen de muur, dus van bovenaf niet
    // meer dan een smalle balk met steunpunten en de zaagwagen ervoor.
    wandzaag: {
      naam: 'Wandzaag',
      svg: '<rect class="b" x="0" y="40" width="100" height="20"/>' +          // frame
           '<line class="s" x1="0" y1="43" x2="100" y2="43"/>' +               // muurzijde
           '<line class="d" x1="12" y1="43" x2="12" y2="60"/>' +
           '<line class="d" x1="30" y1="43" x2="30" y2="60"/>' +
           '<line class="d" x1="48" y1="43" x2="48" y2="60"/>' +
           '<line class="d" x1="66" y1="43" x2="66" y2="60"/>' +
           '<line class="d" x1="84" y1="43" x2="84" y2="60"/>' +               // steunpunten
           '<rect class="f" x="41" y="57" width="18" height="13"/>'            // zaagwagen
    },

    // Benchpilot-tafel met de Shaper Origin erop: werkgebied binnen het
    // frame, freesmotor in het midden.
    shapertool: {
      naam: 'Shapertool + Benchpilot',
      svg: '<rect class="b" x="4" y="16" width="92" height="68"/>' +           // tafel
           '<rect class="d" x="16" y="26" width="68" height="48"/>' +          // werkgebied
           '<circle class="s" cx="50" cy="50" r="11"/>' +                      // freesmotor
           '<circle class="f" cx="50" cy="50" r="3.5"/>'
    },

    metaalzaag: {
      naam: 'Afkort- / metaalzaag',
      svg: '<rect class="b" x="6" y="38" width="88" height="32"/>' +           // machinebed
           '<rect class="f" x="6" y="41" width="88" height="4"/>' +            // aanslag
           '<line class="s" x1="50" y1="38" x2="50" y2="70"/>' +               // zaagblad
           '<rect class="b" x="41" y="62" width="18" height="22"/>' +          // zaagkop
           '<path class="d" d="M28 70 A24 24 0 0 0 72 70"/>'                   // zwenkbereik
    },

    straalcabine: {
      naam: 'Straal- / spuitcabine',
      svg: '<rect class="b" x="2" y="6" width="90" height="88"/>' +            // cabine
           '<line class="s" x1="32" y1="6" x2="32" y2="94"/>' +                // deurnaad
           '<circle class="d" cx="58" cy="34" r="9"/>' +                       // handschoenpoorten
           '<circle class="d" cx="58" cy="66" r="9"/>' +
           '<rect class="f" x="92" y="38" width="8" height="24"/>'             // afzuigaansluiting
    },

    printer3d: {
      naam: '3D-printer',
      svg: '<rect class="b" x="12" y="12" width="76" height="76"/>' +          // frame
           '<rect class="f" x="26" y="26" width="48" height="48"/>' +          // printbed
           '<line class="d" x1="12" y1="50" x2="88" y2="50"/>' +               // portaal
           '<circle class="s" cx="50" cy="50" r="5"/>'                         // nozzle
    },

    // De naam zegt het al: een rij boorspillen boven een lange werktafel.
    rijgatenboor: {
      naam: 'Rijgatenboormachine',
      svg: '<rect class="b" x="0" y="28" width="100" height="20"/>' +          // boorbalk
           '<circle class="f" cx="8" cy="38" r="2.4"/><circle class="f" cx="18" cy="38" r="2.4"/>' +
           '<circle class="f" cx="28" cy="38" r="2.4"/><circle class="f" cx="38" cy="38" r="2.4"/>' +
           '<circle class="f" cx="48" cy="38" r="2.4"/><circle class="f" cx="58" cy="38" r="2.4"/>' +
           '<circle class="f" cx="68" cy="38" r="2.4"/><circle class="f" cx="78" cy="38" r="2.4"/>' +
           '<circle class="f" cx="88" cy="38" r="2.4"/>' +                     // boorspillen
           '<rect class="b" x="0" y="48" width="100" height="28"/>'            // werktafel
    },

    kolomboor: {
      naam: 'Kolomboormachine',
      svg: '<rect class="b" x="22" y="24" width="50" height="52"/>' +          // boortafel
           '<circle class="b" cx="82" cy="50" r="16"/>' +                      // kolomvoet
           '<circle class="f" cx="82" cy="50" r="6"/>' +                       // kolom
           '<circle class="s" cx="46" cy="50" r="7"/>' +                       // spil
           '<line class="d" x1="46" y1="24" x2="46" y2="76"/>'
    },

    // Stationaire frees (toupie): gietijzeren tafel met de spil links van het
    // midden, een tweedelige aanslag die dwars over de tafel loopt met een
    // opening rond de freeskop, en een schuiftafel langs de voorkant waarop
    // het werkstuk langs de kop gaat.
    freesmachine: {
      naam: 'Stationaire frees (toupie)',
      svg: '<rect class="b" x="10" y="12" width="78" height="62"/>' +          // gietijzeren tafel
           '<rect class="b" x="4" y="76" width="92" height="12"/>' +           // schuiftafel
           '<rect class="f" x="10" y="38" width="26" height="7"/>' +           // aanslag links
           '<rect class="f" x="58" y="38" width="30" height="7"/>' +           // aanslag rechts
           '<circle class="s" cx="47" cy="45" r="11"/>' +                      // freeskop
           '<circle class="f" cx="47" cy="45" r="3.5"/>' +                     // spil
           '<line class="d" x1="10" y1="60" x2="88" y2="60"/>' +               // tafelgleuf
           '<line class="d" x1="20" y1="76" x2="20" y2="88"/>' +
           '<line class="d" x1="76" y1="76" x2="76" y2="88"/>'                 // slede-eindaanslagen
    },

    bandschuur: {
      naam: 'Schuurmachine',
      svg: '<rect class="b" x="4" y="18" width="92" height="64"/>' +
           '<rect class="f" x="12" y="26" width="76" height="11"/>' +          // schuurband
           '<rect class="d" x="12" y="46" width="76" height="28"/>'            // werktafel
    },

    // Cycloon met de filterzakken ernaast, verbonden door de afvoerbuis.
    afzuiging: {
      naam: 'Afzuiginstallatie',
      svg: '<circle class="b" cx="28" cy="50" r="24"/>' +                      // cycloon
           '<circle class="d" cx="28" cy="50" r="13"/>' +
           '<circle class="b" cx="72" cy="30" r="15"/>' +                      // filterzakken
           '<circle class="b" cx="72" cy="72" r="15"/>' +
           '<rect class="f" x="50" y="47" width="14" height="6"/>'             // afvoerbuis
    },

    compressor: {
      naam: 'Compressor',
      svg: '<rect class="b" x="2" y="34" width="74" height="38" rx="19"/>' +   // ketel
           '<rect class="b" x="54" y="18" width="34" height="30"/>' +          // motorblok
           '<circle class="d" cx="20" cy="53" r="8"/>' +
           '<rect class="f" x="88" y="28" width="10" height="10"/>'            // aansluiting
    },

    // Blad met de bankschroef die aan de voorkant uitsteekt — dat hoekje is
    // waaraan je een werkbank van bovenaf herkent.
    werkbank: {
      naam: 'Werkbank',
      svg: '<rect class="b" x="0" y="14" width="100" height="72"/>' +          // blad
           '<line class="d" x1="0" y1="38" x2="100" y2="38"/>' +               // plankdelen
           '<line class="d" x1="0" y1="62" x2="100" y2="62"/>' +
           '<rect class="f" x="6" y="86" width="22" height="11"/>'             // bankschroef
    },

    // Bureau en stoel als één werkplek: het blad met beeldscherm, en de
    // stoel ervoor.
    bureau: {
      naam: 'Bureau met stoel',
      svg: '<rect class="b" x="2" y="6" width="96" height="52"/>' +            // bureaublad
           '<rect class="f" x="36" y="9" width="28" height="7"/>' +            // beeldscherm
           '<circle class="b" cx="50" cy="78" r="17"/>' +                      // zitting
           '<path class="f" d="M33 84 A17 17 0 0 0 67 84 L60 84 A10 10 0 0 1 40 84 Z"/>' + // rugleuning
           '<line class="d" x1="50" y1="78" x2="50" y2="97"/>' +
           '<line class="d" x1="50" y1="78" x2="35" y2="66"/>' +
           '<line class="d" x1="50" y1="78" x2="65" y2="66"/>'                 // stoelpoten
    },

    // Tafel met 6 stoelen: het blad in het midden, drie stoelen aan elke
    // lange zijde.
    vergadertafel: {
      naam: 'Tafel met 6 stoelen',
      svg: '<rect class="b" x="18" y="26" width="64" height="48"/>' +          // tafelblad
           '<circle class="b" cx="29" cy="13" r="9"/>' +                       // stoel
           '<circle class="b" cx="50" cy="13" r="9"/>' +
           '<circle class="b" cx="71" cy="13" r="9"/>' +
           '<circle class="b" cx="29" cy="87" r="9"/>' +
           '<circle class="b" cx="50" cy="87" r="9"/>' +
           '<circle class="b" cx="71" cy="87" r="9"/>'                         // zes stoelen
    },

    // Tafelvoetbal: het blad met de middenlijn, vier dwarsstaven en de
    // ronde doelopeningen aan de korte zijden.
    tafelvoetbal: {
      naam: 'Tafelvoetbal',
      svg: '<rect class="b" x="2" y="16" width="96" height="68"/>' +           // tafelblad
           '<line class="d" x1="50" y1="16" x2="50" y2="84"/>' +               // middenlijn
           '<line class="s" x1="14" y1="20" x2="14" y2="80"/>' +               // staaf
           '<line class="s" x1="30" y1="20" x2="30" y2="80"/>' +
           '<line class="s" x1="70" y1="20" x2="70" y2="80"/>' +
           '<line class="s" x1="86" y1="20" x2="86" y2="80"/>' +               // staven
           '<path class="d" d="M2 38 A14 14 0 0 1 2 62"/>' +                   // doel links
           '<path class="d" d="M98 38 A14 14 0 0 0 98 62"/>'                   // doel rechts
    },

    // Staanderrij met draagarmen die aan weerszijden uitsteken — vandaar de
    // kamvorm.
    draagarmstelling: {
      naam: 'Draagarmstelling',
      svg: '<rect class="f" x="0" y="45" width="100" height="10"/>' +          // staanderrij
           '<rect class="b" x="10" y="10" width="5" height="80"/>' +
           '<rect class="b" x="31" y="10" width="5" height="80"/>' +
           '<rect class="b" x="52" y="10" width="5" height="80"/>' +
           '<rect class="b" x="73" y="10" width="5" height="80"/>' +
           '<rect class="b" x="92" y="10" width="5" height="80"/>'             // draagarmen
    },

    palletstelling: {
      naam: 'Palletstelling',
      svg: '<rect class="b" x="0" y="16" width="100" height="24"/>' +          // liggerrij
           '<rect class="b" x="0" y="60" width="100" height="24"/>' +
           '<rect class="f" x="8" y="16" width="5" height="68"/>' +            // staanders
           '<rect class="f" x="47" y="16" width="5" height="68"/>' +
           '<rect class="f" x="87" y="16" width="5" height="68"/>'
    },

    stelling: {
      naam: 'Stelling / opslagkast',
      svg: '<rect class="b" x="0" y="16" width="100" height="68"/>' +
           '<line class="d" x1="0" y1="39" x2="100" y2="39"/>' +
           '<line class="d" x1="0" y1="61" x2="100" y2="61"/>'
    },

    kar: {
      naam: 'Kar / platenkar',
      svg: '<rect class="b" x="6" y="20" width="88" height="60"/>' +           // bak
           '<rect class="f" x="14" y="12" width="13" height="8"/>' +           // wielen
           '<rect class="f" x="73" y="12" width="13" height="8"/>' +
           '<rect class="f" x="14" y="80" width="13" height="8"/>' +
           '<rect class="f" x="73" y="80" width="13" height="8"/>'
    },

    // Palletwagen (pompwagen): handbediend, dus geen tegenwicht-cabine —
    // alleen de twee dunne vorktanden met een lastwiel aan de neus, en aan
    // het andere eind het pomphuis met de dissel om te sturen en te pompen.
    palletwagen: {
      naam: 'Palletwagen (pompwagen)',
      svg: '<rect class="f" x="2" y="26" width="72" height="8"/>' +            // vorktand links
           '<rect class="f" x="2" y="66" width="72" height="8"/>' +            // vorktand rechts
           '<circle class="d" cx="10" cy="30" r="3"/>' +                       // lastwiel links
           '<circle class="d" cx="10" cy="70" r="3"/>' +                       // lastwiel rechts
           '<rect class="b" x="74" y="34" width="16" height="32"/>' +          // pomphuis
           '<line class="s" x1="90" y1="50" x2="99" y2="50"/>'                 // dissel
    },

    pallettruck: {
      naam: 'Pallettruck / heftruck',
      svg: '<rect class="b" x="72" y="28" width="26" height="44"/>' +          // body
           '<rect class="b" x="2" y="24" width="70" height="13"/>' +           // vorken
           '<rect class="b" x="2" y="63" width="70" height="13"/>'
    },

    // Reachtruck: compacte cabine/tegenwicht achter, twee smalle sluitbalken
    // met een wiel aan de neus die onder de pallet door lopen, en de
    // uitschuifbare reachvork ertussen. De mastlijn staat vóór de cabine,
    // waar de vork bij het heffen doorheen schuift.
    reachtruck: {
      naam: 'Reachtruck',
      svg: '<rect class="b" x="74" y="18" width="24" height="64"/>' +          // cabine/tegenwicht
           '<rect class="b" x="6" y="24" width="70" height="11"/>' +           // sluitbalk links
           '<rect class="b" x="6" y="65" width="70" height="11"/>' +           // sluitbalk rechts
           '<circle class="f" cx="14" cy="29" r="5"/>' +                       // wiel links
           '<circle class="f" cx="14" cy="70" r="5"/>' +                       // wiel rechts
           '<rect class="f" x="2" y="42" width="72" height="16"/>' +           // reachvork
           '<line class="s" x1="70" y1="14" x2="70" y2="86"/>'                 // mast
    },

    trap: {
      naam: 'Trap',
      svg: '<line class="s" x1="0" y1="12" x2="100" y2="12"/>' +               // zijbomen
           '<line class="s" x1="0" y1="88" x2="100" y2="88"/>' +
           '<line class="d" x1="14" y1="12" x2="14" y2="88"/>' +
           '<line class="d" x1="28" y1="12" x2="28" y2="88"/>' +
           '<line class="d" x1="42" y1="12" x2="42" y2="88"/>' +
           '<line class="d" x1="56" y1="12" x2="56" y2="88"/>' +
           '<line class="d" x1="70" y1="12" x2="70" y2="88"/>' +
           '<line class="d" x1="84" y1="12" x2="84" y2="88"/>' +               // treden
           '<path class="s" d="M12 50 L82 50 M72 43 L82 50 L72 57"/>'          // looprichting
    },

    zaagtafel: {
      naam: 'Zaagtafel (algemeen)',
      svg: '<rect class="b" x="6" y="14" width="88" height="72"/>' +
           '<line class="s" x1="34" y1="50" x2="66" y2="50"/>' +               // zaagsleuf
           '<rect class="f" x="6" y="28" width="88" height="4"/>'              // aanslag
    },

    // ── Generieke terugval per type ──
    machine: {
      naam: 'Machine (algemeen)',
      svg: '<rect class="b" x="4" y="14" width="92" height="72"/>' +
           '<circle class="d" cx="50" cy="50" r="16"/>' +
           '<line class="d" x1="4" y1="28" x2="96" y2="28"/>'
    },
    werkplek: {
      naam: 'Werkplek (algemeen)',
      svg: '<rect class="b" x="2" y="14" width="96" height="72"/>' +
           '<line class="d" x1="2" y1="38" x2="98" y2="38"/>'
    },
    infra: {
      naam: 'Infra (algemeen)',
      svg: '<rect class="d" x="4" y="14" width="92" height="72"/>' +
           '<line class="d" x1="4" y1="14" x2="96" y2="86"/>' +
           '<line class="d" x1="96" y1="14" x2="4" y2="86"/>'
    }
  };

  // ── Naamherkenning ─────────────────────────────────────────────
  // Volgorde telt: het specifieke patroon moet vóór het algemene staan,
  // anders vangt /zaag/ de formaatzaag weg. Eerste treffer wint.
  var REGELS = [
    [/wandzaag|plaatzaag|muurzaag/, 'wandzaag'],
    [/formaatzaag|paneelzaag|schuiftafel/, 'formaatzaag'],
    [/kantenaanlijmer|kantenlijm|aanlijmer/, 'kantenaanlijmer'],
    [/shaper|benchpilot/, 'shapertool'],
    [/vlakvandikte|vlak.?en.?vandikte|vandikte|vlakbank|dikteschaaf/, 'vlakvandikte'],
    [/lintzaag|bandzaag/, 'lintzaag'],
    [/rijgaten|gatenboor/, 'rijgatenboor'],
    [/kolomboor|boormachine|boorstand/, 'kolomboor'],
    [/metaalzaag|afkortzaag|afkorter|verstekzaag/, 'metaalzaag'],
    [/straalcabine|spuitcabine|spuitruimte|straalruimte/, 'straalcabine'],
    [/3dprinter|3d.?printer|printer/, 'printer3d'],
    [/stationair|tafelfrees|freesmachine|frees|toupie|spindel/, 'freesmachine'],
    [/schuur|bandschuur|kantenschuur/, 'bandschuur'],
    [/afzuig|stofafzuig|cycloon/, 'afzuiging'],
    [/compressor|perslucht/, 'compressor'],
    [/werkbank|montagetafel|assemblagetafel/, 'werkbank'],
    [/bureau/, 'bureau'],
    [/vergadertafel|lunchtafel|eettafel|tafel.*stoel/, 'vergadertafel'],
    [/tafelvoetbal|voetbaltafel|foosball/, 'tafelvoetbal'],
    [/draagarm/, 'draagarmstelling'],
    [/palletstelling|legbordstelling/, 'palletstelling'],
    [/handpallettruck|palletwagen|pompwagen|steekwagen/, 'palletwagen'],
    [/reachtruck|smalgangtruck/, 'reachtruck'],
    [/platenkar|kar|wagen|trolley/, 'kar'],
    [/pallettruck|heftruck|stapelaar/, 'pallettruck'],
    [/stelling|rek|kast|opslag|magazijn/, 'stelling'],
    [/trap/, 'trap'],
    [/zaag|zaagtafel|cirkelzaag/, 'zaagtafel']
  ];

  function normaliseer(tekst) {
    return String(tekst || '')
      .toLowerCase()
      .replace(/[àáâäã]/g, 'a').replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i').replace(/[òóôöõ]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[^a-z0-9]/g, '');
  }

  // Welke vorm hoort bij dit object?
  //   expliciet = de keuze uit het eigenschappenpaneel:
  //     ''      → zelf uitzoeken op naam (standaard)
  //     'geen'  → bewust geen tekening
  //     <sleutel> → die vorm, wat de naam ook zegt
  // Levert '' als er niets past; dan blijft het object een leeg vlak,
  // precies zoals vóór deze functie bestond.
  function sleutelVoor(label, type, expliciet) {
    if (expliciet === 'geen') return '';
    if (expliciet && SHAPES[expliciet]) return expliciet;
    var n = normaliseer(label);
    for (var i = 0; i < REGELS.length; i++) {
      if (REGELS[i][0].test(n)) return REGELS[i][1];
    }
    if (type && SHAPES[type]) return type;      // machine / werkplek / infra
    if (type === 'opslag') return 'stelling';
    return '';
  }

  // De <svg> als tekst. De tweede parameter is de hoek in graden (0, 90, 180
  // of 270). `true`/`false` mag ook nog: dat betekende "rechtop" en komt
  // overeen met 90 graden.
  //
  // De draaiing zit op de <g> BINNEN de viewBox, dus vóór het uitrekken naar
  // de maat van het object. Een machine die rechtop staat krijgt daardoor een
  // tekening met de juiste verhoudingen, niet een uitgerekt liggend plaatje.
  function svgVoor(sleutel, hoek) {
    var vorm = SHAPES[sleutel];
    if (!vorm) return '';
    var g = normaliseerHoek(hoek);
    var draai = g ? ' transform="rotate(' + (-g) + ' 50 50)"' : '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ' +
           'preserveAspectRatio="none" focusable="false" aria-hidden="true">' +
           '<g' + draai + '>' + vorm.svg + '</g></svg>';
  }

  // Hetzelfde, maar als DOM-element. De tekeningen zijn vaste tekst uit de
  // tabel hierboven en er komt geen ingevoerde waarde in voor, maar de rest
  // van de site bouwt zijn DOM ook zonder innerHTML — dat houden we hier vol,
  // dan kan het later niet alsnog een injectiepad worden.
  function elementVoor(sleutel, hoek) {
    var tekst = svgVoor(sleutel, hoek);
    if (!tekst) return null;
    var doc = new DOMParser().parseFromString(tekst, 'image/svg+xml');
    var svg = doc.documentElement;
    if (!svg || svg.nodeName === 'parsererror' || svg.getElementsByTagName('parsererror').length) return null;
    return document.importNode(svg, true);
  }

  // Alles wat binnenkomt terugbrengen tot 0, 90, 180 of 270.
  function normaliseerHoek(hoek) {
    if (hoek === true) return 90;
    if (!hoek) return 0;
    var g = parseFloat(hoek);
    if (!isFinite(g)) return 0;
    g = Math.round(g / 90) * 90;
    return ((g % 360) + 360) % 360;
  }

  // Staat het object rechtop? De marge van 15% houdt bijna-vierkante
  // dingen (straalcabine, 3D-printer) met rust: die hebben geen lange as,
  // en meedraaien op een verschil van een paar centimeter oogt willekeurig.
  function isStaand(breedte, hoogte) {
    return hoogte > breedte * 1.15;
  }

  // De hoek waaronder de tekening moet staan.
  //
  // Objecten van vóór de vier-standen-knop hebben rot 0 staan terwijl ze wel
  // rechtop in de plattegrond liggen: die kregen hun stand door breedte en
  // hoogte om te wisselen, niet door rot te verhogen. Zulke objecten hoort de
  // tekening alsnog een kwartslag te krijgen. Bij rot 90 of 270 is de doos per
  // definitie al meegedraaid, dus daar telt de vorm van de doos niet mee.
  function tekenHoek(breedte, hoogte, rot) {
    var g = normaliseerHoek(rot);
    if ((g === 0 || g === 180) && isStaand(breedte, hoogte)) g = (g + 90) % 360;
    return g;
  }

  // Ligt de naam op zijn kant? Bij 180 graden niet: een label ondersteboven
  // lezen is erger dan een label dat niet met de machine meedraait.
  function labelStaat(hoek) {
    var g = normaliseerHoek(hoek);
    return g === 90 || g === 270;
  }

  // Voor de keuzelijst in het eigenschappenpaneel.
  function lijst() {
    return Object.keys(SHAPES).map(function (k) {
      return { key: k, naam: SHAPES[k].naam };
    });
  }

  global.MACHINE_SHAPES = {
    sleutelVoor: sleutelVoor,
    svgVoor: svgVoor,
    elementVoor: elementVoor,
    isStaand: isStaand,
    normaliseerHoek: normaliseerHoek,
    tekenHoek: tekenHoek,
    labelStaat: labelStaat,
    lijst: lijst,
    vormen: SHAPES
  };

})(this);
