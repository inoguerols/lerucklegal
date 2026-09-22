import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout } from 'node:timers/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.BASE_URL || 'http://127.0.0.1:4321';
const guides = ['herencia-primeros-pasos', 'donacion-antes-de-donar', 'herencia-espana-no-residentes'];
const server = process.env.BASE_URL ? null : spawn(process.execPath,
  ['node_modules/astro/bin/astro.mjs', 'preview', '--host', '127.0.0.1'], { stdio: 'ignore' });
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 40; attempt++) {
    try { ready = (await fetch(base)).ok; } catch {}
    if (ready) break;
    await setTimeout(250);
  }
  assert(ready, 'Preview did not start');
  browser = await chromium.launch({ channel: 'chrome' });
  const errors = [];
  const externalRequests = [];
  let mockingContact = false;
  const page = await browser.newPage();
  await page.addInitScript(() => localStorage.setItem('lrl-cookie-consent', 'accept'));
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('request', (request) => {
    if (new URL(request.url()).origin !== new URL(base).origin) externalRequests.push(request.url());
  });
  page.on('response', (response) => {
    if (response.status() >= 400 && !(mockingContact && response.url().endsWith('/api/contact'))) errors.push(`${response.status()} ${response.url()}`);
  });
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ['/', '/equipo/', '/equipo/belen-de-santaolalla/', '/equipo/juan-jose-blanco-rial/', '/contacto/', '/despacho/', '/actualidad/', '/areas/', '/areas/planificacion-fiscal/', '/aviso-legal/', '/privacidad/', '/cookies/', ...guides.map((slug) => `/actualidad/${slug}/`)]) {
      const response = await page.goto(base + route);
      assert(response.ok(), route);
      await page.evaluate(() => document.fonts.ready);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Overflow: ${width} ${route}`);
      assert.equal(await page.locator('meta[name="robots"]').count(), 0, 'Published pages must be indexable');
      const noindexHeader = (await response.allHeaders())['x-robots-tag'] || '';
      assert.equal(noindexHeader.includes('noindex'), new URL(base).hostname.endsWith('.vercel.app'), 'Only preview hosts must be excluded');
      assert(!/Versión (de|para) revisión|pendiente de validación/i.test(await page.locator('body').innerText()), 'No review notices in production');
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://www.lerucklegal.com${route}`);
      assert(!(await page.locator('main').innerText()).includes('TODO'), `Unfinished content: ${route}`);
      if (width < 768) {
        assert(await page.locator('.mobile-flat-list > *, .mobile-plain-panel').evaluateAll((elements) => elements.every((element) => {
          const style = getComputedStyle(element);
          return style.borderRadius === '0px' && style.borderLeftWidth === '0px' && style.backgroundColor === 'rgba(0, 0, 0, 0)';
        })), `Avoid boxed mobile content: ${route}`);
      }
      assert.equal(await page.locator('img[src*="placeholder"]').count(), 0, `No placeholder portraits: ${route}`);
      assert.equal(await page.locator('a[href*="mnprogram"], a[href*="nmprogram"]').count(), 0, 'MN Program is outside the launch scope');
      assert(!/Acceso clientes|Acceder al portal de clientes/.test(await page.content()), `Unexpected client portal: ${route}`);
      const phones = await page.locator('a[href^="tel:"]').evaluateAll((links) => links.map((link) => link.href));
      assert(phones.length > 0 && phones.every((href) => href === 'tel:+34686805223'), `Incorrect phone link: ${route}`);
      const whatsappLinks = await page.locator('a[href*="wa.me"]').evaluateAll((links) => links.map((link) => link.href));
      assert(whatsappLinks.length > 0 && whatsappLinks.every((href) => new URL(href).pathname === '/34686805223'), `Incorrect WhatsApp: ${route}`);
      assert((await page.locator('footer').innerText()).includes('9:00–19:00'), `Incorrect hours: ${route}`);
      assert(!/605\s*65\s*17\s*20/.test(await page.content()), `Incorrect phone: ${route}`);
      const business = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent)).find((schema) => schema['@type'] === 'LegalService'));
      assert.equal(business.telephone, '+34 686 80 52 23');
      assert.equal(business.address.streetAddress, 'Avda. Pablo VI, nº 7, portal 4, 3º Izq.');
      assert.equal(business.address.postalCode, '28224');
      assert.equal(business.address.addressLocality, 'Pozuelo de Alarcón');
      assert.equal(await page.locator('#cookie-banner').count(), 0);
      assert.equal(await page.evaluate(() => localStorage.getItem('lrl-cookie-consent')), null, 'Remove legacy consent');
      assert.deepEqual(await page.context().cookies(), [], 'No cookies in the current site');
      await page.locator('footer').scrollIntoViewIfNeeded();
      await page.locator('img').evaluateAll((images) => Promise.all(images.map(async (img) => {
        img.loading = 'eager';
        await img.decode().catch(() => {});
      })));
      const broken = await page.locator('img').evaluateAll((images) => images.filter((img) => !img.complete || !img.naturalWidth).map((img) => img.src));
      assert.deepEqual(broken, [], `Broken images: ${route}`);
      if (process.env.SCREENSHOT_DIR && [375, 1440].includes(width) && ['/contacto/', '/despacho/', '/areas/', '/areas/planificacion-fiscal/', '/equipo/', '/equipo/belen-de-santaolalla/', '/actualidad/', '/actualidad/herencia-primeros-pasos/'].includes(route)) {
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/leruck-${route.split('/').filter(Boolean).join('-')}-${width}.png`, fullPage: true });
      }
    }
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    assert((await page.locator('#hero-title').innerText()).includes('Herencias, patrimonio'));
    assert((await page.locator('.hero-copy').innerText()).includes('donaciones'));
    assert.equal(await page.locator('.hero-message').evaluate((el) => getComputedStyle(el).backgroundColor), 'rgb(175, 180, 158)');
    assert.equal(await page.locator('.hero-copy').evaluate((el) => getComputedStyle(el).color), 'rgb(22, 35, 58)');
    assert.equal(await page.locator('.hero-copy .site-button').evaluate((el) => getComputedStyle(el).backgroundColor), 'rgb(22, 35, 58)');
    assert.equal(await page.locator('.hero-copy .site-button').evaluate((el) => getComputedStyle(el).color), 'rgb(255, 255, 255)');
    const mobileWhatsApp = page.locator('header a[aria-label="Contactar por WhatsApp"]');
    const floatingWhatsApp = page.locator('body > a[aria-label="Contactar por WhatsApp"]');
    assert.equal(await mobileWhatsApp.isVisible(), width < 768);
    assert.equal(await floatingWhatsApp.isVisible(), width >= 768);
    if (width < 768) {
      assert((await mobileWhatsApp.boundingBox()).height >= 44, 'Mobile WhatsApp must have a usable touch target');
      assert(await page.locator('.practice-tile').evaluateAll((tiles) => tiles.every((tile) => tile.getBoundingClientRect().height < 285)), 'Keep mobile practice areas compact');
      assert(await page.locator('.practice-tile').evaluateAll((tiles) => tiles.every((tile) => {
        const overlay = getComputedStyle(tile, '::after');
        const photo = tile.querySelector('img').getBoundingClientRect();
        const text = tile.querySelector('.practice-copy').getBoundingClientRect();
        return overlay.content === 'none' && overlay.backgroundImage === 'none' && text.right <= photo.left;
      })), 'Mobile services must separate text and images without gradient overlays');
    } else {
      assert(await page.locator('.practice-tile').first().evaluate((tile) => getComputedStyle(tile, '::after').backgroundImage.includes('linear-gradient')), 'Preserve the desktop service presentation');
    }
    assert.equal(await page.locator('.hero-portrait img').getAttribute('src'), '/equipo/belen-despacho.webp');
    assert.equal(await page.locator('.hero-portrait img').evaluate((el) => getComputedStyle(el).filter), 'grayscale(1) contrast(0.96)');
    assert.equal(await page.locator('.news-grid article').count(), 3);
    for (const slug of guides) assert(await page.locator(`.news-grid a[href="/actualidad/${slug}"]`).first().isVisible());
    const photos = await page.locator('.hero-portrait > img, .practice-tile > img').evaluateAll((images) => images.map((img) => img.src));
    assert.equal(new Set(photos).size, photos.length, 'Do not repeat stock photos between hero and practice areas');
    if (width < 1280) {
      await page.getByRole('button', { name: 'Abrir menú' }).click();
      assert(await page.getByRole('navigation', { name: 'Principal móvil' }).isVisible());
      await page.getByRole('button', { name: 'Cerrar menú' }).click();
    }
    await page.locator('summary').first().click();
    assert.equal(await page.locator('details').first().getAttribute('open'), '');
    await page.locator('summary').first().click();
    await page.evaluate(() => scrollTo(0, 0));
    if (process.env.SCREENSHOT_DIR) await page.screenshot({ path: `${process.env.SCREENSHOT_DIR}/leruck-${width}.png`, fullPage: true });
    console.log(`PASS: ${width}px, 15 routes, portraits, guides, menu, contact, canonical and no cookies`);
  }
  const links = await page.locator('a[href^="/"]').evaluateAll((anchors) => [...new Set(anchors.map((a) => a.getAttribute('href')))]);
  for (const link of links) assert((await page.request.get(base + link)).ok(), `Broken link: ${link}`);
  assert.equal(await page.locator('.practice-tile h3').first().textContent(), 'Área fiscal');
  await page.goto(base + '/areas/');
  assert.equal(await page.locator('main h2').first().textContent(), 'Área fiscal');
  await page.goto(base + '/areas/planificacion-fiscal/');
  assert.equal(await page.locator('h1').textContent(), 'Área fiscal');
  for (const slug of guides) assert(await page.locator(`main a[href="/actualidad/${slug}"]`).isVisible());
  const services = await page.locator('main ul li').allTextContents();
  assert.equal(services.length, 6);
  for (const [i, expected] of ['sucesiones y donaciones', 'obligaciones fiscales', 'no residentes', 'escrituras públicas', 'registro ante los organismos públicos', 'Constitución de sociedades mercantiles'].entries()) {
    assert(services[i].includes(expected), `Missing fiscal service: ${expected}`);
  }
  await page.goto(base + '/equipo/belen-de-santaolalla/');
  const bio = await page.locator('main').innerText();
  for (const expected of ['Belén de Santa Olalla de la Puerta', 'Socia / Abogada especialista', '144.627', 'Universidad de Granada', 'Práctica de la Abogacía por CEF', 'Pons-Novit Legal', 'Español e inglés', 'patrimonios privados']) assert(bio.includes(expected), `Missing biography detail: ${expected}`);
  assert(!bio.includes('TODO:'), 'Confirmed biography must not contain placeholder copy');
  assert.equal(await page.locator('main img').getAttribute('src'), '/equipo/belen-retrato.webp');
  for (const slug of guides) {
    await page.goto(`${base}/actualidad/${slug}/`);
    const body = await page.locator('main').innerText();
    assert(!body.includes('Borrador pendiente') && !body.includes('En La Hermida'), 'Use supplied copy and the public brand');
    assert(await page.locator('main a[href="/areas/planificacion-fiscal"]').isVisible());
    const article = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent)).find((schema) => schema['@type'] === 'Article'));
    assert.equal(article.author['@type'], 'Organization');
    assert.equal(article.author.name, 'Le Ruck Legal');
    assert.equal(await page.locator('main h3').count(), slug === 'herencia-espana-no-residentes' ? 6 : 5);
    assert.equal(await page.locator('section[aria-labelledby="related-title"] a').count(), 2);
  }
  for (const slug of ['inspeccion-hacienda-que-hacer', 'recurso-reposicion-o-reclamacion']) {
    assert.equal((await page.request.get(`${base}/actualidad/${slug}/`)).status(), 404, 'Unapproved draft should not be published');
  }
  await page.goto(base + '/equipo/juan-jose-blanco-rial/');
  const juan = await page.locator('main').innerText();
  for (const expected of ['Juan José Blanco Rial', '3894', 'ICAPo', 'procedimiento tributario', 'activos financieros']) assert(juan.includes(expected), `Missing Juan detail: ${expected}`);
  assert(!juan.includes('TODO:'), 'Juan must replace the placeholder lawyer');
  assert.equal(await page.locator('main img').count(), 0, 'Juan must not have a placeholder or an empty portrait');
  const person = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.map((script) => JSON.parse(script.textContent)).find((schema) => schema['@type'] === 'Person'));
  assert.equal(person.memberOf.name, 'Ilustre Colegio de Abogados de Pontevedra');
  await page.goto(base + '/contacto/');
  assert.equal(await page.locator('form[action="/api/contact"][method="POST"]').count(), 1);
  assert(await page.locator('main a[href="mailto:info@lerucklegal.com"]').isVisible());
  assert.equal(await page.locator('input[type="file"]').count(), 0);
  assert.equal(await page.locator('#contact-privacy').isChecked(), false);
  mockingContact = true;
  let formStatus = 502;
  let submissions = 0;
  await page.route('**/api/contact', async (route) => {
    submissions++;
    assert(await page.locator('#contact-message').isDisabled(), 'Do not allow edits that would be lost during submission');
    const body = route.request().postDataJSON();
    assert.equal(body.email, 'prueba@example.com');
    assert.equal(body.privacy, 'read');
    assert.equal(body.website, '');
    await route.fulfill({ status: formStatus, contentType: 'application/json', body: JSON.stringify({ ok: formStatus === 200, message: formStatus === 200 ? 'Consulta enviada.' : 'No se ha podido confirmar el envío.' }) });
  });
  await page.locator('#contact-name').fill('Prueba de interfaz');
  await page.locator('#contact-email').fill('prueba@example.com');
  await page.locator('#contact-topic').selectOption('Herencias y sucesiones');
  await page.locator('#contact-message').fill('Prueba automatizada que no debe enviar correos.');
  await page.locator('#contact-privacy').check();
  await page.getByRole('button', { name: 'Enviar consulta', exact: true }).click();
  await page.locator('#contact-status[data-state="error"]').waitFor();
  assert((await page.locator('#contact-message').inputValue()).includes('Prueba automatizada'));
  formStatus = 429;
  await page.getByRole('button', { name: 'Enviar consulta', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('#contact-status').textContent.includes('Espera un minuto'));
  formStatus = 200;
  await page.getByRole('button', { name: 'Enviar consulta', exact: true }).click();
  await page.locator('#contact-status[data-state="success"]').waitFor();
  assert.equal(await page.locator('#contact-message').inputValue(), '');
  assert.equal(submissions, 3, 'One request per submit');
  await page.unroute('**/api/contact');
  mockingContact = false;
  for (const [route, headingCount] of [['/aviso-legal/', 11], ['/privacidad/', 13], ['/cookies/', 6]]) {
    await page.goto(base + route);
    const legal = await page.locator('main').innerText();
    assert(legal.includes('LA HERMIDA ESTUDIO JURIDICO SLP'), `Incorrect legal entity: ${route}`);
    if (route !== '/cookies/') assert(legal.includes('B26914176'), `Missing confirmed CIF: ${route}`);
    assert(legal.includes('portal 4, 3º Izq.') && legal.includes('28224') && legal.includes('Pozuelo de Alarcón'), `Missing confirmed registered address: ${route}`);
    assert.equal(await page.locator('main h2').count(), headingCount, `Missing legal sections: ${route}`);
    assert(!legal.includes('TODO'), `Legal placeholder: ${route}`);
  }
  await page.goto(base + '/aviso-legal/');
  for (const partner of ['Juan José Blanco Rial', 'Belén de Santa Olalla de la Puerta', 'Alfonso Mª Montero Sanz']) assert((await page.locator('main').innerText()).includes(partner));
  await page.goto(base + '/equipo/');
  assert.equal(await page.locator('main a[href^="/equipo/"]').count(), 2, 'Do not invent an Alfonso profile');
  assert.equal(await page.locator('main img').count(), 1, 'Only Belen has a portrait');
  assert((await page.locator('section[aria-labelledby="partners-title"]').innerText()).includes('Juan José Blanco Rial'));
  assert((await page.locator('section[aria-labelledby="partners-title"]').innerText()).includes('Alfonso Mª Montero Sanz'));
  assert((await page.locator('#featured-name').boundingBox()).y < (await page.locator('#partners-title').boundingBox()).y, 'Belen is featured above the other partners');
  assert.deepEqual(externalRequests, [], 'No automatically loaded third-party services');
  assert.deepEqual(errors, [], 'Browser errors');
  const nojs = await browser.newPage({ javaScriptEnabled: false, reducedMotion: 'reduce' });
  await nojs.goto(base);
  assert.equal(await nojs.locator('h1').evaluate((el) => getComputedStyle(el).opacity), '1');
  assert.equal(await nojs.locator('main').innerText().then((text) => /\+500|24\/7|\+15/.test(text)), false);
  await nojs.goto(base + '/equipo/');
  assert(await nojs.locator('[data-reveal]').evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === '1')));
  const missing = await page.request.get(`${base}/pagina-inexistente/`);
  assert.equal(missing.status(), 404);
  assert((await missing.text()).includes('noindex,nofollow'));
  if (process.env.BASE_URL) {
    for (const [oldPath, currentPath] of [['/index.html', '/'], ['/despacho.html', '/despacho/'], ['/practica.html', '/areas/'], ['/contacto.html', '/contacto/'], ['/acceso-clientes.html', '/contacto/']]) {
      const redirect = await page.request.get(base + oldPath, { maxRedirects: 0 });
      assert.equal(redirect.status(), 308, `Legacy redirect: ${oldPath}`);
      assert.equal(new URL(redirect.headers().location, base).pathname, currentPath);
    }
  }
  console.log('PASS: internal links, contact, indexing, legacy redirects and content without JavaScript');
} finally {
  await browser?.close();
  server?.kill();
}
