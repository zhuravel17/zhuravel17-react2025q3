import fetchCharacters from './fetchCharacters';
import { HttpStatus } from '../enums/httpStatus.enum';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

it('returns empty result for 404', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: HttpStatus.NotFound,
  });

  const result = await fetchCharacters('unknown', 1);
  expect(result).toEqual({ results: [], pages: 1 });
});

it('throws error for other non-ok statuses', async () => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    status: 500,
  });

  await expect(fetchCharacters('rick', 1)).rejects.toThrow('Error 500');
});
