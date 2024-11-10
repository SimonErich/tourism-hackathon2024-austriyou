'use client';

import { useEffect, useState } from 'react';
import { countries, Country } from './mock/countries';
import Link from 'next/link';
import { Chamois } from './ui/chamois';

export default function Index() {
  const [userCountry, setUserCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (!window.localStorage.getItem('persona_id')) {
      window.localStorage.setItem(
        'persona_id',
        '96a100be-707b-4cd3-9544-6c966930d4d1'
      );
    }
    navigator.geolocation.getCurrentPosition((position) => {
      // TODO: convert coords to country
      setUserCountry({ name: 'Austria', code: 'AT' });
    });
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