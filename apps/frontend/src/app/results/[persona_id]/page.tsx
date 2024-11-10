import React from 'react';
import { mockActivities } from '../../mock/activities';
import { SmallCard } from '../../picker/activities-picker';
import { Chamois } from '../../ui/chamois';

async function fetchData(persona_id: string) {
  // TODO: fetch data from backend
  return {
    // likes: [mockActivities[0], mockActivities[3], mockActivities[7]],
    likes: mockActivities,
  };
}

export default async function Results({
  params,
}: {
  params: { persona_id: string };
}) {
  const { persona_id } = params;
  const { likes } = await fetchData(persona_id);
  return (
    <div className="w-[60vw] p-8">
      <h2 className="text-3xl leading-loose text-grey">Your results</h2>
      <ul className="grid grid-cols-6 gap-1">
        {likes.map((activity) => (
          <SmallCard key={activity.id} activity={activity} />
        ))}
      </ul>

      <Chamois activities={likes} />
    </div>
  );
}
