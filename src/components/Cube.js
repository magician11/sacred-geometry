import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

const Box = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Set up state for the hovered and active state
  // const [position, setPosition] = useState([0, 0, 0]);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const length = 1.28;
  // const randomCoord = () =>
  //   Math.random() * 2 * (Math.floor(Math.random() * 2) === 1 ? 1 : -1);
  return (
    <mesh
      position={[0, 0, 0]}
      ref={mesh}
      // onClick={e => setPosition([randomCoord(), randomCoord(), randomCoord()])}
    >
      <boxBufferGeometry attach="geometry" args={[length, length, length]} />
      <meshStandardMaterial attach="material" color={'royalblue'} />
    </mesh>
  );
};

export default ({ loaded }) => (
  <Canvas onCreated={() => loaded()}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Box />
  </Canvas>
);
