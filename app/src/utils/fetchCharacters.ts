import { HttpStatus } from '../enums/httpStatus.enum';
import { Character } from '../types/character';
import { API_URL } from '../consts/urlConst';

export default function fetchCharacters(
  term: string,
  page = 1
): Promise<{ results: Character[]; pages: number }> {
  const url = new URL(API_URL);
  url.searchParams.set('page', page.toString());
  if (term) {
    url.searchParams.set('name', term);
  }

  return fetch(url).then(async (res) => {
    if (res.status === HttpStatus.NotFound) return { results: [], pages: 1 };
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const data = await res.json();
    return {
      results: data.results || [],
      pages: data.info?.pages || 1,
    };
  });
}
