import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const files = await readdir('dist', { recursive: true });
const pages = files.filter((file) => file.endsWith('.html'));
assert.equal(pages.length, 19, 'Unexpected published pages');
for (const page of pages) {
  const html = await readFile(join('dist', page), 'utf8');
  assert(!/Versión (de|para) revisión|pendiente de validación|TODO:/i.test(html), `Unfinished page: ${page}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `One H1 required: ${page}`);
  assert.equal(/<meta name="robots" content="noindex,nofollow"\s*\/?\s*>/.test(html), page === '404.html', `Incorrect indexing: ${page}`);
  assert(html.includes('href="https://www.lerucklegal.com/'), `Missing canonical: ${page}`);
  assert(!/605\s*65\s*17\s*20|placeholder\.svg|mnprogramweb\.net/.test(html), `Obsolete content: ${page}`);
  for (const [, src] of html.matchAll(/<img\b[^>]*src="(\/[^"?]+)"/g)) {
    assert((await stat(join('dist', src))).size > 0, `Missing image ${src} on ${page}`);
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json);
}
const sitemap = await readFile('dist/sitemap-0.xml', 'utf8');
const contact = await readFile('dist/contacto/index.html', 'utf8');
assert(contact.includes('action="/api/contact"') && contact.includes('method="POST"'), 'Contact must submit to the server');
assert(contact.includes('name="privacy"') && contact.includes('name="website"'), 'Privacy acknowledgement and honeypot required');
assert(!contact.includes('type="file"'), 'No attachments on this form');
assert(!/inspeccion-hacienda-que-hacer|recurso-reposicion-o-reclamacion|404/.test(sitemap), 'Draft or error route in sitemap');
for (const slug of ['herencia-primeros-pasos', 'donacion-antes-de-donar', 'herencia-espana-no-residentes']) assert(sitemap.includes(slug));
const config = JSON.parse(await readFile('vercel.json', 'utf8'));
const previewRule = config.headers.find((rule) => rule.headers.some((header) => header.key === 'X-Robots-Tag'));
const previewHost = new RegExp(`^${previewRule.has[0].value}$`);
assert(previewHost.test('lerucklegal.vercel.app'));
assert(previewHost.test('lerucklegal-preview-inoguerols.vercel.app'));
assert(!previewHost.test('www.lerucklegal.com'));
assert.equal(previewRule.headers[0].value, 'noindex, nofollow');
console.log(`PASS: ${pages.length} pages, indexing, images, JSON-LD, sitemap and preview protection`);
