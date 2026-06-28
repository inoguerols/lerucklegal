# Le Ruck Legal — sitio web

Web del despacho **Le Ruck Legal** (derecho tributario, Madrid). Astro + Tailwind,
salida estática, alojada en **GitHub Pages** con dominio `lerucklegal.com`.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/ localmente
```

## Estructura

- `src/data/site.ts` — **fuente única de contenido** (datos del despacho, áreas, equipo, FAQ).
  Sustituir los `TODO:` por los datos reales antes de publicar.
- `src/pages/` — páginas (home, despacho, áreas, equipo, actualidad, contacto, legales).
- `src/content/actualidad/` — artículos del blog en Markdown.
- `src/components/` — Header, Footer, banner de cookies (AEPD), botón WhatsApp.

## Pendiente antes de publicar (TODO)

1. **Datos reales** en `src/data/site.ts`: equipo (nombres, fotos en `public/equipo/`,
   nº de colegiado ICAM), dirección, datos fiscales para el Aviso Legal.
2. **Textos legales** (`/aviso-legal`, `/privacidad`, `/cookies`): completar y que los
   revise un letrado del despacho.
3. **Formulario** (`src/pages/contacto.astro`): poner el endpoint de Formspree o el
   formulario embebido de **MN Program (nmprogram)** para que los leads entren en su CRM.
4. **Foto del hero**: añadir `public/hero.jpg` (scrum de rugby) — ahora hay un degradado.
5. **Cifras** (`stats` en `site.ts`): verificables; evitar afirmaciones que sugieran
   garantía de resultado (Código Deontológico).
6. **DNS**: apuntar `lerucklegal.com` a GitHub Pages solo cuando 1–3 estén revisados.

## Integración con MN Program (nmprogram)

El despacho usa MN Program como ERP. La web enlaza al **portal de clientes real**
(`mnprogramweb.net`) y puede embeber su **formulario de registro** y su **reserva online**
de cita (planes Premium/Enterprise) para sincronizar leads y citas sin doble entrada.
Confirmar el plan y pedir los códigos de inserción a su comercial.
