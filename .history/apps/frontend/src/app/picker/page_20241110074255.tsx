import { mockActivities } from '../mock/activities';
import { CountryCode } from '../mock/countries';
import { ActivitiesPicker } from './activities-picker';
import { ActivityCards, Card, CardStack } from './activity-card';

async function fetchData(countryCode: CountryCode) {
  const activities = mockActivities;
  // const foo = await fetch(
  //   `https://restcountries.com/v3.1/alpha/${countryCode}`
  // );
  return { activities };
}

export default async function Picker({
  searchParams,
}: {
  searchParams: { country: CountryCode };
  }) {
  console.log('mikado: ', searchParams);
  const { activities } = await fetchData(searchParams.country);
  return <ActivitiesPicker activities={activities} />;
}
