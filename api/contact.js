import nodemailer from 'nodemailer';

const recipient = 'info@lerucklegal.com';
const maxBodyBytes = 32768;
const topics = ['Herencias y sucesiones', 'Donaciones', 'No residentes', 'Sociedades y fiscalidad', 'Inspecciones y recursos', 'Otra consulta'];

export default {
  async fetch(request) {
    const json = request.headers.get('accept')?.includes('application/json');
    let recovery = '';
    const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
    const respond = (status, message) => new Response(json
      ? JSON.stringify({ ok: status < 400, message })
      : `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contacto | Le Ruck Legal</title><body style="font:1.1rem/1.6 system-ui;max-width:42rem;margin:4rem auto;padding:1rem;color:#16233a"><h1>${status < 400 ? 'Consulta enviada' : 'No se ha completado el envío'}</h1><p>${message}</p>${status >= 400 && recovery ? `<label for="recover-message">Puedes copiar aquí los datos de tu consulta antes de volver al formulario:</label><textarea id="recover-message" readonly rows="12" style="width:100%;font:inherit">${escapeHtml(recovery)}</textarea>` : ''}<p><a href="/contacto/">Volver a contacto</a> · <a href="mailto:${recipient}">${recipient}</a></p></body></html>`, {
        status,
        headers: {
          'Content-Type': json ? 'application/json; charset=utf-8' : 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
          'X-Content-Type-Options': 'nosniff',
          ...(status === 405 ? { Allow: 'POST' } : {}),
        },
      });

    if (request.method !== 'POST') return respond(405, 'Utiliza el formulario de contacto para enviar tu consulta.');
    const origins = new Set(['https://www.lerucklegal.com', 'https://lerucklegal.com', 'https://lerucklegal.vercel.app']);
    if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
    if (process.env.NODE_ENV !== 'production') origins.add('http://localhost:3000');
    if (!origins.has(request.headers.get('origin'))) return respond(403, 'Envía la consulta desde el formulario de nuestra web.');

    const type = request.headers.get('content-type')?.split(';')[0].trim();
    if (!['application/json', 'application/x-www-form-urlencoded'].includes(type)) return respond(415, 'El formato del mensaje no es válido. No se admiten archivos adjuntos.');
    if (Number(request.headers.get('content-length')) > maxBodyBytes) return respond(413, 'La consulta es demasiado larga. Resume el motivo de contacto.');
    let data;
    try {
      const reader = request.body?.getReader();
      if (!reader) return respond(400, 'Completa los campos del formulario.');
      const chunks = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > maxBodyBytes) {
          await reader.cancel();
          return respond(413, 'La consulta es demasiado larga. Resume el motivo de contacto.');
        }
        chunks.push(value);
      }
      const raw = Buffer.concat(chunks).toString('utf8');
      data = type === 'application/json' ? JSON.parse(raw) : Object.fromEntries(new URLSearchParams(raw));
    } catch {
      return respond(400, 'No se ha podido leer la consulta. Revisa el formulario.');
    }
    const fields = ['name', 'email', 'phone', 'topic', 'message', 'privacy', 'website'];
    if (!data || typeof data !== 'object' || Array.isArray(data) || fields.some((field) => data[field] !== undefined && typeof data[field] !== 'string')) {
      return respond(400, 'Revisa los datos del formulario.');
    }
    const success = 'Hemos enviado tu consulta al despacho. Gracias por contactar.';
    // Campo trampa: los navegadores no lo muestran y los bots reciben una respuesta neutra.
    if (data.website?.trim()) return respond(200, success);
    recovery = `Nombre: ${data.name || ''}\nEmail: ${data.email || ''}\nTeléfono: ${data.phone || ''}\nMotivo: ${data.topic || ''}\n\n${data.message || ''}`;
    const name = (data.name || '').trim();
    const email = (data.email || '').trim();
    const phone = (data.phone || '').trim();
    const message = (data.message || '').trim();
    if (name.length < 2 || name.length > 100 || /[\r\n\x00]/.test(name)) return respond(400, 'Indica tu nombre, entre 2 y 100 caracteres.');
    if (email.length > 254 || !/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+$/i.test(email)) return respond(400, 'Indica un correo electrónico válido.');
    if (phone.length > 30 || (phone && !/^[+\d\s().-]+$/.test(phone))) return respond(400, 'Revisa el teléfono o deja el campo vacío.');
    if (!topics.includes(data.topic)) return respond(400, 'Selecciona un motivo de consulta.');
    if (message.length < 10 || message.length > 3000 || message.includes('\x00')) return respond(400, 'Resume tu consulta entre 10 y 3000 caracteres, sin documentación sensible.');
    if (data.privacy !== 'read') return respond(400, 'Debes confirmar que has leído la política de privacidad.');

    const user = process.env.CONTACT_SMTP_USER;
    const password = process.env.CONTACT_SMTP_PASSWORD;
    if (!user || !password) return respond(503, 'El formulario no está disponible en este momento. Puedes escribir a info@lerucklegal.com.');
    try {
      const transport = nodemailer.createTransport({
        host: 'smtp.hostinger.com', port: 465, secure: true,
        auth: { user, pass: password },
        connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000,
        disableFileAccess: true, disableUrlAccess: true,
      });
      const sent = await transport.sendMail({
        from: { name: 'Le Ruck Legal · Web', address: user },
        to: recipient,
        replyTo: { name, address: email },
        subject: `Consulta web: ${data.topic}`,
        text: `Nueva consulta desde www.lerucklegal.com\n\nNombre: ${name}\nEmail: ${email}\nTeléfono: ${phone || 'No indicado'}\nMotivo: ${data.topic}\n\n${message}\n\nInformación de privacidad: lectura confirmada al enviar el formulario.\nFecha UTC: ${new Date().toISOString()}`,
      });
      if (!sent.accepted?.includes(recipient)) throw new Error('Recipient not accepted');
      return respond(200, success);
    } catch {
      // No registrar mensajes, direcciones ni errores SMTP que puedan contener datos personales.
      console.error('Contact email delivery could not be confirmed');
      return respond(502, 'No hemos podido confirmar el envío. Conserva tu mensaje y escríbenos a info@lerucklegal.com o inténtalo más tarde.');
    }
  },
};
