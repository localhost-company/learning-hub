export type ProductCondition = 'new' | 'used' | 'questionable' | 'legendary';

export type ProductAvailability =
  'in_stock' | 'low_stock' | 'out_of_stock' | 'somewhere_in_warehouse';

export interface Product {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  machineType: string[];
  price: number;
  originalPrice?: number;
  currency: 'EUR';
  condition: ProductCondition;
  availability: ProductAvailability;
  stock: number;
  weightKg: number;
  oemNumber: string;
  description: string;
  compatibility: string;
  shipping: string;
  warranty: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  tags: string[];
}

export const products: Record<string, Product> = {
  a7k2f9: {
    id: 'a7k2f9',
    name: 'Hydraulická hadica XL – už skoro netečie',
    category: 'Hydraulika',
    manufacturer: 'HydroMax',
    machineType: ['Bager', 'Nakladač'],
    price: 89.9,
    originalPrice: 119.9,
    currency: 'EUR',
    condition: 'used',
    availability: 'in_stock',
    stock: 7,
    weightKg: 4.2,
    oemNumber: 'HYD-NEKVAP-420',
    description:
      'Prémiová hydraulická hadica s výrazne zníženým únikom oleja. Mastná už z výroby, takže vieš, že je kvalitná.',
    compatibility: 'CAT, Volvo, Komatsu a väčšina strojov, keď máš správnu redukciu.',
    shipping: 'Kuriér donesie. Olej na krabici je súčasť balenia.',
    warranty: 'Do prvého prudkého pohybu ramena.',
    rating: 4.7,
    reviewCount: 83,
    featured: true,
    tags: ['hydraulika', 'hadica', 'mierne mastné'],
  },

  b3m8q1: {
    id: 'b3m8q1',
    name: 'Univerzálne turbo na fúrik',
    category: 'Motor',
    manufacturer: 'TurboFúrik Racing',
    machineType: ['Fúrik', 'Čokoľvek'],
    price: 249.0,
    currency: 'EUR',
    condition: 'new',
    availability: 'low_stock',
    stock: 2,
    weightKg: 8.5,
    oemNumber: 'TURBO-FURIK-STAGE2',
    description: 'Keď potrebuješ odviezť dve vrecia cementu, ale potrebuješ ich odviezť športovo.',
    compatibility: 'Kompatibilné so všetkými fúrikmi s dostatočne motivovaným majiteľom.',
    shipping: 'Expresná doprava. Turbo príde skôr než fúrik.',
    warranty: '2 roky alebo 3 preteky po stavbe.',
    rating: 4.9,
    reviewCount: 14,
    featured: true,
    tags: ['turbo', 'fúrik', 'performance'],
  },

  c9x4p2: {
    id: 'c9x4p2',
    name: 'Ľavý smerovník na bager bez smerovníkov',
    category: 'Elektrika',
    manufacturer: 'BlinkerPro',
    machineType: ['Bager'],
    price: 34.5,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 41,
    weightKg: 0.4,
    oemNumber: 'BLINK-L-WHY',
    description:
      'Originálny ľavý smerovník pre prípady, keď chceš kolegom na stavbe konečne oznámiť svoje úmysly.',
    compatibility: 'Pasuje na stroje, ktoré ho nepotrebujú. Na ostatné pravdepodobne tiež.',
    shipping: 'Balík veľkosti topánky. Paletová doprava za príplatok.',
    warranty: 'Kým prvýkrát nezablikáš doľava a zabočíš doprava.',
    rating: 4.2,
    reviewCount: 38,
    featured: false,
    tags: ['elektrika', 'svetlo', 'zbytočné'],
  },

  d2r7v5: {
    id: 'd2r7v5',
    name: 'Vzduchový filter Premium Air Collector',
    category: 'Filtre',
    manufacturer: 'AirBoss',
    machineType: ['Bager', 'Nakladač', 'Buldozér'],
    price: 74.99,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 122,
    weightKg: 1.8,
    oemNumber: 'AIR-DIRT-NOPE',
    description: 'Zachytáva prach, piesok, lístie a väčšinu názorov stavbyvedúceho.',
    compatibility: 'Ak má stroj motor a motor má rád vzduch, sme na dobrej ceste.',
    shipping: 'Doručené v krabici obsahujúcej približne 78 % vzduchu.',
    warranty: '12 mesiacov alebo do kompletnej zmeny farby na hnedú.',
    rating: 4.8,
    reviewCount: 311,
    featured: true,
    tags: ['filter', 'vzduch', 'čistota'],
  },

  e5t1n8: {
    id: 'e5t1n8',
    name: 'Prémiový hydraulický olej – extra klzký',
    category: 'Kvapaliny',
    manufacturer: 'Slippy Industrial',
    machineType: ['Bager', 'Nakladač', 'Žeriav'],
    price: 109.0,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 55,
    weightKg: 20,
    oemNumber: 'OIL-VERY-SLIPPY',
    description:
      'Hydraulický olej určený na mazanie drahých komponentov a lacných pracovných nohavíc.',
    compatibility: 'Vhodné do väčšiny hydraulických systémov. Nevhodné do kávy.',
    shipping: 'Nádoba pravdepodobne dorazí celá.',
    warranty: 'Ak ho naleješ na zem, reklamácia sa neuznáva.',
    rating: 4.6,
    reviewCount: 97,
    featured: false,
    tags: ['olej', 'hydraulika', 'klzké'],
  },

  f8z3k6: {
    id: 'f8z3k6',
    name: 'Bagerové spätné zrkadlo – vidíš problém za sebou',
    category: 'Kabína',
    manufacturer: 'LookBack',
    machineType: ['Bager', 'Nakladač'],
    price: 48.0,
    currency: 'EUR',
    condition: 'new',
    availability: 'low_stock',
    stock: 4,
    weightKg: 1.2,
    oemNumber: 'MIRROR-OHNO',
    description: 'Extra široké zrkadlo, aby si presne videl, čo si pred piatimi sekundami prešiel.',
    compatibility: 'Univerzálny držiak. Pri dostatočnom počte sťahovacích pások úplne univerzálny.',
    shipping: 'Označené ako krehké. Kuriér to bude brať ako výzvu.',
    warranty: 'Platí, pokiaľ v odraze neuvidíš valec.',
    rating: 4.4,
    reviewCount: 63,
    featured: false,
    tags: ['kabína', 'zrkadlo', 'bezpečnosť'],
  },

  g4w9s1: {
    id: 'g4w9s1',
    name: 'Sada skrutiek „Jedna vždy ostane“',
    category: 'Spojovací materiál',
    manufacturer: 'Bolt & Pray',
    machineType: ['Všetky'],
    price: 22.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 999,
    weightKg: 2.3,
    oemNumber: 'BOLT-128-PLUS1',
    description:
      '128 kusov skrutiek rôznych rozmerov. Po montáži garantovane zostane minimálne jedna.',
    compatibility:
      'So všetkým, čo má dieru. Technické oddelenie odmieta túto vetu ďalej komentovať.',
    shipping: 'Krabica pri preprave príjemne hrká.',
    warranty: 'Na skrutku, ktorú nepoužiješ, doživotná.',
    rating: 5.0,
    reviewCount: 502,
    featured: true,
    tags: ['skrutky', 'servis', 'jedna-navyše'],
  },

  h1q6j3: {
    id: 'h1q6j3',
    name: 'Oceľový pás na bager – ľavý, asi',
    category: 'Podvozok',
    manufacturer: 'TrackMaybe',
    machineType: ['Pásový bager'],
    price: 1890,
    currency: 'EUR',
    condition: 'questionable',
    availability: 'somewhere_in_warehouse',
    stock: 1,
    weightKg: 640,
    oemNumber: 'TRACK-L-MAYBE',
    description: 'Masívny oceľový pás. Kolega tvrdí, že je ľavý. My mu celkom veríme.',
    compatibility: 'Kompatibilita sa overuje priložením pásu k stroju a zamysleným pohľadom.',
    shipping: 'Kuriér nie. Príde kamión a nervózny vodič.',
    warranty: 'Pokiaľ ho dokážeš vrátiť na pobočku.',
    rating: 3.9,
    reviewCount: 11,
    featured: true,
    tags: ['pás', 'podvozok', 'ťažké'],
  },

  j7c2y9: {
    id: 'j7c2y9',
    name: 'Sedačka operátora Deluxe Spine Saver',
    category: 'Kabína',
    manufacturer: 'BackPain Industries',
    machineType: ['Bager', 'Nakladač', 'Traktor'],
    price: 579,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 13,
    weightKg: 31,
    oemNumber: 'SEAT-NO-PAIN',
    description:
      'Odpružená sedačka s technológiou, ktorá dokáže zmeniť jamu na ceste z katastrofy na iba nepríjemnú udalosť.',
    compatibility: 'Pasuje do väčšiny kabín. Do Fiat Punto neodporúčame.',
    shipping: 'Doručenie na palete. Môžeš na nej rovno sedieť.',
    warranty: '24 mesiacov na sedačku, 0 mesiacov na chrbticu.',
    rating: 4.9,
    reviewCount: 188,
    featured: true,
    tags: ['sedačka', 'komfort', 'chrbtica'],
  },

  k3p8d4: {
    id: 'k3p8d4',
    name: 'Klaksón 145 dB „Uhni“',
    category: 'Elektrika',
    manufacturer: 'MOVE.',
    machineType: ['Bager', 'Nakladač', 'Žeriav', 'Čokoľvek s batériou'],
    price: 129.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 18,
    weightKg: 3.8,
    oemNumber: 'HONK-145-RUN',
    description: 'Klaksón navrhnutý pre situácie, keď očný kontakt a slušnosť definitívne zlyhali.',
    compatibility: '12 V, 24 V a pravdepodobne aj lokomotíva.',
    shipping: 'Doručujeme deaktivované. Našťastie.',
    warranty: 'Nevzťahuje sa na susedské vzťahy.',
    rating: 4.8,
    reviewCount: 274,
    featured: true,
    tags: ['klaksón', 'hluk', 'uhni'],
  },

  m6v1a7: {
    id: 'm6v1a7',
    name: 'Diagnostický kábel USB → Bager',
    category: 'Diagnostika',
    manufacturer: 'PlugMaybe',
    machineType: ['Bager', 'Nakladač'],
    price: 69,
    currency: 'EUR',
    condition: 'new',
    availability: 'low_stock',
    stock: 3,
    weightKg: 0.2,
    oemNumber: 'USB-TO-EXCAVATOR',
    description:
      'Prepoj svoj notebook so strojom a zisti, prečo svieti kontrolka, ktorú všetci ignorujú od roku 2019.',
    compatibility: 'Windows 10, Windows 11 a jeden starý ThinkPad zo servisu.',
    shipping: 'V antistatickom sáčku pre profesionálnejší pocit.',
    warranty: 'Na kábel áno. Na to, čo s ním spravíš, nie.',
    rating: 4.1,
    reviewCount: 44,
    featured: false,
    tags: ['diagnostika', 'usb', 'kontrolka'],
  },

  n9e5r2: {
    id: 'n9e5r2',
    name: 'Univerzálny držiak na kávu Heavy Duty',
    category: 'Kabína',
    manufacturer: 'CoffeeCAT',
    machineType: ['Bager', 'Žeriav', 'Nakladač', 'Buldozér'],
    price: 39.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 76,
    weightKg: 1.4,
    oemNumber: 'CUP-HOLDER-HD',
    description: 'Oceľový držiak na kávu dimenzovaný na vibrácie, nárazy a pondelkové rána.',
    compatibility:
      'Espresso, cappuccino, plechovka energetického nápoja a termoska veľkosti hasiaceho prístroja.',
    shipping: 'Bez kávy.',
    warranty: 'Nápoj nie je krytý zárukou.',
    rating: 4.9,
    reviewCount: 821,
    featured: true,
    tags: ['káva', 'kabína', 'essential'],
  },

  p2u7x4: {
    id: 'p2u7x4',
    name: 'Gumené kladivo na presnú mechaniku',
    category: 'Náradie',
    manufacturer: 'Precision Violence',
    machineType: ['Všetky'],
    price: 27.5,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 91,
    weightKg: 1.1,
    oemNumber: 'HAMMER-PRECISION',
    description: 'Keď diel nepasuje, možno ešte len nebol dostatočne presvedčený.',
    compatibility: 'Univerzálna.',
    shipping: 'Bezpečne zabalené, aby nič neudrelo.',
    warranty: 'Nevzťahuje sa na veci, ktoré týmto kladivom opravíš.',
    rating: 4.9,
    reviewCount: 1302,
    featured: true,
    tags: ['kladivo', 'servis', 'precision'],
  },

  q8b3m5: {
    id: 'q8b3m5',
    name: 'LED pracovné svetlo „Druhé slnko“',
    category: 'Osvetlenie',
    manufacturer: 'RetinaBurn',
    machineType: ['Bager', 'Nakladač', 'Traktor'],
    price: 199,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 29,
    weightKg: 5.3,
    oemNumber: 'LED-SUN-9000',
    description: 'Pracovné LED svetlo pre ľudí, ktorí považujú noc za technickú chybu.',
    compatibility: '12–48 V. Slnko nie je potrebné.',
    shipping: 'Balenie obsahuje upozornenie: nepozerať priamo do produktu.',
    warranty: '3 roky. Sietnica nie je súčasťou záruky.',
    rating: 4.8,
    reviewCount: 356,
    featured: true,
    tags: ['led', 'svetlo', 'noc-neexistuje'],
  },

  r1f6k9: {
    id: 'r1f6k9',
    name: 'Spätný alarm „PÍP PÍP PRO MAX“',
    category: 'Bezpečnosť',
    manufacturer: 'Annoying Systems',
    machineType: ['Nakladač', 'Bager', 'Vysokozdvižný vozík'],
    price: 58,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 67,
    weightKg: 0.9,
    oemNumber: 'BEEP-PRO-MAX',
    description:
      'Upozorní všetkých do 500 metrov, že cúvaš. Aj ľudí, ktorí o to výslovne nemajú záujem.',
    compatibility: 'Všetko, čo sa dokáže pohybovať dozadu.',
    shipping: 'Pri preprave nepípa.',
    warranty: 'Do momentu, keď ho kolega úmyselne odpojí.',
    rating: 4.0,
    reviewCount: 92,
    featured: false,
    tags: ['alarm', 'cúvanie', 'píp'],
  },

  s5n2w8: {
    id: 's5n2w8',
    name: 'Kabínový ventilátor Hurricane 3000',
    category: 'Kabína',
    manufacturer: 'SweatAway',
    machineType: ['Bager', 'Nakladač'],
    price: 79.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 34,
    weightKg: 2.2,
    oemNumber: 'FAN-HURR-3K',
    description:
      'Keď klimatizácia nefunguje už tretie leto, existuje technologicky jednoduchšie riešenie.',
    compatibility: 'Kabína so zásuvkou a operátor s nádejou.',
    shipping: 'Vrtuľa demontovaná, prsty v bezpečí.',
    warranty: '12 mesiacov alebo do prvého augustového poobedia.',
    rating: 4.7,
    reviewCount: 158,
    featured: false,
    tags: ['ventilátor', 'leto', 'kabína'],
  },

  t7d4c1: {
    id: 't7d4c1',
    name: 'Univerzálny zub lyžice „Kúsni do toho“',
    category: 'Pracovné nástroje',
    manufacturer: 'BiteForce',
    machineType: ['Bager'],
    price: 145,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 44,
    weightKg: 12.5,
    oemNumber: 'TOOTH-BIG-BITE',
    description: 'Masívny zub lyžice. Betón ho nemá rád. Kameň ho rešpektuje.',
    compatibility:
      'Viaceré typy lyžíc. Ak nepasuje, pozri produkt Gumené kladivo na presnú mechaniku.',
    shipping: 'Kuriér bude vedieť, čo je vo vnútri.',
    warranty: 'Na výrobné vady, nie na celý kopec žuly.',
    rating: 4.8,
    reviewCount: 203,
    featured: true,
    tags: ['lyžica', 'zub', 'bager'],
  },

  u3y9h6: {
    id: 'u3y9h6',
    name: 'Servisná nálepka „Po oprave“',
    category: 'Servis',
    manufacturer: 'Fixed-ish',
    machineType: ['Všetky'],
    price: 2.99,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 5000,
    weightKg: 0.01,
    oemNumber: 'STICKER-FIXED',
    description:
      'Profesionálna servisná nálepka, ktorá dodá každej improvizovanej oprave oficiálny charakter.',
    compatibility: 'Lak, sklo, kov, skrinka s náradím.',
    shipping: 'Obálka.',
    warranty: 'Nálepka drží dlhšie než niektoré opravy.',
    rating: 5.0,
    reviewCount: 2341,
    featured: true,
    tags: ['nálepka', 'servis', 'opravené'],
  },

  v6l1p3: {
    id: 'v6l1p3',
    name: 'Štartovacie káble Industrial 1000 A',
    category: 'Elektrika',
    manufacturer: 'WakeUp',
    machineType: ['Bager', 'Nakladač', 'Kamión'],
    price: 119.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 24,
    weightKg: 7.8,
    oemNumber: 'JUMP-1000A-PLS',
    description: 'Keď otočíš kľúčikom a stroj odpovie iba veľmi drahým tichom.',
    compatibility: '12 V a 24 V systémy. Nepripájať k powerbanke.',
    shipping: 'Káble sú počas prepravy od seba bezpečne oddelené.',
    warranty: '24 mesiacov, iskry zdarma.',
    rating: 4.8,
    reviewCount: 143,
    featured: false,
    tags: ['batéria', 'káble', 'štart'],
  },

  w2a8e5: {
    id: 'w2a8e5',
    name: 'Palivový uzáver s retiazkou proti strateniu',
    category: 'Palivový systém',
    manufacturer: 'DontLoseIt',
    machineType: ['Bager', 'Nakladač', 'Generátor'],
    price: 26.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 88,
    weightKg: 0.3,
    oemNumber: 'CAP-CHAINED',
    description:
      'Viečko nádrže pripevnené retiazkou. Produkt vznikol po 47 000 stratených viečkach.',
    compatibility: 'Hrdlá podobnej veľkosti a podobných ambícií.',
    shipping: 'Viečko aj retiazka garantovane v jednom balíku.',
    warranty: 'Stratu viečka už naozaj neberieme.',
    rating: 4.6,
    reviewCount: 318,
    featured: false,
    tags: ['palivo', 'viečko', 'nestratíš'],
  },

  x9g4r7: {
    id: 'x9g4r7',
    name: 'Stierač Heavy Rain Professional',
    category: 'Kabína',
    manufacturer: 'WipeForce',
    machineType: ['Bager', 'Nakladač', 'Žeriav'],
    price: 31,
    currency: 'EUR',
    condition: 'new',
    availability: 'somewhere_in_warehouse',
    stock: 6,
    weightKg: 0.4,
    oemNumber: 'WIPER-HD-600',
    description: 'Stiera vodu, blato a pri vyšších otáčkach aj menšie biologické incidenty.',
    compatibility: '600 mm. Alebo 590 mm, keď na tom netrváš.',
    shipping: 'Dlhá úzka krabica, ktorú skladník nikdy nevie nájsť.',
    warranty: '6 mesiacov alebo jednu slovenskú zimu.',
    rating: 4.3,
    reviewCount: 57,
    featured: false,
    tags: ['stierač', 'dážď', 'kabína'],
  },

  y4j7n2: {
    id: 'y4j7n2',
    name: 'Výstražný maják „Šéf prichádza“',
    category: 'Bezpečnosť',
    manufacturer: 'BossAlert',
    machineType: ['Všetky'],
    price: 64.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 52,
    weightKg: 1.1,
    oemNumber: 'BEACON-BOSS',
    description:
      'Oranžový výstražný maják vhodný na stroje, servisné vozidlá a strategické upozorňovanie kolegov.',
    compatibility: '12 V / 24 V.',
    shipping: 'Dodávané bez tajného tlačidla pod stolom.',
    warranty: 'Nevzťahuje sa na pracovnú morálku.',
    rating: 4.9,
    reviewCount: 406,
    featured: true,
    tags: ['maják', 'šéf', 'bezpečnosť'],
  },

  z1m5q8: {
    id: 'z1m5q8',
    name: 'Motorová jednotka 12.7 L „Ekologický optimista“',
    category: 'Motor',
    manufacturer: 'Diesel Forever',
    machineType: ['Bager', 'Buldozér', 'Dumper'],
    price: 18999,
    currency: 'EUR',
    condition: 'used',
    availability: 'low_stock',
    stock: 1,
    weightKg: 1180,
    oemNumber: 'ENGINE-127-BIG',
    description:
      'Dvanásť a trochu litra čistého priemyselného sebavedomia. Štartuje naftou, beží na emóciách.',
    compatibility: 'Veľké stroje. Do osobného auta iba po zásadnom prehodnotení karosérie.',
    shipping: 'Kamión, vysokozdvižný vozík a dobré plánovanie.',
    warranty: '30 dní. Prosíme, nezačínajte hneď v lome.',
    rating: 4.7,
    reviewCount: 9,
    featured: true,
    tags: ['motor', 'diesel', 'veľmi-veľké'],
  },

  aa7p3k: {
    id: 'aa7p3k',
    name: 'Univerzálna poistka 30 A – balenie 50 ks',
    category: 'Elektrika',
    manufacturer: 'FuseAgain',
    machineType: ['Všetky'],
    price: 19.5,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 143,
    weightKg: 0.2,
    oemNumber: 'FUSE-30A-X50',
    description: 'Päťdesiat poistiek, pretože obaja vieme, že problém nie je poistka.',
    compatibility: '30 A systémy a odvážni elektrikári.',
    shipping: 'Malá krabička plná druhých šancí.',
    warranty: 'Na prvú poistku áno. Ostatné už sú medzi tebou a elektrikou.',
    rating: 4.8,
    reviewCount: 673,
    featured: false,
    tags: ['poistky', 'elektrika', 'znova'],
  },

  ab2x9d: {
    id: 'ab2x9d',
    name: 'Profesionálna sťahovacia páska 900 mm',
    category: 'Servis',
    manufacturer: 'PermanentTemporary',
    machineType: ['Všetky'],
    price: 4.9,
    currency: 'EUR',
    condition: 'legendary',
    availability: 'in_stock',
    stock: 10000,
    weightKg: 0.04,
    oemNumber: 'ZIPTIE-900-GOD',
    description: 'Najuniverzálnejší náhradný diel v histórii priemyslu.',
    compatibility: 'Áno.',
    shipping: 'V obálke. Ale pokojne objednaj paletu.',
    warranty: 'Doživotná, pokiaľ sa na to nikto nepozrie zblízka.',
    rating: 5.0,
    reviewCount: 9812,
    featured: true,
    tags: ['sťahovačka', 'oprava', 'legendárne'],
  },

  ac8v4m: {
    id: 'ac8v4m',
    name: 'WD-40 Industrial Family Pack',
    category: 'Servis',
    manufacturer: 'DefinitelyNotWD',
    machineType: ['Všetky'],
    price: 49.9,
    currency: 'EUR',
    condition: 'legendary',
    availability: 'in_stock',
    stock: 223,
    weightKg: 4.6,
    oemNumber: 'SPRAY-FIX-6PACK',
    description: 'Ak sa to nehýbe a má sa to hýbať, tu začína diagnostika.',
    compatibility: 'Pánty, skrutky, mechanizmy a rozhodnutia urobené v piatok poobede.',
    shipping: 'Horľavé sebavedomie v kartónovej krabici.',
    warranty: 'Produkt funguje. Výsledok tvojej opravy negarantujeme.',
    rating: 5.0,
    reviewCount: 4382,
    featured: true,
    tags: ['sprej', 'servis', 'klasika'],
  },

  ad5c1z: {
    id: 'ad5c1z',
    name: 'Ložisko 6208 – to, ktoré hučí',
    category: 'Ložiská',
    manufacturer: 'SpinDoctor',
    machineType: ['Bager', 'Nakladač', 'Dopravník'],
    price: 42,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 86,
    weightKg: 0.6,
    oemNumber: 'BEARING-6208-NOISE',
    description:
      'Náhradné ložisko pre situácie, keď mechanik povie: „Počuješ to?“ a všetci začnú prikyvovať.',
    compatibility: 'Hriadeľ, ktorý mal mať 40 mm ešte pred desiatimi rokmi.',
    shipping: 'Malé, ťažké a mimoriadne uspokojivé na držanie.',
    warranty: '12 mesiacov pri správnej montáži. Áno, vieme.',
    rating: 4.7,
    reviewCount: 159,
    featured: false,
    tags: ['ložisko', 'hluk', 'rotácia'],
  },

  ae9r6b: {
    id: 'ae9r6b',
    name: 'Prevádzková príručka – neotvorená',
    category: 'Dokumentácia',
    manufacturer: 'ReadMe Industries',
    machineType: ['Všetky'],
    price: 15,
    currency: 'EUR',
    condition: 'legendary',
    availability: 'in_stock',
    stock: 17,
    weightKg: 0.8,
    oemNumber: 'MANUAL-UNREAD',
    description:
      'Kompletná používateľská príručka s odpoveďami na množstvo otázok, ktoré sa nikto nikdy nerozhodol položiť jej.',
    compatibility: 'Operátori, servisní technici a veľmi ambiciózni praktikanti.',
    shipping: 'Príde zatvorená. Tak pravdepodobne aj zostane.',
    warranty: 'Informácie garantované. Čítanie voliteľné.',
    rating: 2.7,
    reviewCount: 4,
    featured: false,
    tags: ['manual', 'návod', 'ignorované'],
  },

  af3k8y: {
    id: 'af3k8y',
    name: 'Červené tlačidlo bez popisu',
    category: 'Elektrika',
    manufacturer: 'DoNotPress',
    machineType: ['Všetky'],
    price: 17.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 66,
    weightKg: 0.1,
    oemNumber: 'BUTTON-RED-???',
    description:
      'Veľké červené tlačidlo. Čo robí, závisí od toho, kam ho zapojíš. To je tá zábavná časť.',
    compatibility: 'Panely s dierou približne správnej veľkosti.',
    shipping: 'Doručujeme bez zapojenia, z právnych dôvodov.',
    warranty: 'Tlačidlo funguje. Následky nie sú našou zodpovednosťou.',
    rating: 4.9,
    reviewCount: 721,
    featured: true,
    tags: ['tlačidlo', 'červené', 'neťukaj'],
  },

  ag6n2q: {
    id: 'ag6n2q',
    name: 'Kamera cúvania 4K – zachytí každý incident',
    category: 'Elektronika',
    manufacturer: 'EvidenceCam',
    machineType: ['Bager', 'Nakladač', 'Kamión'],
    price: 299,
    currency: 'EUR',
    condition: 'new',
    availability: 'low_stock',
    stock: 5,
    weightKg: 1.8,
    oemNumber: 'CAM-4K-EVIDENCE',
    description:
      'Ultra HD kamera, aby bolo pri neskoršej analýze absolútne jasné, kto presne prešiel cez kužeľ.',
    compatibility: '12–24 V systémy s monitorom a pocitom zodpovednosti.',
    shipping: 'Disk s incidentmi nie je súčasťou balenia.',
    warranty: '2 roky na kameru. Záznamy hovoria samé za seba.',
    rating: 4.6,
    reviewCount: 122,
    featured: false,
    tags: ['kamera', 'cúvanie', '4k'],
  },

  ah1t7w: {
    id: 'ah1t7w',
    name: 'GPS tracker „Kde je zase ten bager?“',
    category: 'Elektronika',
    manufacturer: 'FindMyMachine',
    machineType: ['Bager', 'Nakladač', 'Valec'],
    price: 179,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 38,
    weightKg: 0.5,
    oemNumber: 'GPS-WHERE-BAGER',
    description:
      'Ukáže polohu stroja v reálnom čase. Výrazne skracuje telefonáty typu: „Kde ste?“ – „Na stavbe.“',
    compatibility: 'Všetko drahšie než tracker.',
    shipping: 'Vieme, kde balík je. Ironicky.',
    warranty: '24 mesiacov.',
    rating: 4.8,
    reviewCount: 213,
    featured: true,
    tags: ['gps', 'tracking', 'kde-je'],
  },

  aj4p9e: {
    id: 'aj4p9e',
    name: 'Drevený klin OEM Compatible',
    category: 'Servis',
    manufacturer: 'TreeTech',
    machineType: ['Všetky'],
    price: 8.5,
    currency: 'EUR',
    condition: 'legendary',
    availability: 'in_stock',
    stock: 317,
    weightKg: 0.7,
    oemNumber: 'WOOD-WEDGE-OEM',
    description: 'Pokročilý mechanický stabilizačný komponent vyrobený z organického kompozitu.',
    compatibility: 'Dvere, kolesá, stroje, stoly a nerovné skrine.',
    shipping: 'Udržateľné balenie. Je to kus dreva.',
    warranty: 'Pokiaľ sa nerozštiepi.',
    rating: 5.0,
    reviewCount: 1877,
    featured: true,
    tags: ['klin', 'drevo', 'high-tech'],
  },

  ak7d3s: {
    id: 'ak7d3s',
    name: 'Opravná páska Industrial Black Edition',
    category: 'Servis',
    manufacturer: 'TapeEngineering',
    machineType: ['Všetky'],
    price: 14.9,
    currency: 'EUR',
    condition: 'legendary',
    availability: 'in_stock',
    stock: 621,
    weightKg: 0.5,
    oemNumber: 'TAPE-FINAL-FIX',
    description: 'Ak sa to hýbe a nemá sa to hýbať, diagnostika je ukončená.',
    compatibility: 'Takmer všetko okrem pocitu viny.',
    shipping: 'Rolované podľa priemyselných štandardov.',
    warranty: 'Pokiaľ drží, je to opravené.',
    rating: 5.0,
    reviewCount: 7511,
    featured: true,
    tags: ['páska', 'oprava', 'engineering'],
  },

  am2h8x: {
    id: 'am2h8x',
    name: 'Reproduktor do kabíny „Stavba FM“',
    category: 'Kabína',
    manufacturer: 'Concrete Beats',
    machineType: ['Bager', 'Nakladač', 'Žeriav'],
    price: 129,
    currency: 'EUR',
    condition: 'new',
    availability: 'somewhere_in_warehouse',
    stock: 8,
    weightKg: 2.6,
    oemNumber: 'SPEAKER-BASS-HD',
    description:
      'Priemyselný reproduktor s dostatočným výkonom na prehlušenie hydrauliky aj kolegu na vysielačke.',
    compatibility: 'Bluetooth, AUX a playlist z roku 2007.',
    shipping: 'Testované hudbou nevhodnou do kancelárie.',
    warranty: '24 mesiacov. Hudobný vkus nie je reklamovateľný.',
    rating: 4.7,
    reviewCount: 349,
    featured: false,
    tags: ['audio', 'kabína', 'hudba'],
  },

  an5q1c: {
    id: 'an5q1c',
    name: 'Pracovné rukavice XXL „Cit v prstoch optional“',
    category: 'Ochranné pomôcky',
    manufacturer: 'Grip-ish',
    machineType: ['Človek'],
    price: 18.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 204,
    weightKg: 0.3,
    oemNumber: 'GLOVE-XXL-GRIP',
    description:
      'Robustné pracovné rukavice vhodné na prenášanie železa, káblov a horúcich rozhodnutí.',
    compatibility: 'Ruky veľkosti L až „murár“.',
    shipping: 'Ľavá aj pravá v balení.',
    warranty: 'Nevzťahuje sa na zváranie, brúsenie ani súboj s uhlovou brúskou.',
    rating: 4.5,
    reviewCount: 231,
    featured: false,
    tags: ['rukavice', 'ppe', 'ruky'],
  },

  ap8z6f: {
    id: 'ap8z6f',
    name: 'Náhradný držiak na náhradný držiak',
    category: 'Držiaky',
    manufacturer: 'Bracketception',
    machineType: ['Všetky'],
    price: 32,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 19,
    weightKg: 1.9,
    oemNumber: 'BRACKET-BRACKET-2',
    description: 'Držiak určený na uchytenie držiaka, ktorý už nemá kam byť uchytený.',
    compatibility:
      'Najlepšie funguje s produktmi, ktorých pôvodný držiak bol odstránený z nejasných dôvodov.',
    shipping: 'Držiak je v krabici pevne uchytený.',
    warranty: 'Na držiak áno. Na držiak, ktorý drží, nie.',
    rating: 4.3,
    reviewCount: 71,
    featured: false,
    tags: ['držiak', 'meta', 'kov'],
  },

  aq3m7v: {
    id: 'aq3m7v',
    name: 'Náhradná kontrolka motora',
    category: 'Elektrika',
    manufacturer: 'CheckAgain',
    machineType: ['Všetky'],
    price: 11.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'in_stock',
    stock: 146,
    weightKg: 0.05,
    oemNumber: 'CHECK-ENGINE-LED',
    description:
      'Ak stará kontrolka motora prestala svietiť, problém treba vyriešiť pri zdroji: novou kontrolkou.',
    compatibility: 'Prístrojové panely s dostatočne nízkymi očakávaniami.',
    shipping: 'Malé balenie. Veľké posolstvo.',
    warranty: 'Garantovane svieti pri správnom zapojení.',
    rating: 4.9,
    reviewCount: 1003,
    featured: true,
    tags: ['kontrolka', 'motor', 'riešenie'],
  },

  ar9k4n: {
    id: 'ar9k4n',
    name: 'Prémiové blato do podvozku – 25 kg',
    category: 'Príslušenstvo',
    manufacturer: 'AuthenticSite',
    machineType: ['Bager', 'Nakladač', 'Traktor'],
    price: 24.9,
    currency: 'EUR',
    condition: 'new',
    availability: 'out_of_stock',
    stock: 0,
    weightKg: 25,
    oemNumber: 'MUD-PREMIUM-25',
    description: 'Autentické stavebné blato pre stroje, ktoré vyzerajú podozrivo čisto.',
    compatibility: 'Všetky podvozky, topánky a čerstvo umyté firemné autá.',
    shipping: 'Aktuálne nedostupné. Dážď pripravuje novú várku.',
    warranty: 'Konzistencia sa môže meniť podľa počasia.',
    rating: 4.1,
    reviewCount: 39,
    featured: false,
    tags: ['blato', 'realizmus', 'špina'],
  },

  as6w2j: {
    id: 'as6w2j',
    name: 'Kovová tyč na zisťovanie problému',
    category: 'Diagnostika',
    manufacturer: 'ListenStick',
    machineType: ['Všetky'],
    price: 21,
    currency: 'EUR',
    condition: 'legendary',
    availability: 'in_stock',
    stock: 74,
    weightKg: 1.5,
    oemNumber: 'ROD-DIAG-PRO',
    description: 'Prilož jeden koniec k stroju, druhý k uchu a profesionálne sa zatvár.',
    compatibility: 'Rotujúce komponenty, ktoré by ideálne nemali rotovať smerom k tebe.',
    shipping: 'Dlhá krabica.',
    warranty: 'Na tyč áno. Metódu používaj s rozumom.',
    rating: 4.8,
    reviewCount: 551,
    featured: false,
    tags: ['diagnostika', 'tyč', 'počúvanie'],
  },
};

export type ProductSortBy = 'price' | 'name' | 'rating' | 'condition';

export type SortDirection = 'asc' | 'desc';

export interface GetProductListOptions {
  sortBy?: ProductSortBy;
  direction?: SortDirection;
}

const conditionOrder: Record<ProductCondition, number> = {
  new: 0,
  used: 1,
  questionable: 2,
  legendary: 3,
};

export const getProductList = (options?: GetProductListOptions): Product[] => {
  const list = Object.values(products);

  if (!options?.sortBy) {
    return list;
  }

  const { sortBy, direction = 'asc' } = options;
  const multiplier = direction === 'desc' ? -1 : 1;

  return [...list].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name, 'sk') * multiplier;
      case 'price':
        return (a.price - b.price) * multiplier;
      case 'rating':
        return (a.rating - b.rating) * multiplier;
      case 'condition':
        return (conditionOrder[a.condition] - conditionOrder[b.condition]) * multiplier;
      default:
        return 0;
    }
  });
};

export const featuredProducts = getProductList().filter(product => product.featured);

export const favoriteProductIds: string[] = [
  'd2r7v5',
  'n9e5r2',
  'ab2x9d',
  'q8b3m5',
  'ar9k4n',
  'an5q1c',
  'am2h8x',
  'v6l1p3',
];

export const addProductToFavorites = (id: string) => {
  if (!products[id] || favoriteProductIds.includes(id)) {
    return false;
  }

  favoriteProductIds.push(id);
  return true;
};

export const removeProductFromFavorites = (id: string) => {
  const index = favoriteProductIds.indexOf(id);

  if (index === -1) {
    return false;
  }

  favoriteProductIds.splice(index, 1);
  return true;
};

export const getFavoriteProducts = () =>
  favoriteProductIds
    .map(id => products[id])
    .filter((product): product is Product => Boolean(product));

export const cartProductIds: string[] = ['a7k2f9', 'd2r7v5', 'n9e5r2', 'k3p8d4'];

export const getCartProducts = () =>
  cartProductIds.map(id => products[id]).filter((product): product is Product => Boolean(product));

export const getProductById = (id: string) => products[id];

export const getRandomProductId = () => {
  const list = getProductList();
  return list[Math.floor(Math.random() * list.length)].id;
};
