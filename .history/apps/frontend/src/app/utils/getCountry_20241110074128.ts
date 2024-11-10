import { countries, Country } from '../mock/countries';

export function getCountryByName(name: string): Country | undefined {
  return countries.find((country) => country.name === name);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((country) => country.code === code);
}
