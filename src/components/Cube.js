import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';

const Box = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  const length = 1.28;
  return (
    <mesh ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[length, length, length]} />
      <meshStandardMaterial attach="material" color={'royalblue'} />
    </mesh>
  );
};

export default ({ loaded }) => (
  <Canvas onCreated={() => loaded()}>
    <ambientLight />
    <pointLight position={[11, 11, 11]} />
    <Box />
  </Canvas>
);
