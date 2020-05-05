import React from 'react';
import { Stage } from 'react-konva';
import FlowerOfLife from './FlowerOfLife';

export default () => {
  const radiusOfCircle = 111;
  const circleLineWidth = 1;
  const circleColour = 'black';

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <FlowerOfLife
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
