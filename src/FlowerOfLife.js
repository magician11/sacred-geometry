import React from 'react';
import { Layer, Circle } from 'react-konva';
import { degreesToRadians, pointOnCircle } from './Utils';

export default ({
  radiusOfCircle,
  circleLineWidth,
  circleColour,
  centerOfMainCircle
}) => {
  const circles = [];
  // first add the center circle

  circles.push(
    <Circle
      key={'main'}
      radius={radiusOfCircle}
      stroke={circleColour}
      strokeWidth={circleLineWidth}
      x={centerOfMainCircle.x}
      y={centerOfMainCircle.y}
    />
  );

  // now add all the circles around it
  circles.push(
    [0, 60, 120, 180, 240, 300].map(angle => {
      const coordsOnCircle = pointOnCircle(
        radiusOfCircle,
        degreesToRadians(angle),
        centerOfMainCircle
      );
      return (
        <Circle
          key={angle}
          radius={radiusOfCircle}
          stroke={circleColour}
          strokeWidth={circleLineWidth}
          x={coordsOnCircle.x}
          y={coordsOnCircle.y}
        />
      );
    })
  );

  return <Layer>{circles}</Layer>;
};
