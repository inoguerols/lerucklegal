// Fuente única de contenido del sitio. Sustituir los TODO por datos reales del despacho
// antes de publicar (los tiene el despacho). Sin estos datos no se hace público el DNS.

export const site = {
  name: "Le Ruck Legal",
  shortName: "LRL",
  tagline: "Trabajo en equipo, honestidad y eficiencia.",
  description:
    "Despacho boutique especializado en derecho tributario en Madrid: defensa frente a inspecciones de Hacienda, recursos, litigios contencioso-administrativos y planificación fiscal.",
  url: "https://lerucklegal.com",
  city: "Madrid",
  // --- Contacto (verificar/actualizar) ---
  phone: "+34 605 65 17 20",
  phoneHref: "+34605651720",
  whatsapp: "34605651720", // wa.me/<número>
  email: "info@lerucklegal.com",
  hours: "Lunes a Viernes, 9:00–18:00",
  // TODO: dirección real del despacho para Aviso Legal, mapa y schema
  address: {
    street: "TODO: Calle y número",
    postalCode: "TODO: CP",
    city: "Madrid",
    region: "Comunidad de Madrid",
    country: "ES",
    mapsQuery: "Le+Ruck+Legal+Madrid",
  },
  // --- Identificación legal obligatoria (LSSI art. 10) — TODO datos fiscales reales ---
  legal: {
    titular: "TODO: Denominación / titular del despacho",
    nif: "TODO: NIF/CIF",
    colegio: "Ilustre Colegio de la Abogacía de Madrid (ICAM)",
  },
  // --- Portal de clientes: enlace al portal REAL de MN Program (nmprogram) ---
  clientPortalUrl: "https://www.mnprogramweb.net/",
  social: {
    linkedin: "", // TODO opcional
  },
} as const;

export const nav = [
  { label: "Inicio", href: "/" },
  { label: "Despacho", href: "/despacho" },
  { label: "Áreas", href: "/areas" },
  { label: "Equipo", href: "/equipo" },
  { label: "Actualidad", href: "/actualidad" },
  { label: "Contacto", href: "/contacto" },
];

// Cifras del despacho — REFORMULADAS para no sugerir garantía de resultado
// (Código Deontológico de la Abogacía). Sustituir por datos verificables.
export const stats = [
  { value: "+15", label: "años de experiencia en fiscalidad" },
  { value: "+500", label: "expedientes tributarios gestionados" },
  { value: "100%", label: "dedicación: solo derecho tributario" },
  { value: "24/7", label: "atención por WhatsApp" },
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
  {
    slug: "planificacion-fiscal",
    title: "Planificación fiscal",
    short: "Estructuración fiscal eficiente y conforme a la norma.",
    summary:
      "Asesoramos en la organización fiscal de personas y empresas para optimizar la carga tributaria con seguridad jurídica, revisando operaciones antes de ejecutarlas.",
    bullets: [
      "Estructura societaria y patrimonial",
      "Optimización de la carga tributaria",
      "Revisión fiscal de operaciones",
      "Cumplimiento (compliance) tributario",
    ],
  },
];

export type Lawyer = {
  slug: string;
  name: string;
  role: string;
  colegiado: string; // nº de colegiado ICAM — obligatorio mostrarlo
  photo: string; // ruta en /public — TODO foto real
  bio: string;
  areas: string[];
  email?: string;
};

// TODO: sustituir por el equipo real (nombres, fotos, nº de colegiado, bios).
export const team: Lawyer[] = [
  {
    slug: "belen-de-santaolalla",
    name: "Belén de Santaolalla de la Puerta",
    role: "TODO: cargo (p. ej. Abogada — Derecho tributario)",
    colegiado: "ICAM nº TODO",
    photo: "/equipo/placeholder.svg", // TODO: /equipo/belen.jpg
    bio: "TODO: Biografía profesional — formación, trayectoria, asuntos representativos en derecho tributario, publicaciones e idiomas.",
    areas: ["inspecciones-fiscales", "contencioso-administrativo"],
    email: "info@lerucklegal.com",
  },
  {
    slug: "abogado-fiscal",
    name: "TODO: Nombre del/de la abogado/a",
    role: "Abogado/a — Derecho tributario",
    colegiado: "ICAM nº TODO",
    photo: "/equipo/placeholder.svg",
    bio: "TODO: Biografía profesional — formación, trayectoria y áreas de especialización.",
    areas: ["recursos-administrativos", "planificacion-fiscal"],
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
