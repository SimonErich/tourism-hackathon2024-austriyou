'use client';

import { useEffect, useState } from 'react';
import { countries, Country } from './mock/countries';
import Link from 'next/link';
import { Chamois } from './ui/chamois';
import { apiClient } from './utils/apiClient';
import axios, { AxiosResponse } from 'axios';
import { getCountryByName } from './utils/getCountry';

export default function Index() {
  const [userCountry, setUserCountry] = useState<Country | null>(null);

  useEffect(() => {
    void (async () => {
      if (window.localStorage.getItem('persona_id')) {
        const personaCountry = await fetchPersona(window.localStorage.getItem('persona_id'));

        if (personaCountry) {
          const country = getCountryByName(personaCountry);

          if (country) {
            setUserCountry(country);
          }
        }

      } else {
        navigator.geolocation.getCurrentPosition(async (position) => {
        // TODO: convert coords to country
          // const country = getCountryByLonLat(position.coords.longitude, position.coords.latitude);
          const country = getCountryByLonLat(47.5037696, 12.0651776);

          setUserCountry(country);
          await createPersonaToken(country);
        }, (err) => {
          console.log(err);
        });
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-screen text-center">
      <p className="text-5xl leading-tight text-grey">
        I see you are based in{' '}
        <span className="underline">{userCountry?.name}</span>.
        <br />
        Is this correct?
      </p>

      <Link href={`/picker?country=${userCountry?.code}`} className="button">
        Yes
      </Link>

      <p className="text-5xl leading-tight text-grey">No, I am from:</p>
      <select
        name="location-alternate"
        id=""
        className="input w-96 appearance-none"
        value={userCountry?.code}
        onChange={(e) => {
          const country = countries.find((c) => c.code === e.target.value);
          setUserCountry(country || null);
          createPersonaToken(country);
        }}
      >
        <option value="">Select country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <Chamois activities={[]} />
    </div>
  );
}


async function createPersonaToken(country: Country | undefined): Promise<string | null> {
  if (!country) {
    return null;
  }

  try {
    const data = { 'country': country.name };
    const response: AxiosResponse = await apiClient.post(`/api/persona`, data);
    const token = response.data.uuid;

    if (token) {
      window.localStorage.setItem(
        'persona_id',
        token
      );
    }

    return token;
  } catch (err) {
    console.log(err);
  }

  return null;
}

async function fetchPersona(token: string | null): Promise<string | undefined> {
  if (!token) {
    return;
  }

  try {
    const response: AxiosResponse = await apiClient.get(`/api/persona/${token}`);

    return response.data.country;
  } catch (err) {
    console.log(err);
  }
}

// TODO: remove if we don't need this
async function getCountryByIp(ipAddress: string): Promise<Country | null> {
  try {
    const response: AxiosResponse = await axios.get(`http://api.ipapi.com/${ipAddress}?access_key=9ee18aa9cfb3eef0017df023a40ca3a1`);

    return response.data.country;
  } catch (err) {
    console.log(err);
  }

  return null;
}


async function getCountryByLonLat(lat: number, lon: number): Promise<Country | null> {
  try {
    const response: AxiosResponse = await axios.get(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}&api_key=${geocodeApiKey}`);

    console.log('mikado', response.data);

    return response.data.country;
  } catch (err) {
    console.log(err);
  }

  return null;
}
