import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore';

interface PieceProps {
  symbol: string;
  position: [number, number, number];
}

const Piece = ({ symbol, position }: PieceProps) => {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (symbol === 'X') {
    return (
      <group position={position}>
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.05, 0.05, 0.6]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} />
        </mesh>
      </group>
    );
  }

  return (
    <mesh position={position}>
      <torusGeometry args={[0.2, 0.05, 16, 32]} />
      <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} />
    </mesh>
  );
};

export default Piece;
