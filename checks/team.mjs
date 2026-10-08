import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Run after npm run build. Verify rendered pages rather than source templates.
const read = path => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const partners = [
  { slug: 'alfonso-montero-sanz', name: 'Alfonso Mª Montero Sanz', college: 'Madrid', number: '91.247', card: 'alfonso' },
  { slug: 'belen-de-santaolalla', name: 'Belén de Santa Olalla de la Puerta', college: 'Madrid', number: '144.627', card: 'belen' },
  { slug: 'juan-jose-blanco-rial', name: 'Juan José Blanco Rial', college: 'Pontevedra', number: '3894', card: 'juan' },
];
const sitemap = await read('sitemap-0.xml');
for (const page of ['index.html', 'equipo/index.html']) {
  const html = await read(page);
  let previous = -1;
  for (const partner of partners) {
    assert.ok(html.includes(partner.name), `${page}: ${partner.name}`);
    const position = html.indexOf(`href="/equipo/${partner.slug}"`);
    assert.ok(position > previous, `${page}: alphabetical profile links for all three partners`);
    previous = position;
  }
}
for (const partner of partners) {
  const html = await read(`equipo/${partner.slug}/index.html`);
  assert.ok(html.includes(partner.name), `${partner.slug}: name`);
  assert.ok(html.includes(partner.number), `${partner.slug}: registration number`);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap(match => { const value = JSON.parse(match[1]); return value['@graph'] ?? value; });
  const person = schemas.find(value => value.name === partner.name);
  assert.ok(person, `${partner.slug}: individual structured data`);
  assert.ok(person.memberOf.name.includes(partner.college), `${partner.slug}: individual college`);
  if (partner.card === 'juan') assert.ok(!person.knowsLanguage, 'Do not invent languages for Juan');
  assert.ok(html.includes(`href="/${partner.card}"`), `${partner.slug}: digital card is discoverable`);
  const portrait = html.match(/<img[^>]*src="(\/equipo\/[^\"]+)"/);
  assert.ok(portrait && !portrait[1].includes('placeholder'), `${partner.slug}: real portrait`);
  const metadata = await sharp(fileURLToPath(new URL(`../dist${portrait[1]}`, import.meta.url))).metadata();
  assert.ok(metadata.width >= 280 && metadata.height >= 350, `${partner.slug}: usable portrait resolution`);
  assert.ok(sitemap.includes(`https://www.lerucklegal.com/equipo/${partner.slug}`), `${partner.slug}: sitemap`);
}
const alfonso = await read('equipo/alfonso-montero-sanz/index.html');
assert.match(alfonso, /Formación/);
assert.match(alfonso, /Membresías|Asociaciones/);
const juan = await read('equipo/juan-jose-blanco-rial/index.html');
assert.match(juan, /UDIMA/);
assert.match(juan, /CEF/);
assert.doesNotMatch(juan, /Idiomas:/);
console.log('Team checks passed: listing order, three profiles, real portraits, individual colleges, formation and sitemap.');
