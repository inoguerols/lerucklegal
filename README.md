# Le Ruck Legal

Web de **LE RUCK LEGAL**, marca de **LA HERMIDA ESTUDIO JURIDICO SLP**.
Astro 7 + Tailwind 4, páginas estáticas y una función de contacto, desplegada en Vercel.

- Web principal: https://www.lerucklegal.com
- Proyecto Vercel: `inoguerols-projects/lerucklegal`, conectado a `main`.
- Dominio sin `www`: redirección permanente al principal.
- DNS y correo: Hostinger. No cambiar MX, SPF, DKIM, DMARC ni autoconfiguración
  del correo al modificar el alojamiento web.
- Formulario de contacto por SMTP de Hostinger, email, teléfono y WhatsApp.
  Sin MN Program, analítica de audiencia ni cookies no esenciales.

## Desarrollo y comprobaciones

Usar Node 24, alineado con Vercel y CI. Requisito mínimo: Node 22.12.

```bash
npm ci
npm run dev
npm run build
npm test
npm audit --audit-level=high
```

`npm test` comprueba el HTML generado: indexación, canonical, imágenes, JSON-LD,
sitemap, ausencia de textos de revisión y regla de exclusión de las URLs de prueba.
También ejecuta `checks/contact.mjs` con SMTP simulado, sin enviar correos reales.
Vercel y GitHub ejecutan build, comprobaciones y auditoría de dependencias.
El antiguo workflow de GitHub Pages se ha sustituido por CI sin despliegue.

Pruebas de navegador con Playwright y Chrome instalados:

```bash
BASE_URL=https://www.lerucklegal.com node checks/browser.mjs
```

`PLAYWRIGHT_MODULE` permite indicar una instalación externa de Playwright.
Sin `BASE_URL`, el check arranca la preview local del build. `SCREENSHOT_DIR`
habilita capturas en un directorio existente. Cubre 15 rutas a 320, 375, 768, 1024 y
1440 px, imágenes, guías, menú, contacto, datos estructurados, ausencia de cookies,
enlaces, redirecciones antiguas y contenido sin JavaScript.
Los casos de formulario en el navegador interceptan la petición: comprueban éxito,
fallos, límite de frecuencia y conservación del mensaje sin enviar correo real.

## Formulario de contacto

- `api/contact.js`: función Node de Vercel, separada de las páginas estáticas.
- Emisor: `contact@lerucklegal.com`; destinatario fijo: `info@lerucklegal.com`.
  El email del visitante se utiliza solo como Reply-To, nunca como destinatario.
- SMTP: `smtp.hostinger.com`, puerto 465, TLS. Variables de entorno sensibles en
  Vercel Production: `CONTACT_SMTP_USER` y `CONTACT_SMTP_PASSWORD`.
  No guardar valores reales en Git, pruebas, comandos documentados ni logs.
- Las previews sin esas variables responden 503, sin simular un envío exitoso.
- Valida origen, formato y tamaño (32 KiB, suficiente para la codificación del
  formulario nativo), campos, email y lectura de privacidad. Mensaje máximo de
  3000 caracteres. Sin adjuntos ni HTML, sin copia en base de datos de la web.
- Solo informa de éxito cuando SMTP acepta al destinatario. No garantiza lectura
  o llegada a la bandeja principal. En errores conserva el texto en el navegador;
  sin JavaScript ofrece una copia escapada recuperable en la respuesta no cacheable.
- No registra mensajes ni direcciones en logs. Protección adicional mediante
  campo trampa y regla de firewall Vercel, activa en el proyecto: POST a rutas que
  empiezan por `/api/contact`, cinco peticiones por minuto y dirección IP.
  El límite es de plataforma, no un contador en memoria de la función.
- Al mover el proyecto, recrear y verificar la regla de firewall y las variables.
  `vercel dev` sirve páginas y API localmente; `astro preview` solo las páginas.

## Publicación e indexación

- Las páginas públicas son indexables; la 404 conserva `noindex`.
- `vercel.json` aplica `X-Robots-Tag: noindex, nofollow` a hosts `*.vercel.app`,
  también si sirven el mismo build de producción. Las previews conservan además
  la protección configurada en Vercel; no desactivarla para hacer pruebas.
- Canonical, Open Graph y sitemap apuntan a `https://www.lerucklegal.com`.
- Las antiguas rutas `.html` redirigen a las páginas equivalentes.
- Vercel compila y comprueba antes de asignar el nuevo despliegue a los dominios.
  No desplegar una copia vieja ni forzar actualizaciones del historial Git.

## Contenido

- `src/data/site.ts`: datos del despacho y profesionales, servicios y FAQ.
- `src/content/actualidad/`: guías Markdown. `draft: true` excluye un texto de
  páginas, listados y sitemap. Los dos artículos iniciales sin autor aprobado
  permanecen como borradores, no publicados.
- `src/pages/`: páginas informativas, equipo, guías y legales.
- Equipo: Belén destacada con foto; Juan y Alfonso mencionados en un nivel visual
  secundario sin placeholders. Juan tiene biografía; de Alfonso solo se publica
  la información confirmada. Fotografías adicionales son opcionales.
- Portada: salvia de marca con texto marino, énfasis en herencias, donaciones y
  patrimonio, junto al retrato en B/N suave. Las fotografías interiores conservan
  el color. Las áreas se compactan en móvil sin ocultar contenido.
- WhatsApp: enlace de 44px de alto en la cabecera móvil, sin botón flotante que
  tape contenido por debajo de 768px. En tablet y escritorio conserva el flotante.
- Horario confirmado: 9:00–19:00, sin inventar días de apertura.

Las guías sobre herencias, donaciones y no residentes proceden de los textos
facilitados por Ignacio. Se normalizaron formato y marca, conservando su contenido
y usando autoría corporativa, no una autoría personal sin confirmar.

## Imágenes

Las fotografías reales de Belén (`IMG_8031.jpeg`, `IMG_7996.jpeg`, `IMG_8066.jpeg`)
se proporcionaron para esta web. En `public/equipo/` solo se incluyen derivados
WebP recortados sin metadatos; los documentos de la mesa quedan fuera del recorte.
El logo, monograma y favicon proceden del original facilitado por Belén.

Fotografía de recurso de Unsplash:
- [Patrimonio](https://images.unsplash.com/photo-1560518883-ce09059eeffa)
- [Documentación](https://images.unsplash.com/photo-1450101499163-c8848c66ca85)
- [Espacio de trabajo](https://images.unsplash.com/photo-1497366216548-37526070297c)
- [Biblioteca](https://images.unsplash.com/photo-1521587760476-6c12a4b040da)
- [Arquitectura](https://images.unsplash.com/photo-1486406146926-c627a92ad1ab),
  recurso previo de portada, ya no utilizado allí.

## Legales y proveedores

Los textos parten de los tres Word específicos del despacho, fechados el 9 de
septiembre de 2026, con adaptaciones al funcionamiento real y los datos confirmados
por Ignacio. El propietario autorizó expresamente la publicación del domicilio
social completo y el teléfono para llamadas y WhatsApp.

Fuentes técnicas verificadas el 21 de septiembre de 2026:
- [Privacy Notice de Vercel](https://vercel.com/legal/privacy-policy), apartados
  de conservación y datos generados por el servicio.
- [DPA de Vercel](https://vercel.com/legal/dpa), apartados 1, 4, 12 y 13 y anexos.
  El equipo del proyecto utiliza el plan Pro.
- [Runtime Logs](https://vercel.com/docs/logs/runtime#limits) y
  [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability).

Las ventanas de consulta del panel no acreditan la eliminación de todos los logs
internos de Vercel. Por eso se publican los criterios documentados de conservación,
no un plazo inventado de siete días. Vercel distingue tratamientos como encargado
y tratamientos como responsable de datos generados por el servicio. La política
enlaza sus fuentes y no afirma una firma contractual o certificación auditada por
nosotros. El correo Hostinger es un tratamiento distinto del alojamiento web.

Las comprobaciones técnicas no son una certificación de cumplimiento ni sustituyen
la responsabilidad del despacho sobre sus textos, contratos y actividad. No subir
Word, escrituras, expedientes, archivos de correo, credenciales ni originales
privados al repositorio público.

## Recuperación del proyecto

El 21 de septiembre se recuperaron 42 archivos fuente y assets del despliegue
`dpl_5onSu85V8QjtGhHkTnUqDjFQKQGo`, verificando sus SHA-1, porque la copia temporal
anterior había desaparecido. La copia permanente está en
`/Users/nacho/Documents/Trabajo/lerucklegal`. El historial Git original se conserva.
No volver a trabajar exclusivamente desde una carpeta temporal.
