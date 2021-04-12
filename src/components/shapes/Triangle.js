import React, { useEffect, useRef } from 'react';
import { Layer, RegularPolygon } from 'react-konva';
import Konva from 'konva';
import { perfectShapeWidth } from '../../utils';

const Triangle = ({ center, loaded }) => {
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

  const radiusOfTriangle = perfectShapeWidth(2);

  return (
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
  );
};

export default Triangle;
