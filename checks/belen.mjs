import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Run after npm run build: node checks/belen.mjs
const html = await readFile(new URL('../dist/belen/index.html', import.meta.url), 'utf8');
for (const [property, content] of Object.entries({
  'og:type': 'website',
  'og:url': 'https://www.lerucklegal.com/belen',
  'og:image': 'https://www.lerucklegal.com/tarjeta-belen.png',
  'og:image:type': 'image/png',
  'og:image:width': '1200',
  'og:image:height': '630',
})) {
  assert.ok(html.includes(`property="${property}" content="${content}"`), property);
}
assert.match(html, /property="og:title" content="Belén de Santa Olalla/);
assert.match(html, /property="og:image:alt" content="[^"]+"/);
assert.match(html, /src="\/equipo\/belen-retrato.webp"/);
assert.ok((await readFile(new URL('../dist/equipo/belen-retrato.webp', import.meta.url))).length > 0);
assert.match(html, /href="\/belen\.vcf"/);
assert.match(html, /href="tel:\+34686805223"/);
assert.match(html, /href="mailto:info@lerucklegal\.com"/);
assert.match(html, /https:\/\/wa\.me\/34686805223\?text=/);
assert.ok(html.includes(encodeURIComponent('https://www.lerucklegal.com/belen')));
assert.doesNotMatch(html, /noindex|localhost/);
const png = await readFile(new URL('../dist/tarjeta-belen.png', import.meta.url));
assert.equal(png.subarray(1, 4).toString(), 'PNG');
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
assert.ok(png.length < 300_000, 'Keep the preview lightweight');
const photoStats = await sharp(png).extract({ left: 0, top: 0, width: 420, height: 630 }).stats();
assert.ok(photoStats.channels.slice(0, 3).every(channel => channel.stdev > 20), 'The portrait must render, not a blank panel');
const vcard = await readFile(new URL('../dist/belen.vcf', import.meta.url), 'utf8');
assert.ok(vcard.startsWith('BEGIN:VCARD\r\nVERSION:3.0\r\n'));
assert.ok(vcard.endsWith('END:VCARD\r\n'));
assert.ok(vcard.includes('FN:Belén de Santa Olalla de la Puerta\r\n'));
assert.ok(vcard.includes('TEL;TYPE=WORK,VOICE:+34686805223\r\n'));
assert.ok(vcard.includes('EMAIL;TYPE=WORK:info@lerucklegal.com\r\n'));
assert.ok(vcard.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
console.log(`Card, contact and Open Graph checks passed; preview ${Math.round(png.length / 1024)} KB.`);
