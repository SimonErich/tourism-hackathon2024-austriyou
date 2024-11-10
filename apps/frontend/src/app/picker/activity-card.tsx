'use client';

import React, { useRef, useEffect, useState, Children } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { Activity } from '../mock/activities';

interface CardProps {
  style?: React.CSSProperties;
  onVote: (vote: boolean) => void;
  id: string;
  drag?: boolean | 'x' | 'y';
  activity: Activity;
}

export const Card = ({
  activity,
  style,
  onVote,
  id,
  drag,
  ...props
}: CardProps) => {
  // motion stuff
  const cardElem = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const controls = useAnimation();

  const [constrained, setConstrained] = useState(true);

  const [direction, setDirection] = useState<'left' | 'right' | undefined>();

  const [velocity, setVelocity] = useState<number>();

  const getVote = (
    childNode: HTMLElement,
    parentNode: HTMLElement
  ): boolean | undefined => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;
    return result;
  };

  // determine direction of swipe based on velocity
  const getDirection = (): 'left' | 'right' | undefined => {
    if (velocity === undefined) {
      return undefined;
    }
    return velocity >= 1 ? 'right' : velocity <= -1 ? 'left' : undefined;
  };

  const getTrajectory = () => {
    setVelocity(x.getVelocity());
    setDirection(getDirection());
  };

  const flyAway = (min: number): void => {
    const flyAwayDistance = (dir: 'left' | 'right'): number => {
      const parentWidth = (
        cardElem.current?.parentNode as HTMLElement
      )?.getBoundingClientRect().width;
      const childWidth = cardElem.current?.getBoundingClientRect().width;
      if (!parentWidth || !childWidth) {
        return 0;
      }
      return dir === 'left'
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };

    if (direction && velocity && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({
        x: flyAwayDistance(direction),
      });
    }
  };

  useEffect(() => {
    const unsubscribeX = x.on('change', () => {
      if (cardElem.current) {
        const childNode = cardElem.current;
        const parentNode = cardElem.current.parentNode as HTMLElement;
        const result = getVote(childNode, parentNode);
        result !== undefined && onVote(result);
      }
    });

    return () => unsubscribeX();
  });

  return (
    <motion.div
      animate={controls}
      className="absolute aspect-[3/4] bg-white rounded-lg p-4"
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      ref={cardElem}
      style={{ x }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(500)}
      whileTap={{ scale: 1.1 }}
      drag={drag}
      {...props}
    >
      {activity.activity}
    </motion.div>
  );
};

interface CardStackProps {
  onVote: (item: Activity, vote: boolean) => void;
  activities: Activity[];
  [key: string]: any; // for additional props spread via ...props
}

export const CardStack = ({ onVote, activities, ...props }: CardStackProps) => {
  const [stack, setStack] = useState<Activity[]>(activities);

  // return new array with last item removed
  const pop = (array: Activity[]): Activity[] => {
    return array.filter((_, index) => {
      return index < array.length - 1;
    });
  };

  const handleVote = (item: Activity, vote: boolean): void => {
    // update the stack
    let newStack = pop(stack);
    setStack(newStack);

    // run function from onVote prop, passing the current item and value of vote
    onVote(item, vote);
  };

  return (
    <>
      <div
        className="outline-1 outline outline-offset-2 outline-red-400 flex items-center justify-center relative"
        {...props}
      >
        {stack.map((item, index) => {
          let isTop = index === stack.length - 1;
          const uniqueKey = `item-${index}`;
          return (
            <Card
              drag={isTop} // Only top card is draggable
              key={uniqueKey}
              onVote={(result) => handleVote(item, result)}
              id={uniqueKey}
              activity={item as Activity}
            ></Card>
          );
        })}
      </div>
      <div className="flex gap-1">
        <button onClick={() => handleVote(activities[stack.length - 1], true)}>
          Yes
        </button>
        <button onClick={() => handleVote(activities[stack.length - 1], false)}>
          No
        </button>
      </div>
    </>
  );
};

interface ActivityCardsProps {
  activities: Activity[];
}
export const ActivityCards = ({ activities }: ActivityCardsProps) => {
  return (
    <div className="bg-slate-800 w-[300px] min-h-screen">
      <CardStack
        onVote={(item, vote) => {
          console.log(item.slug, vote);
        }}
        activities={activities}
      />
    </div>
  );
};
