import { site, type Lawyer } from '../data/site.ts';

const escape = (value: string) => value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n').replace(/[,;]/g, '\\$&');

// Fold by UTF-8 bytes without splitting a character; continuation spaces count too.
function fold(line: string): string {
  let result = '';
  let bytes = 0;
  for (const character of line) {
    const size = new TextEncoder().encode(character).length;
    if (bytes + size > 75) {
      result += '\r\n ';
      bytes = 1;
    }
    result += character;
    bytes += size;
  }
  return result;
}

export function createVCard(person: Lawyer): string {
  const profession = person.role === 'Socia' ? 'Abogada' : 'Abogado';
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escape(person.card.familyName)};${escape(person.card.givenName)};;;`,
    `FN:${escape(person.name)}`,
    `ORG:${escape(site.name)}`,
    `TITLE:${profession} - ${escape(person.role)}`,
    `TEL;TYPE=WORK,VOICE:${person.phoneHref ?? site.phoneHref}`,
    `EMAIL;TYPE=WORK:${escape(person.email ?? site.email)}`,
    `URL:${site.url}/${person.card.slug}`,
    'END:VCARD',
    '',
  ].map(fold).join('\r\n');
}
