import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

// Run after npm run build. These checks also protect the existing Belén card.
const read = path => readFile(new URL(`../dist/${path}`, import.meta.url));
const partners = [
  { card: 'alfonso', name: 'Alfonso Mª Montero Sanz', surname: 'Montero Sanz', given: 'Alfonso Mª', slug: 'alfonso-montero-sanz', number: '91.247', phone: '+34605651720', email: 'a.monterosanz@lerucklegal.com' },
  { card: 'belen', name: 'Belén de Santa Olalla de la Puerta', surname: 'de Santa Olalla de la Puerta', given: 'Belén', slug: 'belen-de-santaolalla', number: '144.627', phone: '+34686805223', email: 'info@lerucklegal.com' },
  { card: 'juan', name: 'Juan José Blanco Rial', surname: 'Blanco Rial', given: 'Juan José', slug: 'juan-jose-blanco-rial', number: '3894', phone: '+34663214729', email: 'j.blancorial@lerucklegal.com' },
];
const sitemap = (await read('sitemap-0.xml')).toString();
for (const partner of partners) {
  const { card, name } = partner;
  const html = (await read(`${card}/index.html`)).toString();
  for (const [property, content] of Object.entries({
    'og:type': 'website', 'og:url': `https://www.lerucklegal.com/${card}`,
    'og:image': `https://www.lerucklegal.com/tarjeta-${card}.png`,
    'og:image:type': 'image/png', 'og:image:width': '1200', 'og:image:height': '630',
  })) assert.ok(html.includes(`property="${property}" content="${content}"`), `${card}: ${property}`);
  assert.ok(html.includes(name), `${card}: full name`);
  assert.ok(html.includes(partner.number), `${card}: registration`);
  assert.match(html, /property="og:image:alt" content="[^"]+"/);
  for (const href of [`/${card}.vcf`, `/tarjeta-${card}.png`, `/equipo/${partner.slug}`, `tel:${partner.phone}`, `mailto:${partner.email}`]) {
    assert.ok(html.includes(`href="${href}"`), `${card}: ${href}`);
  }
  assert.ok(html.includes(`https://wa.me/${partner.phone.slice(1)}?text=`), `${card}: individual WhatsApp`);
  assert.ok(html.includes(encodeURIComponent(`https://www.lerucklegal.com/${card}`)), `${card}: share its own URL`);
  const contact = html.match(/href="(https:\/\/wa\.me\/\d+\?text=[^"]+)"/);
  assert.ok(decodeURIComponent(contact[1]).includes(partner.given.split(' ')[0]), `${card}: WhatsApp contact names this partner`);
  assert.doesNotMatch(html, /noindex|localhost|placeholder\.svg/);
  for (const other of partners.filter(value => value.card !== card)) {
    assert.ok(!html.includes(`href="/${other.card}.vcf"`), `${card}: no other partner's contact download`);
  }
  if (card !== 'belen') {
    assert.ok(!html.includes('Contacto del despacho'), `${card}: label identifies direct contact`);
    const profile = (await read(`equipo/${partner.slug}/index.html`)).toString();
    assert.ok(profile.includes(`href="tel:${partner.phone}"`), `${card}: profile mobile`);
    assert.ok(profile.includes(`href="mailto:${partner.email}"`), `${card}: profile email link`);
    assert.ok(profile.includes(`>${partner.email}</a>`), `${card}: profile email visible`);
    assert.ok(profile.includes(`https://wa.me/${partner.phone.slice(1)}?text=`), `${card}: profile WhatsApp`);
  }
  const png = await read(`tarjeta-${card}.png`);
  const metadata = await sharp(png).metadata();
  assert.equal(metadata.format, 'png');
  assert.equal(metadata.width, 1200);
  assert.equal(metadata.height, 630);
  assert.ok(png.length < 300_000, `${card}: preview under 300 KB`);
  const stats = await sharp(png).extract({ left: 0, top: 0, width: 420, height: 630 }).stats();
  assert.ok(stats.channels.slice(0, 3).every(channel => channel.stdev > 20), `${card}: portrait rendered, not a blank panel`);
  const bytes = await read(`${card}.vcf`);
  const vcard = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  assert.ok(vcard.startsWith('BEGIN:VCARD\r\nVERSION:3.0\r\n'));
  assert.ok(vcard.endsWith('END:VCARD\r\n'));
  assert.doesNotMatch(vcard.replaceAll('\r\n', ''), /[\r\n]/, `${card}: CRLF line endings`);
  assert.ok(vcard.split('\r\n').every(line => Buffer.byteLength(line) <= 75), `${card}: folding within 75 octets`);
  const unfolded = vcard.replace(/\r\n[ \t]/g, '');
  for (const line of [`FN:${name}`, `N:${partner.surname};${partner.given};;;`, `TEL;TYPE=WORK,VOICE:${partner.phone}`, `EMAIL;TYPE=WORK:${partner.email}`, `URL:https://www.lerucklegal.com/${card}`]) {
    assert.ok(unfolded.includes(`${line}\r\n`), `${card}: vCard ${line}`);
  }
  assert.ok(sitemap.includes(`https://www.lerucklegal.com/${card}`), `${card}: sitemap`);
  console.log(`${name}: contact, share metadata, vCard and ${Math.round(png.length / 1024)} KB preview passed.`);
}
