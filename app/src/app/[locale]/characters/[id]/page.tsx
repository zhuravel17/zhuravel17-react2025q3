import { notFound } from 'next/navigation';
import CharacterDetails from '../../../../components/CharacterDetails/CharacterDetails';

async function getCharacter(id: string) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Failed to fetch character: ${res.status}`);
  }
  return res.json();
}

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const character = await getCharacter(params.id);

  if (!character) {
    notFound();
  }

  return <CharacterDetails character={character} />;
}
