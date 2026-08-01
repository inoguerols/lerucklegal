// Fuente única de contenido del sitio. Datos de identificación conforme al art. 10 de la LSSI-CE
// facilitados por el despacho (jul-2026). La marca comercial es "Le Ruck Legal"; el titular
// societario es La Hermida Estudio Jurídico, S.L.P., y solo aparece donde la ley lo exige.

export const site = {
  name: "Le Ruck Legal",
  shortName: "LRL",
  tagline: "Trabajo en equipo, honestidad y eficiencia.",
  description:
    "Despacho boutique en Madrid especializado en asesoramiento tributario y litigación, y en derecho civil, sucesiones y planificación patrimonial. Asesoramos a empresas, grupos familiares y particulares.",
  url: "https://lerucklegal.com",
  city: "Madrid",
  // --- Contacto ---
  phone: "+34 686 805 223",
  phoneHref: "+34686805223",
  whatsapp: "34686805223", // wa.me/<número>
  email: "info@lerucklegal.com",
  hours: "Lunes a viernes en el despacho · WhatsApp 24/7",
  address: {
    street: "Av. Pablo VI, 7, portal 4, 3º izq.",
    postalCode: "28224",
    city: "Pozuelo de Alarcón",
    region: "Comunidad de Madrid",
    country: "ES",
    mapsQuery: "Avenida+Pablo+VI+7+28224+Pozuelo+de+Alarcón+Madrid",
  },
  // --- Identificación legal obligatoria (LSSI art. 10) ---
  legal: {
    titular: "La Hermida Estudio Jurídico, S.L.P.",
    nif: "B26914176",
    colegio: "Ilustre Colegio de la Abogacía de Madrid (ICAM)",
  },
  // --- Portal de clientes: MN Program, el software de gestión del despacho ---
  clientPortalUrl: "https://www.mnprogramweb.net/",
  social: {
    linkedin: "",
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

// Banda de confianza. Deliberadamente SIN cifras de experiencia o resultados: el art. 6 del
// Código Deontológico (RD 135/2021) prohíbe la publicidad que induzca a error sobre la
// experiencia del abogado. Todo lo de aquí es verificable o es un compromiso del despacho.
export const stats = [
  { value: "ICAM", label: "Colegiados en el Ilustre Colegio de la Abogacía de Madrid" },
  { value: "24 h", label: "Respuesta a tu consulta en días laborables" },
  { value: "1ª consulta", label: "Confidencial y sin compromiso" },
  { value: "Toda España", label: "Sede en Pozuelo de Alarcón, presencial y online" },
];

// Categorías de primer nivel. Las rutas de área siguen siendo planas (/areas/[slug]): la
// categoría solo agrupa en el render y sirve de ancla (#fiscal, #civil) en /areas.
export const categories = [
  {
    slug: "fiscal",
    title: "Fiscal y tributario",
    intro:
      "Defensa frente a Hacienda en todas las fases —comprobación, inspección, vía administrativa y judicial— y el cumplimiento y la planificación fiscal del día a día.",
  },
  {
    slug: "civil",
    title: "Civil, sucesiones y patrimonio",
    intro:
      "Herencias, donaciones y organización jurídica del patrimonio familiar: contratos, escrituras y trámites ante notaría, registros y Administración.",
  },
] as const;

export type Area = {
  slug: string;
  category: (typeof categories)[number]["slug"];
  title: string;
  short: string;
  summary: string;
  bullets: string[];
};

export const areas: Area[] = [
  {
    slug: "inspecciones-fiscales",
    category: "fiscal",
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
    category: "fiscal",
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
    category: "fiscal",
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
    slug: "impuestos-no-residentes",
    category: "fiscal",
    title: "Impuestos de no residentes",
    short: "Fiscalidad de quienes no residen en España pero tributan aquí.",
    summary:
      "Asesoramos a personas y sociedades no residentes con obligaciones fiscales en España: rentas inmobiliarias, transmisiones, retenciones y devoluciones ante la Agencia Tributaria.",
    bullets: [
      "Impuesto sobre la Renta de no Residentes (IRNR) y modelo 210",
      "Retención del 3 % en la compraventa de inmuebles y su devolución",
      "Tributación de rentas inmobiliarias y alquileres",
      "Certificados de residencia fiscal y convenios de doble imposición",
    ],
  },
  {
    slug: "planificacion-fiscal",
    category: "fiscal",
    title: "Planificación y cumplimiento fiscal",
    short: "Estructuración fiscal eficiente y cumplimiento de las obligaciones periódicas.",
    summary:
      "Asesoramos en la organización fiscal de personas y empresas para optimizar la carga tributaria con seguridad jurídica, y nos ocupamos de que las obligaciones formales se presenten bien y a tiempo.",
    bullets: [
      "Liquidación y presentación de impuestos",
      "Cumplimiento de obligaciones formales y modelos periódicos",
      "Estructura societaria y patrimonial",
      "Revisión fiscal de operaciones antes de ejecutarlas",
    ],
  },
  {
    slug: "sucesiones-donaciones",
    category: "civil",
    title: "Sucesiones, herencias y donaciones",
    short: "Tramitación integral de herencias y donaciones, con su fiscalidad.",
    summary:
      "Acompañamos a las familias en todo el proceso sucesorio, desde la declaración de herederos hasta la adjudicación y la liquidación de impuestos, evitando conflictos y sorpresas fiscales.",
    bullets: [
      "Declaración de herederos y aceptación de herencia",
      "Cuaderno particional y adjudicación de bienes",
      "Donaciones en vida y sus efectos fiscales",
      "Impuesto sobre Sucesiones y Donaciones y plusvalía municipal",
    ],
  },
  {
    slug: "planificacion-sucesoria",
    category: "civil",
    title: "Planificación hereditaria y patrimonial",
    short: "Ordenar el patrimonio familiar antes de que surja el conflicto.",
    summary:
      "Diseñamos la transmisión del patrimonio familiar con antelación —testamentos, pactos y estructuras— para que llegue a quien debe, con el menor coste fiscal y sin litigios entre herederos.",
    bullets: [
      "Testamentos y disposiciones de última voluntad",
      "Organización patrimonial de personas físicas y familias",
      "Protocolo familiar y previsión del relevo generacional",
      "Análisis fiscal anticipado de la sucesión",
    ],
  },
  {
    slug: "contratos-y-escrituras",
    category: "civil",
    title: "Contratos, escrituras y trámites",
    short: "Redacción de contratos y tramitación ante notaría, registros y Administración.",
    summary:
      "Redactamos y revisamos los documentos que sostienen una operación —contratos, escrituras, instancias— y nos ocupamos de su presentación y registro ante los organismos públicos.",
    bullets: [
      "Redacción y revisión de contratos",
      "Tramitación de escrituras públicas e instancias privadas",
      "Presentación y registro ante organismos públicos",
      "Coordinación con notarías, registros y ayuntamientos",
    ],
  },
];

export type Lawyer = {
  slug: string;
  name: string;
  role: string;
  colegiado: string; // nº de colegiado ICAM — obligatorio mostrarlo
  photo: string; // ruta en /public
  bio: string[]; // un párrafo por elemento
  languages?: string;
  areas: string[];
  email?: string;
};

// El resto del equipo se añade cuando el despacho envíe fichas y números de colegiado. Publicar
// una ficha con datos por rellenar es peor que no publicarla.
export const team: Lawyer[] = [
  {
    slug: "belen-de-santa-olalla",
    name: "Belén de Santa Olalla de la Puerta",
    role: "Socia — Derecho civil, sucesiones, donaciones y planificación patrimonial",
    colegiado: "ICAM nº 144.627",
    photo: "/equipo/placeholder.svg", // pendiente: /equipo/belen.jpg
    bio: [
      "Belén de Santa Olalla de la Puerta es abogada especializada en derecho civil, sucesiones, donaciones y planificación patrimonial. Su experiencia se centra en el asesoramiento integral a personas físicas y familias en materia hereditaria, organización patrimonial, tramitación de escrituras públicas, redacción contractual y liquidación de impuestos vinculados a operaciones sucesorias y patrimoniales.",
      "Cuenta además con experiencia en derecho inmobiliario, gestión de activos, transmisiones de inmuebles, tributación de clientes no residentes, due diligence y coordinación con notarías, registros, ayuntamientos y otros organismos oficiales. Ha desarrollado parte de su trayectoria en Pons-Novit Legal, Haya Real Estate, Banco Santander y Martínez-Echevarría Abogados.",
      "Su perfil combina una sólida formación jurídica con especialización fiscal: Grado en Derecho por la Universidad de Granada, Máster Universitario en Práctica de la Abogacía y Curso Superior de Tributación, ambos por el CEF.",
    ],
    languages: "Español e inglés",
    areas: [
      "sucesiones-donaciones",
      "planificacion-sucesoria",
      "contratos-y-escrituras",
      "impuestos-no-residentes",
    ],
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
    q: "¿Qué plazo tengo para liquidar el Impuesto sobre Sucesiones?",
    a: "Seis meses desde el fallecimiento. Puede solicitarse una prórroga de otros seis, pero hay que pedirla dentro de los cinco primeros meses. Pasado el plazo se acumulan recargos e intereses, así que conviene no dejarlo correr.",
  },
  {
    q: "¿Trabajáis solo en Madrid?",
    a: "Nuestra sede está en Pozuelo de Alarcón (Madrid), pero atendemos asuntos en toda España, con reuniones presenciales o por videoconferencia.",
  },
  {
    q: "¿Cómo es la primera consulta?",
    a: "Es confidencial y sin compromiso. Estudiamos tu caso, te explicamos las opciones y, si procede, te proponemos un plan de actuación y presupuesto.",
  },
];
