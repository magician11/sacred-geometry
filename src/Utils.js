const degreesToRadians = degrees => (degrees * Math.PI) / 180;

const pointOnCircle = (radius, radians, origin) => {
  const x = origin.x + Math.cos(radians) * radius;
  const y = origin.y + Math.sin(radians) * radius;
  return { x, y };
};

const perfectScreenRadius = () =>
  window.innerHeight > window.innerWidth
    ? window.innerWidth / 4
    : window.innerHeight / 4;

const centerOfScreen = () => {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
};

export { degreesToRadians, pointOnCircle, perfectScreenRadius, centerOfScreen };
