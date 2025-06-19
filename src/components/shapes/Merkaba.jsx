import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  Stars,
  useNormalTexture,
} from "@react-three/drei";

const Merkaba = () => {
  const topPyramid = useRef();
  const bottomPyramid = useRef();

  useFrame((state, delta) => {
    topPyramid.current.rotation.y += 0.018;
    bottomPyramid.current.rotation.y += 0.018;
  });

  const [normalTexture] = useNormalTexture(11);

  return (
    <group>
      {/* Top pyramid pointing up */}
      <mesh ref={topPyramid} position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0, 3, 3, 3]} />
        <meshStandardMaterial
          color="#8a2be2"
          metalness={0.3}
          roughness={0.4}
          normalMap={normalTexture}
        />
      </mesh>

      {/* Bottom pyramid pointing down */}
      <mesh
        ref={bottomPyramid}
        rotation={[Math.PI, 0, 0]}
        position={[0, -0.75, 0]}
      >
        <cylinderGeometry args={[0, 3, 3, 3]} />
        <meshStandardMaterial
          color="#9932cc"
          metalness={0.3}
          roughness={0.4}
          normalMap={normalTexture}
        />
      </mesh>
    </group>
  );
};

const MerkabaScene = ({ loaded }) => (
  <div style={{ height: "100vh", backgroundColor: "black" }}>
    <Canvas onCreated={() => loaded()}>
      <Suspense fallback={null}>
        <Stars />
        <PerspectiveCamera makeDefault position={[8, 6, 8]} fov={50} />

        {/* Improved lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          color="#ffffff"
        />
        <pointLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[5, -5, -5]} intensity={0.6} color="#4169e1" />

        <Merkaba />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Suspense>
    </Canvas>
  </div>
);

export default MerkabaScene;
