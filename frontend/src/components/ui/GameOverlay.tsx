import React from 'react';
import { useGameStore } from '../store/gameStore';

const GameOverlay = () => {
  const { gameState, myPlayer } = useGameStore();

  if (!gameState) return null;

  const isMyTurn = myPlayer && gameState.turn === myPlayer.symbol;
  const winner = gameState.winner;

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      pointerEvents: 'none',
      textShadow: '0 0 10px rgba(0,0,0,0.5)'
    }}>
      {winner ? (
        <h1 style={{ fontSize: '3rem', color: winner === 'draw' ? '#aaa' : '#00f2ff' }}>
          {winner === 'draw' ? 'IT\'S A DRAW!' : `PLAYER ${winner} WINS!`}
        </h1>
      ) : (
        <div>
          <h2 style={{ fontSize: '2rem', color: isMyTurn ? '#00f2ff' : '#ff0055' }}>
            {isMyTurn ? 'YOUR TURN' : 'OPPONENT\'S TURN'}
          </h2>
          <p>You are Player {myPlayer?.symbol || '...'}</p>
        </div>
      )}
    </div>
  );
};

export default GameOverlay;
