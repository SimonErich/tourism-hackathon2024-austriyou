import { countries, Country } from '../mock/countries';

const geocodeApiKey = '6730648792fc5640106106mtq7a3b43';

export function getCountryByName(name: string): Country | undefined {
  return countries.find((country) => country.name === name);
}

export function getCountryByCode(code: string): Country | undefined {
  return countries.find((country) => country.code === code);
}
