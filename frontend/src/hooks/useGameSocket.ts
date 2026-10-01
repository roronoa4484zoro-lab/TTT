import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useGameStore } from '../store/gameStore';
import { GameState } from '../../shared/types';

const SOCKET_URL = 'http://localhost:3001';

export const useGameSocket = (roomId: string) => {
  const { setGameState, setMyPlayer } = useGameStore();

  useEffect(() => {
    const socket: Socket = io(SOCKET_URL);

    socket.emit('joinGame', { roomId });

    socket.on('playerAssigned', (player) => {
      setMyPlayer(player);
    });

    socket.on('stateUpdate', (state: GameState) => {
      setGameState(state);
    });

    socket.on('gameStarted', (state: GameState) => {
      setGameState(state);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, setGameState, setMyPlayer]);

  const makeMove = (index: number) => {
    socket.emit('makeMove', { roomId, index });
  };

  return { makeMove };
};
