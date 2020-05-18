import React, { useEffect, createRef } from 'react';
import Konva from 'konva';
import { Layer } from 'react-konva';

import {
  pointOnCircle,
  perfectShapeWidth,
  degreesToRadians
} from '../../utils';

import SeedOfLife from './SeedOfLife';

export default ({ center, loaded }) => {
  const radiusOfCircle = perfectShapeWidth(4);
  const seedOfLifeRefs = []; // array of refs to reference to move them
  const seedOfLifesDrawn = [];

  useEffect(() => {
    seedOfLifeRefs.forEach((seedOfLifeRef, i) => {
      seedOfLifesDrawn[i] = false;
      seedOfLifeRef.current.to({
        onFinish: () => {
          seedOfLifesDrawn[i] = true;
          const allDone = seedOfLifesDrawn.reduce((acc, curr) => acc && curr);
          if (allDone) {
            loaded();
          }
        },
        opacity: 1,
        duration: i * Math.random() + 3, // make the seeds of life come in at different times
        easing: Konva.Easings.StrongEaseInOut // https://konvajs.org/api/Konva.Easings.html
      });
    });
  }, [seedOfLifeRefs, seedOfLifesDrawn, loaded]);

  const seedsOfLife = [
    <SeedOfLife
      key={0}
      center={center}
      radiusOfCircle={radiusOfCircle}
      ref={(seedOfLifeRefs[0] = createRef())}
      opacity={0}
    />
  ];
  seedsOfLife.push(
    [0, 60, 120, 180, 240, 300].map((angle, i) => {
      const coordsOnSeedOfLife = pointOnCircle(
        radiusOfCircle,
        degreesToRadians(angle),
        center
      );

      return (
        <SeedOfLife
          key={i + 1}
          center={coordsOnSeedOfLife}
          radiusOfCircle={radiusOfCircle}
          ref={(seedOfLifeRefs[i + 1] = createRef())}
          opacity={0}
        />
      );
    })
  );

  return <Layer>{seedsOfLife}</Layer>;
};
