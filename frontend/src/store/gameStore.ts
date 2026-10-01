import create from 'zustand';
import { GameState } from '../../shared/types';

interface GameStore {
  gameState: GameState | null;
  myPlayer: any | null;
  setGameState: (state: GameState) => void;
  setMyPlayer: (player: any) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: null,
  myPlayer: null,
  setGameState: (state) => set({ gameState: state }),
  setMyPlayer: (player) => set({ myPlayer: player }),
  reset: () => set({ gameState: null, myPlayer: null }),
}));
