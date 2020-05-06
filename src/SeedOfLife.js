import React, { useRef, useEffect } from 'react';
import { Layer, Circle } from 'react-konva';
import Konva from 'konva';
import { degreesToRadians, pointOnCircle } from './Utils';

export default ({
  radiusOfCircle,
  circleLineWidth,
  circleColour,
  centerOfMainCircle
}) => {
  const circleRefs = []; // array of refs to reference to move them
  const circleCoords = []; // the circles final coordinates that they animate to

  // animate the circles to their final position
  useEffect(() => {
    circleRefs.forEach((circleRef, i) => {
      circleRef.current.to({
        x: circleCoords[i].x,
        y: circleCoords[i].y,
        duration: Math.random() * 8, // make the rings come in at different times
        easing: Konva.Easings.StrongEaseInOut // https://konvajs.org/api/Konva.Easings.html
      });
    });
  }, [circleRefs, circleCoords]);

  const GorgeousCircle = ({ i }) => (
    <Circle
      radius={radiusOfCircle}
      stroke={circleColour}
      strokeWidth={circleLineWidth}
      x={Math.random() * window.innerWidth}
      y={Math.random() * window.innerHeight}
      ref={(circleRefs[i] = useRef())}
      shadowColor={'lightblue'}
      shadowBlur={11}
      shadowOffset={{ x: 1, y: 1 }}
      shadowOpacity={0.8}
    />
  );

  const circles = [];
  // first add the center circle
  circleCoords[0] = {
    x: centerOfMainCircle.x,
    y: centerOfMainCircle.y
  };
  circles.push(<GorgeousCircle key={0} i={0} />);

  // now add all the circles around it
  circles.push(
    [0, 60, 120, 180, 240, 300].map((angle, i) => {
      const coordsOnCircle = pointOnCircle(
        radiusOfCircle,
        degreesToRadians(angle),
        centerOfMainCircle
      );
      circleCoords[i + 1] = coordsOnCircle;
      return <GorgeousCircle key={i + 1} i={i + 1} />;
    })
  );

  return <Layer draggable>{circles}</Layer>;
};
