import { AxiosResponse } from 'axios';
import { CountryCode } from '../mock/countries';
import { apiClient } from '../utils/apiClient';
import { ActivitiesPicker } from './activities-picker';

async function fetchData(countryCode: CountryCode) {
  const response = await fetch(
    `http://localhost:3000/api/activity?countryCode=${countryCode}`
  );
  const json = await response.json();

  return { activities: json };
}

export default async function Picker({
  searchParams,
}: {
  searchParams: { country: CountryCode };
}) {
  const { activities } = await fetchData(searchParams.country);
  return <ActivitiesPicker activities={activities} />;
}
