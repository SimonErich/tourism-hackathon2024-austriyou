// GAMS

import React, { useMemo } from 'react';
import { Activity } from '../mock/activities';

type Layer = {
  id: string;
  src: string;
};

const defaultLayers: Layer[] = [
  { id: '1', src: '/chamois/1_Wall.png' },
  { id: '2', src: '/chamois/2_Character.png' },
];

const layers: Layer[] = [
  { id: '3', src: '/chamois/3_Skiing.png' },
  { id: '4', src: '/chamois/4_WinterHiking.png' },
  { id: '5', src: '/chamois/5_Hiking.png' },
  { id: '6', src: '/chamois/6_Diving.png' },
  { id: '7', src: '/chamois/7_Sailing.png' },
  { id: '8', src: '/chamois/8_Shopping.png' },
  { id: '9', src: '/chamois/9_CarMuseum.png' },
  { id: '10', src: '/chamois/10_SoundOfMusic.png' },
  { id: '11', src: '/chamois/11_LandscapeDriving.png' },
  { id: '12', src: '/chamois/12_Skitouring.png' },
  { id: '13', src: '/chamois/13_IceSkating.png' },
  { id: '14', src: '/chamois/14_ChristmasMarket.png' },
  { id: '15', src: '/chamois/15_Tobogganging.png' },
  { id: '16', src: '/chamois/16_MuseumsAndGalleries.png' },
  { id: '17', src: '/chamois/17_Cycling.png' },
];

const activityToLayerMap: Record<Activity['slug'], Layer['id']> = {
  skiing: '3',
  'winter-hiking': '4',
  hiking: '5',
  diving: '6',
  sailing: '7',
  shopping: '8',
  'car-museum': '9',
  'sound-of-music': '10',
  'landscape-driving': '11',
  skitouring: '12',
  'ice-skating': '13',
  'christmas-market': '14',
  tobogganging: '15',
  'museums-and-galleries': '16',
  cycling: '17',
};

export const Chamois = ({ activities }: { activities: Activity[] }) => {
  const enabledLayers = useMemo(() => {
    const layerIds = activities.map(
      (activity) => activityToLayerMap[activity.slug]
    );
    return layers.filter((layer) => layerIds.includes(layer.id));
  }, [activities]);
  return (
    <div className="fixed bottom-0 right-0 w-96">
      <div className="relative">
        {[...defaultLayers, ...enabledLayers].map((layer, index) => (
          <img
            src={layer.src}
            alt=""
            data-id={layer.id}
            key={layer.id}
            className={
              'w-full h-auto' + (index !== 0 ? ' absolute inset-0' : '')
            }
          />
        ))}
      </div>
    </div>
  );
};
