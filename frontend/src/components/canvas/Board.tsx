import React from 'react';
import Slot from './Slot';

interface BoardProps {
  onMove: (index: number) => void;
}

const Board = ({ onMove }: BoardProps) => {
  const slots = [];
  for (let i = 0; i < 9; i++) {
    const x = (i % 3) - 1;
    const z = Math.floor(i / 3) - 1;
    slots.push(<Slot key={i} index={i} position={[x, 0, z]} onMove={onMove} />);
  }

  return <group rotation={[-Math.PI / 4, 0, 0]}>{slots}</group>;
};

export default Board;
