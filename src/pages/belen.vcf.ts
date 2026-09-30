import { site, team } from '../data/site';

export function GET() {
  const belen = team.find(person => person.slug === 'belen-de-santaolalla')!;
  const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/[,;]/g, '\\$&');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:de Santa Olalla de la Puerta;Belén;;;',
    `FN:${escape(belen.name)}`,
    `ORG:${escape(site.name)}`,
    'TITLE:Abogada - Socia',
    `TEL;TYPE=WORK,VOICE:${site.phoneHref}`,
    `EMAIL;TYPE=WORK:${escape(belen.email ?? site.email)}`,
    `URL:${site.url}/belen`,
    'END:VCARD',
    '',
  ];
  return new Response(lines.join('\r\n'), {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
}
