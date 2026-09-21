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
  colegio: string;
  colegiado: string;
  photo?: string;
  bio: string;
  education?: string;
  languages?: string;
  clients?: string;
  areas: string[];
  email?: string;
};

// Datos profesionales facilitados por el despacho. Sin foto, no se muestra imagen.
export const team: Lawyer[] = [
  {
    slug: "belen-de-santaolalla",
    name: "Belén de Santa Olalla de la Puerta",
    role: "Socia / Abogada especialista en Derecho Civil, Sucesiones, Donaciones y Planificación Patrimonial",
    colegio: "Ilustre Colegio de la Abogacía de Madrid",
    colegiado: "Colegiada en el Ilustre Colegio de la Abogacía de Madrid, número 144.627",
    photo: "/equipo/belen-retrato.webp",
    bio: "Belén de Santa Olalla de la Puerta es abogada especializada en derecho civil, sucesiones, donaciones y planificación patrimonial. Su experiencia se centra en el asesoramiento integral a personas físicas y familias en materia hereditaria, organización patrimonial, tramitación de escrituras públicas, redacción contractual y liquidación de impuestos y obligaciones fiscales.\n\nHa desarrollado su carrera en despachos, entidades financieras y el sector inmobiliario, con experiencia en Pons-Novit Legal, Haya Real Estate, Banco Santander y Martínez-Echevarría abogados. Cuenta además con experiencia en gestión de activos, transmisiones inmobiliarias, fiscalidad de no residentes, due diligence y coordinación con notarías, registros, ayuntamientos y otros organismos oficiales.",
    education: "Graduada en Derecho por la Universidad de Granada; Máster Universitario en Práctica de la Abogacía por CEF; Prueba de Aptitud Profesional para el ejercicio de la abogacía; Curso Superior de Tributación por CEF.",
    languages: "Español e inglés.",
    clients: "Principalmente personas físicas, familias y patrimonios privados que requieren asesoramiento en sucesiones, donaciones, planificación hereditaria y organización patrimonial. También cuenta con experiencia en operaciones inmobiliarias para clientes extranjeros y sociedades, tributación de no residentes, recuperación de impuestos (tax reclaim) y coordinación con registros, notarías y administraciones.",
    areas: ["planificacion-fiscal"],
    email: "info@lerucklegal.com",
  },
  {
    slug: "juan-jose-blanco-rial",
    name: "Juan José Blanco Rial",
    role: "Socio / Especialista en Derecho Financiero y Procedimiento Tributario",
    colegio: "Ilustre Colegio de Abogados de Pontevedra",
    colegiado: "Colegiado en el Ilustre Colegio de Abogados de Pontevedra (ICAPo), número 3894",
    bio: "Juan José Blanco Rial es socio de Le Ruck Legal y especialista en derecho financiero, con un enfoque particular en procedimiento tributario. Posee amplia experiencia en comprobaciones de valores y en asuntos relacionados con impuestos a nivel nacional, autonómico y local, prestando asesoramiento tanto a empresas como a contribuyentes individuales en procesos de inspección, recursos y procedimientos sancionadores.\n\nAsesora habitualmente en planificación y defensa tributaria en operaciones financieras complejas, reestructuraciones y compraventas, así como en el tratamiento fiscal de instrumentos de deuda y activos financieros. Su práctica integra el conocimiento técnico tributario con la visión del mercado financiero, buscando soluciones eficaces y estrategias de mitigación de riesgo fiscal.\n\nHa intervenido en procedimientos tributarios ante las distintas administraciones y colabora con asesores fiscales y equipos jurídicos multidisciplinares para ofrecer un servicio integral. En Le Ruck Legal lidera el área de procedimiento tributario dentro de la práctica de derecho financiero.",
    areas: ["inspecciones-fiscales", "recursos-administrativos"],
    email: "info@lerucklegal.com",
  },
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
