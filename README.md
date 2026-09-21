# Le Ruck Legal

Web de **LE RUCK LEGAL**, marca de **LA HERMIDA ESTUDIO JURIDICO SLP**.
Astro 7 + Tailwind 4, salida estática, desplegada en Vercel.

- Web principal: https://www.lerucklegal.com
- Proyecto Vercel: `inoguerols-projects/lerucklegal`, conectado a `main`.
- Dominio sin `www`: redirección permanente al principal.
- DNS y correo: Hostinger. No cambiar MX, SPF, DKIM, DMARC ni autoconfiguración
  del correo al modificar el alojamiento web.
- Sin formulario, MN Program, analítica de audiencia ni cookies no esenciales.
  Contacto por email, teléfono y enlace externo a WhatsApp.

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
Vercel y GitHub ejecutan build, comprobaciones y auditoría de dependencias.
El antiguo workflow de GitHub Pages se ha sustituido por CI sin despliegue.

Pruebas de navegador con Playwright y Chrome instalados:

```bash
BASE_URL=https://www.lerucklegal.com node checks/browser.mjs
```

`PLAYWRIGHT_MODULE` permite indicar una instalación externa de Playwright.
Sin `BASE_URL`, el check arranca la preview local del build. `SCREENSHOT_DIR`
habilita capturas en un directorio existente. Cubre 15 rutas a 375, 768, 1024 y
1440 px, imágenes, guías, menú, contacto, datos estructurados, ausencia de cookies,
enlaces, redirecciones antiguas y contenido sin JavaScript.

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
