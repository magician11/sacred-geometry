import React, { useEffect, useRef } from 'react';
import { Stage, Layer, RegularPolygon } from 'react-konva';
import Konva from 'konva';
import { perfectScreenRadius } from '../utils';

export default ({ center, loaded }) => {
  let triangleRef;
  useEffect(() => {
    triangleRef.current.to({
      onFinish: () => {
        loaded();
      },
      opacity: 1,
      duration: 3,
      easing: Konva.Easings.StrongEaseInOut
    });
  }, [triangleRef, loaded]);

  const radiusOfTriangle = perfectScreenRadius();

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RegularPolygon
          sides={3}
          radius={radiusOfTriangle}
          stroke="yellow"
          strokeWidth={11}
          x={center.x}
          y={center.y}
          ref={(triangleRef = useRef())}
          opacity={0}
        />
      </Layer>
    </Stage>
  );
};
