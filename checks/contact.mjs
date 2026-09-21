import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import handler from '../api/contact.js';

const originalTransport = nodemailer.createTransport;
const originalError = console.error;
const originalUser = process.env.CONTACT_SMTP_USER;
const originalPassword = process.env.CONTACT_SMTP_PASSWORD;
process.env.CONTACT_SMTP_USER = 'contact@lerucklegal.com';
process.env.CONTACT_SMTP_PASSWORD = 'test-value-not-a-credential';
const sent = [];
let failure = false;
let accepted = true;
nodemailer.createTransport = (options) => {
  assert.equal(options.host, 'smtp.hostinger.com');
  assert.equal(options.port, 465);
  assert.equal(options.secure, true);
  assert.equal(options.disableFileAccess, true);
  assert.equal(options.disableUrlAccess, true);
  return { sendMail: async (message) => {
    if (failure) throw new Error('SMTP unavailable');
    sent.push(message);
    return { accepted: accepted ? ['info@lerucklegal.com'] : [] };
  } };
};
console.error = (message) => assert.equal(message, 'Contact email delivery could not be confirmed');
const valid = { name: 'Prueba técnica', email: 'prueba@example.com', phone: '', topic: 'Herencias y sucesiones', message: 'Consulta de prueba sin datos personales.', privacy: 'read', website: '' };
const request = (data, extra = {}) => new Request('https://www.lerucklegal.com/api/contact', {
  method: 'POST',
  headers: { origin: 'https://www.lerucklegal.com', 'content-type': 'application/json', accept: 'application/json' },
  body: JSON.stringify(data),
  ...extra,
});
try {
  assert.equal((await handler.fetch(new Request('https://www.lerucklegal.com/api/contact'))).status, 405);
  assert.equal((await handler.fetch(request(valid, { headers: { origin: 'https://attacker.invalid', 'content-type': 'application/json' } }))).status, 403);
  assert.equal((await handler.fetch(request(valid, { headers: { 'content-type': 'application/json' } }))).status, 403);
  assert.equal((await handler.fetch(request(valid, { headers: { origin: 'https://www.lerucklegal.com', 'content-type': 'text/plain' } }))).status, 415);
  assert.equal((await handler.fetch(request(valid, { body: '{' }))).status, 400);
  for (const invalid of [null, [], { ...valid, email: ['a@example.com'] }, { ...valid, name: 'A' }, { ...valid, name: 'A'.repeat(101) }, { ...valid, email: 'a@example.com\r\nBcc: attacker@example.com' }, { ...valid, email: 'a@example.com,b@example.com' }, { ...valid, phone: 'text' }, { ...valid, topic: 'invalid' }, { ...valid, message: 'short' }, { ...valid, message: 'x'.repeat(3001) }, { ...valid, privacy: '' }]) {
    assert.equal((await handler.fetch(request(invalid))).status, 400);
  }
  assert.equal((await handler.fetch(request({ ...valid, message: 'x'.repeat(33000) }))).status, 413);
  assert.equal((await handler.fetch(request({ ...valid, website: 'https://bot.invalid' }))).status, 200);
  assert.equal(sent.length, 0, 'Invalid submissions and bots must not send email');
  const result = await handler.fetch(request({ ...valid, to: 'attacker@example.com', bcc: 'attacker@example.com' }));
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('cache-control'), 'no-store');
  assert.equal(result.headers.get('x-robots-tag'), 'noindex, nofollow');
  assert.equal((await result.json()).ok, true);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'info@lerucklegal.com');
  assert.equal(sent[0].from.address, 'contact@lerucklegal.com');
  assert.equal(sent[0].replyTo.address, valid.email);
  assert.equal(sent[0].bcc, undefined);
  assert.equal(sent[0].html, undefined);
  const native = await handler.fetch(request(valid, {
    headers: { origin: 'https://www.lerucklegal.com', 'content-type': 'application/x-www-form-urlencoded', accept: 'text/html' },
    body: new URLSearchParams(valid),
  }));
  assert.equal(native.status, 200);
  assert((await native.text()).includes('Consulta enviada'));
  const unicode = await handler.fetch(request(valid, {
    headers: { origin: 'https://www.lerucklegal.com', 'content-type': 'application/x-www-form-urlencoded', accept: 'text/html' },
    body: new URLSearchParams({ ...valid, message: '漢'.repeat(3000) }),
  }));
  assert.equal(unicode.status, 200, 'Native encoding must support the allowed message length');
  failure = true;
  assert.equal((await handler.fetch(request(valid))).status, 502);
  const nativeError = await handler.fetch(request(valid, {
    headers: { origin: 'https://www.lerucklegal.com', 'content-type': 'application/x-www-form-urlencoded', accept: 'text/html' },
    body: new URLSearchParams({ ...valid, message: 'Consulta </textarea><script>alert(1)</script>' }),
  }));
  assert.equal(nativeError.status, 502);
  const recovery = await nativeError.text();
  assert(recovery.includes('id="recover-message"') && recovery.includes('&lt;/textarea&gt;'));
  assert(!recovery.includes('<script>'), 'Escaped recovery must not allow HTML injection');
  failure = false;
  accepted = false;
  assert.equal((await handler.fetch(request(valid))).status, 502, 'Rejected recipients are not success');
  delete process.env.CONTACT_SMTP_PASSWORD;
  assert.equal((await handler.fetch(request(valid))).status, 503, 'Missing credentials must fail honestly');
  console.log('PASS: contact validation, body limits, origin, honeypot, fixed recipient, native form and SMTP errors (no email sent)');
} finally {
  nodemailer.createTransport = originalTransport;
  console.error = originalError;
  if (originalUser === undefined) delete process.env.CONTACT_SMTP_USER; else process.env.CONTACT_SMTP_USER = originalUser;
  if (originalPassword === undefined) delete process.env.CONTACT_SMTP_PASSWORD; else process.env.CONTACT_SMTP_PASSWORD = originalPassword;
}
