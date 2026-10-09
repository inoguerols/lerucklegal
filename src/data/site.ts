// Fuente única de contenido del sitio. Sustituir los TODO por datos reales del despacho
// antes de publicar (los tiene el despacho). Sin estos datos no se hace público el DNS.

export const site = {
  name: "Le Ruck Legal",
  shortName: "LRL",
  tagline: "Trabajo en equipo, honestidad y eficiencia.",
  description:
    "Despacho en Madrid: sucesiones y donaciones, planificación hereditaria y patrimonial, liquidación de impuestos y defensa en procedimientos tributarios.",
  url: "https://www.lerucklegal.com",
  city: "Madrid",
  // --- Contacto (verificar/actualizar) ---
  // Teléfono, WhatsApp y horario confirmados; días de atención pendientes.
  phone: "+34 686 80 52 23",
  phoneHref: "+34686805223",
  whatsapp: "34686805223",
  email: "info@lerucklegal.com",
  hours: "9:00–19:00",
  // Domicilio social confirmado por Ignacio; no se presenta como local de visitas.
  address: {
    street: "Avda. Pablo VI, nº 7, portal 4, 3º Izq.",
    postalCode: "28224",
    city: "Pozuelo de Alarcón",
    region: "Comunidad de Madrid",
    country: "ES",
    mapsQuery: "Le+Ruck+Legal+Madrid",
  },
  // Identificación legal confirmada con el despacho y los documentos facilitados.
  legal: {
    titular: "LA HERMIDA ESTUDIO JURIDICO SLP",
    nif: "B26914176",
    registro: "Registro Mercantil de Madrid, sección 8, hoja M-885738, inscripción 1ª. Fecha de constitución: 21 de mayo de 2026.",
  },
  social: {
    linkedin: "", // TODO opcional
  },
} as const;

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Despacho", href: "/despacho" },
  { label: "Áreas", href: "/areas" },
  { label: "Equipo", href: "/equipo" },
  { label: "Guías", href: "/actualidad" },
  { label: "Contacto", href: "/contacto" },
];

export type Area = {
  slug: string;
  title: string;
  short: string;
  summary: string;
  bullets: string[];
};

export const areas: Area[] = [
  {
    // Conserva la URL publicada de planificación fiscal.
    slug: "planificacion-fiscal",
    title: "Área fiscal",
    short: "Sucesiones, donaciones y planificación familiar y patrimonial. Liquidación de impuestos y tramitación ante organismos públicos.",
    summary:
      "Asesoramiento integral en sucesiones y donaciones, planificación hereditaria y patrimonial, liquidación de impuestos y cumplimiento de las obligaciones fiscales, también para no residentes. Constitución de sociedades mercantiles y tramitación de documentos, contratos y su presentación y registro ante organismos públicos.",
    bullets: [
      "Procedimientos en materia de derecho civil: sucesiones y donaciones, asesoramiento integral y planificación hereditaria y patrimonial.",
      "Liquidación de impuestos y cumplimentación de las obligaciones fiscales.",
      "Liquidación de impuestos de no residentes.",
      "Tramitación de escrituras públicas e instancias privadas y redacción de contratos.",
      "Presentación y registro ante los organismos públicos.",
      "Constitución de sociedades mercantiles.",
    ],
  },
  {
    slug: "derecho-inmobiliario",
    title: "Derecho inmobiliario",
    short: "Compraventas, escrituras y fiscalidad inmobiliaria. Asesoramiento para organizar y transmitir tu patrimonio.",
    summary:
      "Asesoramos en operaciones inmobiliarias y en la organización del patrimonio familiar. Acompañamos la preparación de escrituras públicas y analizamos la fiscalidad de cada operación, coordinando su tramitación con notarías y registros.",
    bullets: [
      "Preparación de escrituras de compraventa y préstamos.",
      "Declaraciones de obra nueva y división horizontal.",
      "Donaciones y herencias de inmuebles.",
      "Fiscalidad inmobiliaria y organización del patrimonio familiar.",
      "Coordinación de la documentación con notarías y registros.",
    ],
  },
  {
    slug: "inspecciones-fiscales",
    title: "Inspecciones fiscales",
    short: "Defensa durante todo el procedimiento de inspección de Hacienda.",
    summary:
      "Te acompañamos desde el inicio del procedimiento inspector hasta su resolución, anticipando riesgos y protegiendo tus derechos frente a la Administración tributaria.",
    bullets: [
      "Asistencia durante las actuaciones inspectoras",
      "Preparación de alegaciones y escritos",
      "Negociación con la Administración",
      "Recurso de liquidaciones provisionales y definitivas",
    ],
  },
  {
    slug: "recursos-administrativos",
    title: "Recursos administrativos",
    short: "Impugnación de liquidaciones y sanciones tributarias.",
    summary:
      "Recurrimos liquidaciones y sanciones mediante los cauces administrativos, buscando la suspensión del acto y la mejor estrategia antes de acudir a la vía judicial.",
    bullets: [
      "Recurso de reposición",
      "Reclamación económico-administrativa (TEAR/TEAC)",
      "Recursos extraordinarios",
      "Suspensión de actos administrativos",
    ],
  },
  {
    slug: "contencioso-administrativo",
    title: "Litigios contencioso-administrativos",
    short: "Representación ante los tribunales frente a resoluciones tributarias.",
    summary:
      "Defendemos tus intereses en sede judicial cuando la vía administrativa se agota, con experiencia en procedimientos contencioso-administrativos en materia fiscal.",
    bullets: [
      "Recurso contencioso-administrativo",
      "Procedimiento abreviado",
      "Medidas cautelares",
      "Recurso de casación",
    ],
  },
];

export type Lawyer = {
  slug: string;
  name: string;
  role: string;
  specialty: string;
  colegio: string;
  colegiado: string;
  photoScale?: number;
  photoPosition?: string;
  formation?: string[];
  memberships?: string[];
  card: { slug: string; givenName: string; familyName: string; nameLines: string[]; specialties: string[]; portraitScale: number; portraitPosition: string; artworkNameLines: string[]; artworkSpecialty: string };
  photo: string; // ruta en /public
  bio: string; // un párrafo por elemento
  education?: string;
  clients?: string;
  languages?: string;
  areas: string[];
  email?: string;
  phone?: string;
  phoneHref?: string;
};

// Socios en orden alfabético por nombre.
export const team: Lawyer[] = [
  {
    "slug": "alfonso-montero-sanz",
    "name": "Alfonso Mª Montero Sanz",
    "role": "Socio",
    "specialty": "Derecho tributario e inmobiliario",
    "colegio": "Ilustre Colegio de la Abogacía de Madrid",
    "colegiado": "ICAM nº 91.247",
    "photo": "/equipo/alfonso-retrato.jpeg",
    "card": {
      "slug": "alfonso",
      "portraitScale": 2,
      "portraitPosition": "center 14%",
      "artworkNameLines": [
        "Alfonso Mª",
        "Montero Sanz"
      ],
      "artworkSpecialty": "Derecho tributario · Inmobiliario",
      "givenName": "Alfonso Mª",
      "familyName": "Montero Sanz",
      "nameLines": [
        "Alfonso Mª",
        "Montero Sanz"
      ],
      "specialties": [
        "Derecho tributario",
        "Derecho inmobiliario y patrimonio"
      ]
    },
    "bio": "Alfonso Mª Montero Sanz es abogado especializado en Derecho Tributario y Derecho Inmobiliario. Asesora a personas físicas en la organización de patrimonios familiares, fiscalidad inmobiliaria y procedimientos de comprobación, inspección y litigación tributaria.\n\nCuenta con amplia experiencia en la redacción y preparación de escrituras de compraventa, préstamos, declaraciones de obra nueva, división horizontal, donaciones, herencias y escrituras mercantiles, así como otros documentos de naturaleza pública.\n\nHa desarrollado su carrera en despachos de abogados y entidades del IBEX 35, y ha sido responsable del área fiscal de una de las mayores entidades inmobiliarias residenciales de ámbito nacional. Ha compatibilizado su actividad profesional con la docencia como profesor honorario del departamento de Derecho Tributario de la Universidad de Valladolid.",
    "formation": [
      "Licenciado en Derecho por la Universidad de Valladolid",
      "Máster en Asesoría Fiscal por el Instituto de Empresas",
      "Máster en Dirección Económico-Financiera por el CEF",
      "Máster en Corporate Finance y Banca de Inversión por el IEB",
      "Programa de Especialización en Derecho de los Mercados Financieros por el IEB",
      "Programa de Fusiones y Adquisiciones (M&A) y Private Equity por el IEB",
      "Programa de Experto en Fiscalidad Internacional por ESADE"
    ],
    "memberships": [
      "ICAM nº 91.247",
      "Colaborador Asociado de la Real Academia de la Jurisprudencia y Legislación"
    ],
    "languages": "Español e inglés",
    "areas": [
      "planificacion-fiscal",
      "derecho-inmobiliario",
      "inspecciones-fiscales",
      "recursos-administrativos",
      "contencioso-administrativo"
    ],
    "email": "a.monterosanz@lerucklegal.com",
    "phone": "+34 605 65 17 20",
    "phoneHref": "+34605651720"
  },
  {
    "slug": "belen-de-santaolalla",
    "name": "Belén de Santa Olalla de la Puerta",
    "role": "Socia",
    "specialty": "Derecho civil, sucesiones y patrimonio",
    "colegio": "Ilustre Colegio de la Abogacía de Madrid",
    "card": {
      "slug": "belen",
      "portraitScale": 1.7,
      "portraitPosition": "center 25%",
      "artworkNameLines": [
        "Belén de",
        "Santa Olalla",
        "de la Puerta"
      ],
      "artworkSpecialty": "Derecho civil · Sucesiones · Patrimonio",
      "givenName": "Belén",
      "familyName": "de Santa Olalla de la Puerta",
      "nameLines": [
        "Belén de Santa Olalla",
        "de la Puerta"
      ],
      "specialties": [
        "Derecho civil y sucesiones",
        "Donaciones y planificación patrimonial"
      ]
    },
    "colegiado": "ICAM nº 144.627",
    "photo": "/equipo/belen-retrato.webp",
    "bio": "Belén de Santa Olalla de la Puerta es abogada especializada en derecho civil, sucesiones, donaciones y planificación patrimonial. Su experiencia se centra en el asesoramiento integral a personas físicas y familias en materia hereditaria, organización patrimonial, tramitación de escrituras públicas, redacción contractual y liquidación de impuestos y obligaciones fiscales.\n\nHa desarrollado su carrera en despachos, entidades financieras y el sector inmobiliario, con experiencia en Pons-Novit Legal, Haya Real Estate, Banco Santander y Martínez-Echevarría abogados. Cuenta además con experiencia en gestión de activos, transmisiones inmobiliarias, fiscalidad de no residentes, due diligence y coordinación con notarías, registros, ayuntamientos y otros organismos oficiales.",
    "languages": "Español e inglés.",
    "areas": [
      "planificacion-fiscal"
    ],
    "email": "info@lerucklegal.com",
    "education": "Graduada en Derecho por la Universidad de Granada; Máster Universitario en Práctica de la Abogacía por CEF; Prueba de Aptitud Profesional para el ejercicio de la abogacía; Curso Superior de Tributación por CEF.",
    "clients": "Principalmente personas físicas, familias y patrimonios privados que requieren asesoramiento en sucesiones, donaciones, planificación hereditaria y organización patrimonial. También cuenta con experiencia en operaciones inmobiliarias para clientes extranjeros y sociedades, tributación de no residentes, recuperación de impuestos (tax reclaim) y coordinación con registros, notarías y administraciones."
  },
  {
    "slug": "juan-jose-blanco-rial",
    "name": "Juan José Blanco Rial",
    "role": "Socio",
    "specialty": "Derecho tributario y procedimientos tributarios",
    "colegio": "Ilustre Colegio de Abogados de Pontevedra",
    "colegiado": "ICAPo nº 3894",
    "photo": "/equipo/juan-retrato.webp",
    "card": {
      "slug": "juan",
      "portraitScale": 1.6,
      "portraitPosition": "center top",
      "artworkNameLines": [
        "Juan José",
        "Blanco Rial"
      ],
      "artworkSpecialty": "Derecho tributario · Procedimientos",
      "givenName": "Juan José",
      "familyName": "Blanco Rial",
      "nameLines": [
        "Juan José",
        "Blanco Rial"
      ],
      "specialties": [
        "Derecho tributario",
        "Procedimientos tributarios"
      ]
    },
    "bio": "Juan José Blanco Rial es abogado especializado en Derecho Tributario y, en particular, en procedimiento tributario. Su actividad profesional se centra en la defensa de los intereses de particulares, autónomos y empresas frente a la Administración Tributaria.\n\nAcompaña a sus clientes en todas las fases del procedimiento tributario, con un asesoramiento cercano, personalizado y técnicamente sólido ante inspecciones, comprobaciones, recursos y reclamaciones.\n\nSu compromiso es ofrecer soluciones claras, eficaces y adaptadas a cada situación, aportando seguridad jurídica y protegiendo los derechos de quienes confían en Le Ruck Legal.",
    "formation": [
      "Máster en Asesoría Fiscal por la Universidad a Distancia de Madrid (UDIMA)",
      "Curso de Contabilidad Fiscal del CEF",
      "Formación en Competencias Digitales"
    ],
    "areas": [
      "inspecciones-fiscales",
      "recursos-administrativos"
    ],
    "email": "j.blancorial@lerucklegal.com",
    "phone": "+34 663 21 47 29",
    "phoneHref": "+34663214729"
  }
];

export const faqs = [
  {
    q: "¿Qué hago si recibo una notificación de inicio de inspección de Hacienda?",
    a: "No firmes ni respondas sin asesoramiento. Contacta cuanto antes: el plazo y la forma de las primeras actuaciones condicionan toda la defensa posterior.",
  },
  {
    q: "¿Puedo recurrir una sanción o liquidación tributaria?",
    a: "Sí. Existen distintas vías (recurso de reposición, reclamación económico-administrativa y, en su caso, contencioso-administrativo). Analizamos plazos y la estrategia más favorable en cada caso.",
  },
  {
    q: "¿Trabajáis solo en Madrid?",
    a: "Nuestra sede está en Madrid, pero atendemos asuntos tributarios en toda España, con reuniones presenciales o por videoconferencia.",
  },
  {
    q: "¿Cómo es la primera consulta?",
    a: "Es confidencial y sin compromiso. Estudiamos tu caso, te explicamos las opciones y, si procede, te proponemos un plan de actuación y presupuesto.",
  },
];
