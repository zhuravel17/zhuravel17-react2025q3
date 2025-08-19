'use server';

import { parse } from 'json2csv';
import { Character } from '../../types/character';
import { API_URL } from '../../consts/urlConst';
export async function generateCsv(selected: Character[]) {
  const rows = selected.map((item) => ({
    Name: item.name,
    Status: item.status,
    Location: item.location.name,
    URL: `${API_URL}/${item.id}`,
  }));

  const csv = parse(rows);

  return csv;
}
