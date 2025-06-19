import React, { useEffect, useRef } from 'react';
import { Layer, RegularPolygon } from 'react-konva';
import Konva from 'konva';
import { perfectShapeWidth } from '../../utils';

const Triangle = ({ center, loaded }) => {
  const triangleRef = useRef();
  const radiusOfTriangle = perfectShapeWidth(2);

  useEffect(() => {
    if (triangleRef.current) {
      triangleRef.current.to({
        onFinish: () => {
          loaded();
        },
        opacity: 1,
        duration: 3,
        easing: Konva.Easings.StrongEaseInOut
      });
    }
  }, [loaded]); // Remove triangleRef from dependencies since it's stable

  return (
    <Layer>
      <RegularPolygon
        sides={3}
        radius={radiusOfTriangle}
        stroke="yellow"
        strokeWidth={11}
        x={center.x}
        y={center.y}
        ref={triangleRef}
        opacity={0}
        shadowColor={'gold'}
        shadowBlur={15}
        shadowOffset={{ x: 2, y: 2 }}
        shadowOpacity={0.6}
      />
    </Layer>
  );
};

export default Triangle;
