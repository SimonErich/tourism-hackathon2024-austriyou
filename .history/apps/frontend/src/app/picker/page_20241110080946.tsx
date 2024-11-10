import { AxiosResponse } from 'axios';
import { mockActivities } from '../mock/activities';
import { CountryCode } from '../mock/countries';
import { apiClient } from '../utils/apiClient';
import { ActivitiesPicker } from './activities-picker';
import { ActivityCards, Card, CardStack } from './activity-card';

async function fetchData(countryCode: CountryCode) {
  const response: AxiosResponse = await apiClient.get(`/api/activities?countryCode=${countryCode}`);
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
  return <ActivitiesPicker activities={activities} />;
}
