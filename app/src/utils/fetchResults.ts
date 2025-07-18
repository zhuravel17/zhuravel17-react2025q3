import { Character } from '../types/character';

export function fetchCharacters(term: string): Promise<Character[]> {
  const query = term ? `?name=${term}` : '';
  const url = `https://rickandmortyapi.com/api/character${query}`;

  return fetch(url).then(async (res) => {
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return data.results || [];
  });
}
