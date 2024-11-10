import { AxiosResponse } from 'axios';
import { CountryCode } from '../mock/countries';
import { apiClient } from '../utils/apiClient';
import { ActivitiesPicker } from './activities-picker';

async function fetchData(countryCode: CountryCode) {
  const response: AxiosResponse = await apiClient.get(`/api/activity?countryCode=${countryCode}`);
  const activities = response.data;

  console.log('mikado: ', activities);

  return { activities };
}

export default async function Picker({
  searchParams,
}: {
  searchParams: { country: CountryCode };
  }) {
  const { activities } = await fetchData(searchParams.country);
  console.log('mikado 222: ', activities);
  return <ActivitiesPicker activities={activities} />;
}
