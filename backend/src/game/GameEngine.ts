import { GameState, Move } from '../../shared/types';

export const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export class GameEngine {
  static checkWinner(board: (string | null)[]): string | 'draw' | null {
    for (const [a, b, c] of WINNING_COMBOS) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes(null)) {
      return 'draw';
    }
    return null;
  }

  static validateMove(board: (string | null)[], index: number): boolean {
    return index >= 0 && index < 9 && board[index] === null;
  }
}
