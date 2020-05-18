import React, { useRef, useEffect, forwardRef } from 'react';
import { Group, Circle } from 'react-konva';
import Konva from 'konva';
import {
  degreesToRadians,
  pointOnCircle,
  perfectShapeWidth,
  randomPositionOnScreen
} from '../../utils';

export default forwardRef(
  (
    {
      center,
      loaded = () => true,
      radiusOfCircle = perfectShapeWidth(2),
      opacity = 1
    },
    ref
  ) => {
    const circleLineWidth = 3;
    const circleColour = 'blue';
    const circleRefs = []; // array of refs to reference to move them
    const circleCoords = []; // the circles final coordinates that they animate to
    const circlesDrawn = [];

    // animate the circles to their final position
    useEffect(() => {
      circleRefs.forEach((circleRef, i) => {
        circlesDrawn[i] = false;
        circleRef.current.to({
          onFinish: () => {
            circlesDrawn[i] = true;
            const allDone = circlesDrawn.reduce((acc, curr) => acc && curr);
            if (allDone) {
              loaded();
            }
          },
          x: circleCoords[i].x,
          y: circleCoords[i].y,
          duration: Math.random() * 8, // make the rings come in at different times
          easing: Konva.Easings.StrongEaseInOut // https://konvajs.org/api/Konva.Easings.html
        });
      });
    }, [circleRefs, circleCoords, circlesDrawn, loaded]);

    const GorgeousCircle = ({ i }) => {
      const randomCoords = randomPositionOnScreen();
      return (
        <Circle
          radius={radiusOfCircle}
          stroke={circleColour}
          strokeWidth={circleLineWidth}
          x={randomCoords.x}
          y={randomCoords.y}
          ref={(circleRefs[i] = useRef())}
          shadowColor={'lightblue'}
          shadowBlur={11}
          shadowOffset={{ x: 1, y: 1 }}
          shadowOpacity={0.8}
        />
      );
    };

    const circles = [];
    // first add the center circle
    circleCoords[0] = {
      x: center.x,
      y: center.y
    };
    circles.push(<GorgeousCircle key={0} i={0} />);

    // now add all the circles around it
    circles.push(
      [0, 60, 120, 180, 240, 300].map((angle, i) => {
        const coordsOnCircle = pointOnCircle(
          radiusOfCircle,
          degreesToRadians(angle),
          center
        );
        circleCoords[i + 1] = coordsOnCircle;
        return <GorgeousCircle key={i + 1} i={i + 1} />;
      })
    );

    return (
      <Group ref={ref} opacity={opacity}>
        {circles}
      </Group>
    );
  }
);
