// Node 22.18+: checks escaping and UTF-8 folding beyond the normal short names.
import assert from 'node:assert/strict';
import { createVCard } from '../src/lib/vcard.ts';
import { team } from '../src/data/site.ts';

const name = 'Áéíóú😀 '.repeat(24);
const person = {
  ...team[0],
  name,
  card: { ...team[0].card, familyName: 'Rial;Uno,Dos\\Tres\r\nCuatro' },
};
const vcard = createVCard(person);
assert.ok(vcard.split('\r\n').every(line => Buffer.byteLength(line) <= 75));
assert.ok(vcard.includes('\r\n '), 'Long properties must fold');
const unfolded = vcard.replaceAll('\r\n ', '');
assert.ok(unfolded.includes(`FN:${name}\r\n`), 'Folding must preserve Unicode');
assert.ok(unfolded.includes('N:Rial\\;Uno\\,Dos\\\\Tres\\nCuatro;'));
assert.ok(vcard.endsWith('END:VCARD\r\n'));
console.log('vCard escaping and UTF-8 line folding checks passed.');
