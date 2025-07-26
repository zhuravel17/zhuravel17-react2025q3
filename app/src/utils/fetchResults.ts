import { Character } from '../types/character';

export default function fetchCharacters(
  term: string,
  page = 1
): Promise<{ results: Character[]; pages: number }> {
  const query = term ? `?name=${term}&page=${page}` : `?page=${page}`;
  const url = `https://rickandmortyapi.com/api/character${query}`;

  return fetch(url).then(async (res) => {
    if (res.status === 404) return { results: [], pages: 1 };
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return {
      results: data.results || [],
      pages: data.info?.pages || 1,
    };
  });
}
