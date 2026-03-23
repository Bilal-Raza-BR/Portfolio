'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Icosahedron, useMatcapTexture } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { Mesh } from 'three';

const FloatingShape = () => {
  const ref = useRef<Mesh>(null!);
  const [matcap] = useMatcapTexture('7B5254_E9DCC7_B19986_C8AC91', 256);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 1]} position={[-4, 0, -10]}>
      <meshMatcapMaterial attach="material" matcap={matcap} />
    </Icosahedron>
  );
};

const ResponsiveCamera = () => {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 768) {
      camera.position.z = 28; // Mobile par camera thoda peeche
    } else {
      camera.position.z = 20; // Desktop par normal position
    }
  }, [size, camera]);

  return null;
};

const Scene = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 pointer-events-none">
      <Canvas camera={{ fov: 45, position: [0, 0, 20] }}>
        <ResponsiveCamera />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingShape />
        <Icosahedron args={[0.5, 1]} position={[5, 4, -12]}>
           <meshStandardMaterial color="#0ea5e9" roughness={0.1} />
        </Icosahedron>
         <Icosahedron args={[0.8, 1]} position={[6, -5, -15]}>
           <meshStandardMaterial color="#ff6a00" roughness={0.3} />
        </Icosahedron>
      </Canvas>
    </div>
  );
};

export default Scene;