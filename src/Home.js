import React, { useEffect, useRef } from 'react';
import { Layer, RegularPolygon } from 'react-konva';
import Konva from 'konva';
import { perfectScreenRadius } from './Utils';

export default ({ center }) => {
  let triangleRef;
  useEffect(() => {
    if (triangleRef) {
      triangleRef.current.to({
        opacity: 1,
        duration: 3,
        easing: Konva.Easings.StrongEaseInOut // https://konvajs.org/api/Konva.Easings.html
      });
    }
  }, [triangleRef]);

  const radiusOfTriangle = perfectScreenRadius();

  return (
    <Layer>
      <RegularPolygon
        sides={3}
        radius={radiusOfTriangle}
        stroke="yellow"
        strokeWidth={4}
        x={center.x}
        y={center.y}
        ref={(triangleRef = useRef())}
        opacity={0}
      />
    </Layer>
  );
};
