import { team } from '../data/site';
import { createVCard } from '../lib/vcard';

export function GET() {
  const person = team.find(person => person.card.slug === 'juan')!;
  return new Response(createVCard(person), {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
}
