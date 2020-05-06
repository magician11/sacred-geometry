import React from 'react';
import { Stage } from 'react-konva';
import SeedOfLife from './SeedOfLife';
import './App.css';

export default () => {
  // make sure the circles fit onto any screen size
  const radiusOfCircle =
    window.innerHeight > window.innerWidth
      ? window.innerWidth / 4
      : window.innerHeight / 4;
  const circleLineWidth = 3;
  const circleColour = 'blue';

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <SeedOfLife
        radiusOfCircle={radiusOfCircle}
        circleLineWidth={circleLineWidth}
        circleColour={circleColour}
        centerOfMainCircle={{
          x: window.innerWidth / 2,
          y: window.innerHeight / 2
        }}
      />
    </Stage>
  );
};
