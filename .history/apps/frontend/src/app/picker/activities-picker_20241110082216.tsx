'use client';

import { useState } from 'react';
import { Activity } from '../mock/activities';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Chamois } from '../ui/chamois';

interface ActivitiesPickerProps {
  activities: Activity[];
}

export const ActivitiesPicker = ({ activities }: ActivitiesPickerProps) => {
  const router = useRouter();

  const [currentActivity, setCurrentActivity] = useState<Activity | null>(
    activities[0]
  );

  const [likedActivities, setLikedActivities] = useState<Activity[]>([]);

  function handleNextActivity() {
    if (!currentActivity) return;
    const currentActivityIndex = activities.indexOf(currentActivity);
    if (currentActivityIndex === activities.length - 1) {
      router.push(`/results/${window.localStorage.getItem('persona_id')}`);
      return;
    }

    setCurrentActivity(activities[currentActivityIndex + 1]);
  }

  if (!currentActivity) return null;

  return (
    <div className="flex w-full h-screen items-stretch p-8 gap-16">
      <div className="h-full w-48 bg-primary p-2 rounded-3xl -space-y-48">
        {likedActivities.map((activity, index) => (
          <SmallCard key={activity.id} activity={activity} />
        ))}
      </div>

      <div className="h-full flex flex-col justify-between gap-8">
        <div className="rounded-3xl p-4 border-2 border-primary w-96 h-full flex flex-col">
          <div className="relative border-1 border-grey rounded-2xl overflow-hidden flex-1">
            <Image
              src={currentActivity?.image || ''}
              alt={currentActivity?.activity || ''}
              className="object-cover"
              fill
            />
          </div>

          <h2 className="text-2xl text-center text-primary py-4">
            {currentActivity?.activity}
          </h2>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <button
            className="rounded-full border-2 border-primary size-16"
            onClick={() => {
              handleNextActivity();
            }}
          >
            x
          </button>

          <button className="button">done</button>

          <button
            className="rounded-full border-2 border-primary size-16"
            onClick={() => {
              setLikedActivities([...(likedActivities || []), currentActivity]);
              handleNextActivity();
            }}
          >
            ❤️
          </button>
        </div>
      </div>

      <Chamois activities={likedActivities} />
    </div>
  );
};

export const SmallCard = ({ activity }: { activity: Activity }) => {
  return (
    <div
      key={activity.id}
      className="relative rounded-2xl p-4 bg-white flex flex-col gap-3 text-center border-2 border-primary"
    >
      <div className="relative aspect-square rounded-xl overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.activity}
          className="object-cover"
          fill
        />
      </div>
      <span className="line-clamp-1">{activity.activity}</span>
    </div>
  );
};
