// Regenerate all three cards: node scripts/render-belen-card.mjs (Node 22.18+).
// Retains the original command and the existing SVG/sharp artwork design.
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { site, team } from '../src/data/site.ts';

const logo = await readFile(new URL('../public/logo-monograma-navy.png', import.meta.url));
const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]);
const portraitCrops = {
  alfonso: { left: 160, top: 130, width: 1100, height: 1466 },
  juan: { left: 200, top: 430, width: 960, height: 1280 },
};

for (const person of team) {
  const { card } = person;
  const source = sharp(await readFile(new URL(`../public${person.photo}`, import.meta.url)));
  const portrait = await (portraitCrops[card.slug] ? source.extract(portraitCrops[card.slug]) : source).png().toBuffer();
  const profession = person.role === 'Socia' ? 'ABOGADA' : 'ABOGADO';
  const nameLines = card.artworkNameLines;
  const nameMarkup = nameLines.map((line, index) => {
    const y = nameLines.length === 3 ? 250 + index * 72 : 278 + index * 78;
    const size = nameLines.length === 3 && index === 2 ? 49 : 61;
    return `<text x="810" y="${y}" font-size="${size}">${escape(line)}</text>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f7f6f1"/>
    <image href="data:image/png;base64,${portrait.toString('base64')}" x="0" y="0" width="420" height="630" preserveAspectRatio="xMidYMid slice"/>
    <rect x="420" width="8" height="630" fill="#afb49e"/>
    <image href="data:image/png;base64,${logo.toString('base64')}" x="636" y="52" width="23" height="46"/>
    <text x="680" y="84" fill="#16233a" font-family="Georgia,serif" font-size="24" letter-spacing="3">${escape(site.name.toUpperCase())}</text>
    <text x="810" y="161" text-anchor="middle" fill="#646a4d" font-family="Arial,sans-serif" font-size="17" letter-spacing="4">${profession} · ${escape(person.role.toUpperCase())}</text>
    <g text-anchor="middle" fill="#16233a" font-family="Georgia,serif">${nameMarkup}</g>
    <path d="M760 425h100" stroke="#878e6b" stroke-width="2"/>
    <g text-anchor="middle" fill="#16233a" font-family="Arial,sans-serif">
      <text x="810" y="470" font-size="25">${escape(card.artworkSpecialty)}</text>
      <text x="810" y="517" font-size="21" fill="#646a4d">${escape(new URL(site.url).hostname)}/${card.slug}</text>
      <text x="810" y="549" font-size="16" fill="#646a4d">${escape(person.colegiado)}</text>
      <text x="810" y="581" font-size="21">${escape(site.phone)}   ·   ${escape(person.email ?? site.email)}</text>
    </g>
  </svg>`;
  const png = await sharp(Buffer.from(svg)).png({ palette: true, colours: 256 }).toBuffer();
  await writeFile(new URL(`../public/tarjeta-${card.slug}.png`, import.meta.url), png);
  console.log(`Created tarjeta-${card.slug}.png: 1200 × 630, ${Math.round(png.length / 1024)} KB`);
}
