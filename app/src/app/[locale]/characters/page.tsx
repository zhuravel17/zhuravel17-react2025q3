import { ReactElement } from 'react';
import CharactersClient from './CharactersClient';
import { Character } from '../../../types/character';

interface APIResponse {
  info: { pages: number };
  results: Character[];
}

async function getCharacters(page: number, name: string): Promise<APIResponse> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${name}`,
    { cache: 'no-store' }
  );
  if (!res.ok) throw new Error('Failed to fetch characters');
  return res.json();
}

async function getCharacterById(id: string): Promise<Character | null> {
  if (!id) return null;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

interface Props {
  searchParams: { page?: string; name?: string; id?: string };
}

export default async function Page({
  searchParams,
}: Props): Promise<ReactElement> {
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const name = sp.name || '';
  const id = sp.id || '';

  const charactersData = await getCharacters(page, name);
  const selectedCharacter = id ? await getCharacterById(id) : null;

  return (
    <CharactersClient
      initialData={charactersData}
      initialPage={page}
      initialName={name}
      selectedCharacter={selectedCharacter}
    />
  );
}
