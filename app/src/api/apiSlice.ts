import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../consts/urlConst';
import { Character } from '../types/character';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Characters'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      { results: Character[]; info: { pages: number } },
      { name?: string; page: number }
    >({
      query: ({ name, page }) => {
        const params = new URLSearchParams();
        params.append('page', String(page));
        if (name) params.append('name', name);
        return `?${params.toString()}`;
      },
      providesTags: (result, _error, _arg) =>
        result
          ? [
              ...result.results.map(({ id }) => ({
                type: 'Characters' as const,
                id,
              })),
              { type: 'Characters', id: 'LIST' },
            ]
          : [{ type: 'Characters', id: 'LIST' }],
    }),
    getCharacterById: builder.query<Character, number>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Characters', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = apiSlice;
