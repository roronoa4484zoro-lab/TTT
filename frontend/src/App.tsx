import React, { useState } from 'react';
import Scene from './components/canvas/Scene';
import GameOverlay from './components/ui/GameOverlay';
import { useGameSocket } from './hooks/useGameSocket';
import { useGameStore } from './store/gameStore';

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);
  const { makeMove } = useGameSocket(joined ? roomId : '');

  if (!joined) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#050505',
        color: 'white',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#00f2ff' }}>3D TIC TAC TOE</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            style={{
              padding: '10px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              border: 'none',
              outline: 'none'
            }}
          />
          <button
            onClick={() => roomId && setJoined(true)}
            style={{
              padding: '10px 20px',
              fontSize: '1.2rem',
              borderRadius: '5px',
              border: 'none',
              background: '#00f2ff',
              color: 'black',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            JOIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Scene onMove={makeMove} />
      <GameOverlay />
    </div>
  );
};

export default App;
