'use client';

import { useEffect, useState } from 'react';
import { countries, Country } from './mock/countries';
import Link from 'next/link';
import { Chamois } from './ui/chamois';
import { apiClient } from './utils/apiClient';
import { AxiosResponse } from 'axios';

export default function Index() {
  const [userCountry, setUserCountry] = useState<Country | null>(null);

  useEffect(() => {
    void (async () => {
      if (window.localStorage.getItem('persona_token')) {
        console.log('fdsafdfds');
        fetchPersona(window.localStorage.getItem('persona_token'));
      } else {
        console.log('22222');
        navigator.geolocation.getCurrentPosition(async (position) => {
          // TODO: convert coords to country
          const country = { name: 'Austria', code: 'AT' } as Country;

          setUserCountry(country);
          const token = await createPersonaToken(country);

          if (token) {
            window.localStorage.setItem(
              'persona_id',
              token
            );
          }
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

    return response.data.uuid;
  } catch (err) {
    console.log(err);
  }

  return null;
}

async function fetchPersona(token: string | null): Promise<void> {
  if (!token) {
    return;
  }

  try {
    const response: AxiosResponse = await apiClient.get(`/api/persona/${token}`);
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
