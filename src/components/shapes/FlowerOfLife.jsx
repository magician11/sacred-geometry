import React, { useEffect, useRef, useMemo } from 'react';
import Konva from 'konva';
import { Layer, Circle } from 'react-konva';
import {
  pointOnCircle,
  perfectShapeWidth,
  degreesToRadians
} from '../../utils';
import SeedOfLife from './SeedOfLife';

const FlowerOfLife = ({ center, loaded }) => {
  const radiusOfCircle = perfectShapeWidth(4);
  const scaffoldingColour = 'blue';

  // Calculate total number of elements (1 center + 6 surrounding + 2 scaffolding circles)
  const totalElements = 9;

  // Stable refs array
  const seedOfLifeRefs = useMemo(
    () => Array.from({ length: totalElements }, () => useRef()),
    []
  );

  // Track animation completion without state
  const animationCompleteRef = useRef(false);
  const completedCountRef = useRef(0);

  // Calculate positions for surrounding seeds of life
  const surroundingPositions = useMemo(
    () =>
      [0, 60, 120, 180, 240, 300].map(angle =>
        pointOnCircle(radiusOfCircle, degreesToRadians(angle), center)
      ),
    [center.x, center.y, radiusOfCircle]
  );

  // Start animations
  useEffect(() => {
    // Reset completion tracking
    animationCompleteRef.current = false;
    completedCountRef.current = 0;

    seedOfLifeRefs.forEach((seedOfLifeRef, i) => {
      if (seedOfLifeRef.current) {
        seedOfLifeRef.current.to({
          onFinish: () => {
            completedCountRef.current++;
            if (
              completedCountRef.current === totalElements &&
              !animationCompleteRef.current
            ) {
              animationCompleteRef.current = true;
              loaded();
            }
          },
          opacity: 1,
          duration: i * Math.random() + i, // Staggered timing
          easing: Konva.Easings.StrongEaseInOut
        });
      }
    });
  }, [seedOfLifeRefs, loaded, totalElements]);

  // Memoize all elements to prevent unnecessary recreations
  const elements = useMemo(() => {
    const result = [];
    let refIndex = 0;

    // Center seed of life
    result.push(
      <SeedOfLife
        key="center"
        center={center}
        radiusOfCircle={radiusOfCircle}
        ref={seedOfLifeRefs[refIndex++]}
        opacity={0}
      />
    );

    // Surrounding seeds of life
    surroundingPositions.forEach((position, i) => {
      result.push(
        <SeedOfLife
          key={`surrounding-${i}`}
          center={position}
          radiusOfCircle={radiusOfCircle}
          ref={seedOfLifeRefs[refIndex++]}
          opacity={0}
        />
      );
    });

    // Scaffolding circles
    [3, 3.17].forEach((circleSize, i) => {
      result.push(
        <Circle
          key={`scaffolding-${i}`}
          radius={radiusOfCircle * circleSize}
          stroke={scaffoldingColour}
          opacity={0}
          ref={seedOfLifeRefs[refIndex++]}
          strokeWidth={3}
          x={center.x}
          y={center.y}
          shadowColor={'lightblue'}
          shadowBlur={11}
          shadowOffset={{ x: 1, y: 1 }}
          shadowOpacity={0.8}
        />
      );
    });

    return result;
  }, [
    center.x,
    center.y,
    radiusOfCircle,
    surroundingPositions,
    scaffoldingColour,
    seedOfLifeRefs
  ]);

  return <Layer>{elements}</Layer>;
};

export default FlowerOfLife;
