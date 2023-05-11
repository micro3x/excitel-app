import { customFetch } from './customFetch';

// const baseUrl = 'https://excitel-countries.azurewebsites.net';
const baseUrl = '/api';

export type Country = {
  capitalName: string;
  code: string;
  flag: string;
  latLng: number[];
  name: string;
  population: number;
  region: string;
  subregion: string;
};

export function getAllCountries(): Promise<Country[]> {
  return customFetch(`${baseUrl}/countries`);
}

export function searchCountries(searchTerm: string): Promise<Country[]> {
  return customFetch(`${baseUrl}/countries/${searchTerm}`);
}
