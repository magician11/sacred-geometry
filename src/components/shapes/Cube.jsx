import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Box = () => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  const length = 1.28;
  return (
    <mesh ref={mesh}>
      <boxGeometry args={[length, length, length]} />
      <meshStandardMaterial
        color={"royalblue"}
        roughness={0.4}
        metalness={0.1}
      />
    </mesh>
  );
};

const Cube = ({ loaded }) => (
  <Canvas onCreated={() => loaded()} camera={{ position: [3, 3, 3], fov: 75 }}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
    <pointLight position={[-3, -3, -3]} intensity={0.5} color="#ffffff" />
    <Box />
  </Canvas>
);

export default Cube;
