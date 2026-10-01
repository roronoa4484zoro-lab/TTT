import React from 'react';
import { useGameStore } from '../../store/gameStore';
import Piece from './Piece';

interface SlotProps {
  index: number;
  position: [number, number, number];
  onMove: (index: number) => void;
}

const Slot = ({ index, position, onMove }: SlotProps) => {
  const { gameState } = useGameStore();
  const symbol = gameState?.board[index];

  return (
    <group position={position}>
      <mesh
        onClick={() => onMove(index)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <boxGeometry args={[0.9, 0.1, 0.9]} />
        <meshStandardMaterial
          color={symbol ? '#333' : '#222'}
          emissive={symbol ? '#444' : '#111'}
        />
      </mesh>
      {symbol && <Piece symbol={symbol} position={[0, 0.3, 0]} />}
    </group>
  );
};

export default Slot;
