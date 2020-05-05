import React, { useRef, useEffect } from 'react';
import { Layer, Circle } from 'react-konva';
import { degreesToRadians, pointOnCircle } from './Utils';

export default ({
  radiusOfCircle,
  circleLineWidth,
  circleColour,
  centerOfMainCircle
}) => {
  const circleRefs = [];
  const circleCoords = [];

  useEffect(() => {
    circleRefs.forEach((circleRef, i) => {
      circleRef.current.to({
        x: circleCoords[i].x,
        y: circleCoords[i].y,
        duration: 2.2
      });
    });
  }, [circleRefs, circleCoords]);

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
    [0, 60, 120, 180, 240, 300].map((angle, i) => {
      const coordsOnCircle = pointOnCircle(
        radiusOfCircle,
        degreesToRadians(angle),
        centerOfMainCircle
      );
      circleCoords[i] = coordsOnCircle;
      return (
        <Circle
          key={angle}
          radius={radiusOfCircle}
          stroke={circleColour}
          strokeWidth={circleLineWidth}
          x={Math.random() * window.innerWidth}
          y={Math.random() * window.innerHeight}
          ref={(circleRefs[i] = useRef())}
        />
      );
    })
  );

  return <Layer draggable>{circles}</Layer>;
};
