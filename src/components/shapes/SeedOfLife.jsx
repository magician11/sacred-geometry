import React, {
  useRef,
  useEffect,
  forwardRef,
  useMemo,
  useState,
  useCallback,
} from "react";
import { Group, Circle } from "react-konva";
import Konva from "konva";
import {
  degreesToRadians,
  pointOnCircle,
  perfectShapeWidth,
  randomPositionOnScreen,
} from "../../utils";

// Move GorgeousCircle outside to prevent recreation
const GorgeousCircle = React.memo(
  ({
    radiusOfCircle,
    circleColour,
    circleLineWidth,
    initialPosition,
    circleRef,
  }) => (
    <Circle
      radius={radiusOfCircle}
      stroke={circleColour}
      strokeWidth={circleLineWidth}
      x={initialPosition.x}
      y={initialPosition.y}
      ref={circleRef}
      shadowColor={"lightblue"}
      shadowBlur={11}
      shadowOffset={{ x: 1, y: 1 }}
      shadowOpacity={0.8}
    />
  ),
);

export default forwardRef(
  (
    {
      center,
      loaded = () => true,
      radiusOfCircle = perfectShapeWidth(2),
      opacity = 1,
    },
    ref,
  ) => {
    const circleLineWidth = 3;
    const circleColour = "blue";

    // Stable arrays using useMemo
    const circleRefs = useMemo(
      () => Array.from({ length: 7 }, () => useRef()),
      [],
    );

    const circleCoords = useMemo(() => {
      const coords = [];
      // Center circle
      coords[0] = { x: center.x, y: center.y };

      // Surrounding circles at 60-degree intervals
      [0, 60, 120, 180, 240, 300].forEach((angle, i) => {
        coords[i + 1] = pointOnCircle(
          radiusOfCircle,
          degreesToRadians(angle),
          center,
        );
      });

      return coords;
    }, [center.x, center.y, radiusOfCircle]);

    const initialPositions = useMemo(
      () => Array.from({ length: 7 }, () => randomPositionOnScreen()),
      [],
    );

    // Track animation completion without state
    const animationCompleteRef = useRef(false);
    const completedCountRef = useRef(0);

    // Start animations
    useEffect(() => {
      // Reset completion tracking
      animationCompleteRef.current = false;
      completedCountRef.current = 0;

      circleRefs.forEach((circleRef, i) => {
        if (circleRef.current) {
          circleRef.current.to({
            onFinish: () => {
              completedCountRef.current++;
              if (
                completedCountRef.current === 7 &&
                !animationCompleteRef.current
              ) {
                animationCompleteRef.current = true;
                loaded();
              }
            },
            x: circleCoords[i].x,
            y: circleCoords[i].y,
            duration: Math.random() * 8,
            easing: Konva.Easings.StrongEaseInOut,
          });
        }
      });
    }, [circleRefs, circleCoords, loaded]);

    // Memoize circles to prevent unnecessary rerenders
    const circles = useMemo(
      () =>
        circleRefs.map((circleRef, i) => (
          <GorgeousCircle
            key={i}
            radiusOfCircle={radiusOfCircle}
            circleColour={circleColour}
            circleLineWidth={circleLineWidth}
            initialPosition={initialPositions[i]}
            circleRef={circleRef}
          />
        )),
      [
        circleRefs,
        radiusOfCircle,
        circleColour,
        circleLineWidth,
        initialPositions,
      ],
    );

    return (
      <Group ref={ref} opacity={opacity}>
        {circles}
      </Group>
    );
  },
);
