import React from 'react';
import { Stage } from 'react-konva';
import SeedOfLife from './SeedOfLife';
import './App.css';

export default () => {
  const radiusOfCircle = 111;
  const circleLineWidth = 2;
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
