// Regenerate the static artwork with Node 22.18+: node scripts/render-belen-card.mjs
// Uses sharp, already installed with Astro.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { site } from '../src/data/site.ts';

const logo = await readFile(new URL('../public/logo-monograma-navy.png', import.meta.url));
const portrait = await sharp(await readFile(new URL('../public/equipo/belen-retrato.webp', import.meta.url))).png().toBuffer();
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f7f6f1"/>
  <image href="data:image/png;base64,${portrait.toString('base64')}" x="0" y="0" width="420" height="630" preserveAspectRatio="xMidYMid slice"/>
  <rect x="420" width="8" height="630" fill="#afb49e"/>
  <image href="data:image/png;base64,${logo.toString('base64')}" x="636" y="52" width="23" height="46"/>
  <text x="680" y="84" fill="#16233a" font-family="Georgia,serif" font-size="24" letter-spacing="3">${escape(site.name.toUpperCase())}</text>
  <text x="810" y="161" text-anchor="middle" fill="#646a4d" font-family="Arial,sans-serif" font-size="17" letter-spacing="4">ABOGADA · SOCIA</text>
  <g text-anchor="middle" fill="#16233a" font-family="Georgia,serif" font-size="61">
    <text x="810" y="250">Belén de</text>
    <text x="810" y="322">Santa Olalla</text>
    <text x="810" y="394" font-size="49">de la Puerta</text>
  </g>
  <path d="M760 425h100" stroke="#878e6b" stroke-width="2"/>
  <g text-anchor="middle" fill="#16233a" font-family="Arial,sans-serif">
    <text x="810" y="470" font-size="25">Derecho civil · Sucesiones · Patrimonio</text>
    <text x="810" y="517" font-size="21" fill="#646a4d">lerucklegal.com/belen</text>
    <text x="810" y="581" font-size="21">${escape(site.phone)}   ·   ${escape(site.email)}</text>
  </g>
</svg>`;
const png = await sharp(Buffer.from(svg)).png({ palette: true, colours: 256 }).toBuffer();
await writeFile(new URL('../public/tarjeta-belen.png', import.meta.url), png);
console.log(`Created tarjeta-belen.png: 1200 × 630, ${Math.round(png.length / 1024)} KB`);
