// ╔══════════════════════════════════════════════════════════════╗
// ║  WERKPLAATS3B — INSTAGRAM-FEED                                ║
// ║  Gevoed door bedrijfsvoering/marketing/scripts/               ║
// ║  instagram_publish.py — niet handmatig editen, entries komen  ║
// ║  per publicatie van dat script.                               ║
// ╚══════════════════════════════════════════════════════════════╝

const INSTAGRAM_FEED = [
  {
    "src": "photos/instagram/p19.webp",
    "alt": "Donkere post met de kop: Geen pingpong. Geen pitch. Wel afzuiging. Daaronder: perslucht door de hele hal, 24/7 toegang, een overheaddeur en een reachtruck voor als het te zwaar wordt.",
    "caption": "Geen pingpongtafel. Geen pitchavond. Wel afzuiging.\r\n\r\nWat je hier wel vindt: perslucht en afzuiging door de hele hal, 24/7 toegang met je eigen sleutel, een overheaddeur waar een bestelbus doorheen kan, en een reachtruck voor als het zwaar wordt.\r\n\r\nEn een keuken, want koffie is geen lifestyle, dat is gereedschap.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p18.webp",
    "alt": "Foto van een werkplaats met daaroverheen de kop: Het gaat pas de deur uit als het af is. Daaronder: overheaddeur op de begane grond, laadmogelijkheid binnen, reachtruck in de hal en een aanhanger voor vervoer naar locatie.",
    "caption": "Het gaat pas de deur uit als het af is.\r\n\r\nIedereen die weleens een kast van twee meter tachtig heeft gebouwd in een ruimte met een normale deur, weet waar dit over gaat.\r\n\r\nOverheaddeur op de begane grond, reachtruck in de hal, en een gesloten en een open aanhanger die je kunt gebruiken. Laden is hier geen project op zich.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p17.webp",
    "alt": "Donkere post met de kop 'Alles wat je nodig hebt, onder een dak' en een overzicht van het machinepark: F45 formaatzaag, vlak- en vandiktebank, lintzaag en rijgatenboormachine, plus metaalzaag, straalcabine, Shapertool met Benchpilot, 3D-printer, afzuiging, perslucht, reachtruck en handgereedschap.",
    "caption": "Alles wat je nodig hebt, onder één dak.\r\n\r\nF45 formaatzaag, vlak- en vandiktebank, lintzaag, rijgatenboormachine. Metaalzaag, straalcabine, Shapertool met Benchpilot, 3D-printer. Afzuiging en perslucht door de hele hal, en een reachtruck voor als het zwaar wordt.\r\n\r\nHet machinepark zit bij je werkplek in — je hoeft er niet zelf in te investeren.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p16.webp",
    "alt": "Foto van een werkplaats met machines, met daaroverheen de kop: Voor de rest wakker is. Daaronder: 24/7 toegang met je eigen sleutel.",
    "caption": "Voor de rest wakker is.\r\n\r\nSommige mensen werken het beste om half acht 's ochtends, anderen om elf uur 's avonds als de telefoon eindelijk stil is.\r\n\r\nJe hebt 24/7 toegang met je eigen sleutel en het pand heeft een alarmsysteem. Niemand die je binnenlaat, niemand die je eruit zet.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p15.webp",
    "alt": "Donkere post met de kop: Naast de A20. Vlak bij Delft, R'dam en Den Haag. Daaronder: twintig minuten rijden, je pakt een koffie en je kunt weer aan de slag met je project.",
    "caption": "Oud Camp 3b, Maasland. Naast de A20.\r\n\r\nVijftien tot twintig minuten naar Rotterdam, Delft en Den Haag. Ver genoeg uit de stad om ruimte te kunnen betalen, dichtbij genoeg om je klanten binnen het half uur te bereiken.\r\n\r\nParkeren voor de deur, overheaddeur voor het laden, en een aanhanger die je kunt gebruiken.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p14.webp",
    "alt": "Foto van een werkplaats met daaroverheen de kop: Groter dan je werkbank. Daaronder: past een project niet meer in je eigen unit, dan bouw je verder op de flexspace ervoor.",
    "caption": "Groter dan je werkbank.\r\n\r\nDe meeste werkplaatsen lopen niet vast op de machines maar op de vloer: zodra een kast groter wordt dan je werkbank, sta je jezelf in de weg.\r\n\r\nJe unit is 25 m², en past een project daar niet meer in, dan bouw je verder op de flexspace ervoor. Zonder overleg, zonder wachten tot iemand opruimt.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p13.webp",
    "alt": "Donkere post met de kop 'Wat je huurt, en wat je krijgt' en vier punten: eigen unit van 25 m2 met entresol en platenrek, werkbank met stroompunten, perslucht en verlichting, toegang tot de machinale, 24/7 toegang met alarmsysteem en internet. Onderaan: 945 euro per maand plus 120 euro servicekosten, exclusief btw.",
    "caption": "Wat je huurt, en wat erbij zit.\r\n\r\nEen unit van 25 m² met opslag op de entresol en een platenrek. Een eigen werkbank, stroompunten, perslucht en verlichting. Toegang tot de machinehal van 300 m². 24/7 binnen kunnen met je eigen sleutel, alarmsysteem en glasvezel.\r\n\r\n€ 945 per maand plus € 120 servicekosten, excl. btw. Energie, schoonmaak en afvalcontainers zitten in die servicekosten — geen naheffing in januari.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p12.webp",
    "alt": "Foto van een werkplaats met daaroverheen de kop: Van restaureren tot nieuwbouw. Daaronder: een tafel uit 1890 die een tweede kans verdient of een keuken die volgende week moet staan.",
    "caption": "Van restaureren tot nieuwbouw.\r\n\r\nEen tafel met losse poten die weer honderd jaar mee moet. Of een keuken die volgende week bij de klant staat. Verschillend werk, maar het vraagt dezelfde machines en dezelfde rust om het goed te doen.\r\n\r\nWerkplaats3b is er voor meubelmakers, restaurateurs, interieurbouwers en ontwerpers die zelf bouwen. Je eigen unit, de machinehal erbij.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p11.webp",
    "alt": "Donkere post met het getal 300 m2 groot in oranje en de tekst 'machinale staat op je te wachten'. Kop: Wel de machines, maar niet de investering. Daaronder: formaatzaag, vlak- en vandiktebank, lintzaag, rijgatenboormachine.",
    "caption": "300 m² machinale, en je investeert er niets in.\r\n\r\nEen F45 formaatzaag koop je niet even. Een vlak- en vandiktebank, een lintzaag, een rijgatenboormachine — bij elkaar is dat een investering waar je jaren op afschrijft.\r\n\r\nHier staan ze er al. Onderhouden, aangesloten op afzuiging en perslucht, en inbegrepen bij je werkplek.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p10.webp",
    "alt": "Donkere post met in grote letters: 850 m2 werkplaats. Een machinale. Daaronder: Oud Camp 3b, Maasland, naast de A20, 20 minuten van Rotterdam, Delft en Den Haag. Units van 25 m2, machinale inbegrepen.",
    "caption": "850 m². Acht partijen. Eén machinehal.\r\n\r\nWerkplaats3b staat aan Oud Camp 3b in Maasland, naast de A20. Vijftien tot twintig minuten van Rotterdam, Delft en Den Haag.\r\n\r\nJe huurt een eigen unit van 25 m² en deelt de machinehal met een handvol andere bedrijven. KvK-inschrijving en verzekering verplicht.\r\n\r\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p09.webp",
    "alt": "Donkere post met de kop 'Je rijdt naar binnen om te laden'. Vier punten: overheaddeur van 4 bij 5 meter op de begane grond, parkeren voor de deur, reachtruck aanwezig, gesloten en open aanhanger te gebruiken. Onderaan: Oud Camp 3b, Maasland, naast de A20.",
    "caption": "Hoe krijg jij een plaat van 3 meter naar binnen?\n\nMet z'n tweeën om een hoek, langs een deurpost, en dan nog een trap op. Bij de meeste werkplekken begint de dag met tillen.\n\nBij ons rijd je naar binnen: overheaddeur van 4 bij 5 meter, parkeren voor de deur, reachtruck in de hal en een gesloten en open aanhanger die je mag gebruiken.\n\n3 vrij per 21 september — kom eerst kijken. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-22"
  },
  {
    "src": "photos/instagram/p08.webp",
    "alt": "Donkere poster met de tekst: Ook wij begonnen in een garagebox. Wij bieden je de ruimte.",
    "caption": "Wij weten waar je vandaan komt. Ook wij begonnen klein. Maar als je groeit wil je meer ruimte en betere machines. Wij bieden allebei om de volgende stap mogelijk te maken.\n\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-20"
  },
  {
    "src": "photos/instagram/p07.webp",
    "alt": "Twee vakmensen aan een machine in een hoge werkplaatshal, met een rek vol hout op de achtergrond. Tekst: Uit je schuur gegroeid?",
    "caption": "Uit je schuur gegroeid?\n\nDat is het punt waarop bijna iedereen in dit vak een keer komt. Je past er niet meer in, maar een eigen bedrijfspand huren is nog te groot en te duur.\n\nWij bieden de stap ertussenin: een eigen unit van 25 m² met opslag op de entresol, een machinehal van 300 m² ernaast, en een handvol collega's die weten waar je het over hebt.\n\nEr zijn er nog 3 vrij. Vanaf 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-20"
  },
  {
    "src": "photos/instagram/p06.webp",
    "alt": "Donkere Instagram-post. In grote witte letters 'Hoe zaag jij nu je platen?', waarbij het woord 'platen' oranje is. Daaronder in kleinere letters: 'Met de invalcirkelzaag? In een te krappe ruimte tussen andermans troep.' Linksboven staat 'Stel jezelf de vraag', rechtsboven het logo WP3B.",
    "caption": "Word je die veel te volle werkplek zat?\n\nWij hebben de oplossing: een eigen unit van 25 m² met flexspace in een hal met 300 m² machinale, waar je gewoon je gang kunt gaan. Maasland, naast de A20.\n\nNog 3 units vrij per 21 september. werkplaats3b.nl\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-20"
  },
  {
    "src": "photos/instagram/p05.webp",
    "alt": "Twee makers aan het werk in de werkplaats, met de tekst Ruimte voor vakmensen",
    "caption": "Wordt dit jouw nieuwe werkplek?\n\nPer 21 september kun je terecht in Maasland: 850 m² werkruimte onder één dak, met 300 m² machinale, assemblageruimte en 24/7 toegang. Je huurt een eigen werkruimte van 25 m² met opslag op je entresol en platenrek — past je project er niet in, dan bouw je verder op de flexspace ervoor.\n\nDe inrichting is in volle gang. Nog 3 units vrij. Kijk op werkplaats3b.nl en plan een rondleiding.\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-18"
  },
  {
    "src": "photos/instagram/p04.webp",
    "alt": "Maker aan een formaatzaag in de werkplaats, met de tekst Ruimte voor ambitie",
    "caption": "Ruimte voor ambitie.\n\n850 m² werkplaats in Maasland. Je eigen unit met opslag, een gedeeld machinepark, werkbanken en bureaus — tussen makers die het vak serieus nemen.\n\nNog 3 units vrij.\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-15"
  },
  {
    "src": "photos/instagram/p03.webp",
    "alt": "Slide met de vraag Is dit jouw plek en vier profielen: meubelmaker, interieurbouwer, ontwerper, maker",
    "caption": "Is dit jouw plek?\n\nZelfstandig meubelmaker of restaurateur. Interieurbouwer met eigen projecten. Ontwerper die zelf prototypes bouwt. Of de maker die uit z'n schuur groeit.\n\nKvK-inschrijving en verzekering zijn verplicht: geen hobbyisten, geen particulieren. Dat is een bewuste keuze — je werkt hier tussen mensen die er hun brood mee verdienen.\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-15"
  },
  {
    "src": "photos/instagram/p02.webp",
    "alt": "Tarievenoverzicht Werkplaats3b: werkplek 945 euro, werkruimte vanaf 450 euro, opslag vanaf 75 euro per maand",
    "caption": "Geen verrassingen achteraf.\n\nWerkplek 1e verdieping: € 945 per maand. 25 m² met opslag, eigen werkbank en toegang tot het machinepark. Servicekosten € 120 — daar zitten energie, schoonmaak en afvalcontainers al in.\n\nEigen afsluitbare werkruimte vanaf € 450. Losse opslag vanaf € 75. Alles excl. btw.\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-15"
  },
  {
    "src": "photos/instagram/p01.webp",
    "alt": "Donkere slide met de tekst Plan een rondleiding en een oranje WhatsApp-knop",
    "caption": "Kom kijken, neem een koffie, zet de formaatzaag aan en zagen maar. Dan weet je genoeg.\n\nApp of mail ons — een rondleiding staat meestal binnen de week ingepland. Nog 3 units vrij.\n\n#werkplaats3b #meubelmaker #interieurbouw #vakmanschap #maasland #westland #zzp #houtbewerking #atelier #bedrijfsruimte",
    "datum": "2026-08-15"
  }
];
