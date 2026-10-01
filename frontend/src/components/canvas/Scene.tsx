import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import Board from './Board';

interface SceneProps {
  onMove: (index: number) => void;
}

const Scene = ({ onMove }: SceneProps) => {
  return (
    <Canvas style={{ width: '100vw', height: '100vh', background: '#050505' }}>
      <PerspectiveCamera makeDefault position={[3, 3, 3]} />
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />

      <Suspense fallback={null}>
        <Board onMove={onMove} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
