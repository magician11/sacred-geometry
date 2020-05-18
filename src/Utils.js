const degreesToRadians = degrees => (degrees * Math.PI) / 180;

const pointOnCircle = (radius, radians, origin) => {
  const x = origin.x + Math.cos(radians) * radius;
  const y = origin.y + Math.sin(radians) * radius;
  return { x, y };
};

// the width a shape needs to be able to fit side by side
const perfectShapeWidth = shapes =>
  window.innerHeight > window.innerWidth
    ? window.innerWidth / (shapes * 2)
    : window.innerHeight / (shapes * 2);

const centerOfScreen = () => {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
};

const randomPositionOnScreen = () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight
});

export {
  degreesToRadians,
  pointOnCircle,
  perfectShapeWidth,
  centerOfScreen,
  randomPositionOnScreen
};
