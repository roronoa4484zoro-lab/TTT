import { GameState, Player } from '../../shared/types';
import { GameEngine } from './GameEngine';

export class GameSession {
  public board: (string | null)[] = Array(9).fill(null);
  public turn: 'X' | 'O' = 'X';
  public winner: string | 'draw' | null = null;
  public players: Player[] = [];

  constructor(public readonly roomId: string) {}

  public addPlayer(id: string, name: string): Player {
    const symbol = this.players.length === 0 ? 'X' : 'O';
    const player: Player = { id, symbol, name };
    this.players.push(player);
    return player;
  }

  public makeMove(playerId: string, index: number): boolean {
    const player = this.players.find(p => p.id === playerId);
    if (!player || this.winner !== null) return false;
    if (this.turn !== player.symbol) return false;
    if (!GameEngine.validateMove(this.board, index)) return false;

    this.board[index] = player.symbol;
    this.turn = this.turn === 'X' ? 'O' : 'X';
    this.winner = GameEngine.checkWinner(this.board);

    return true;
  }

  public getState(): GameState {
    return {
      board: [...this.board],
      turn: this.turn,
      winner: this.winner,
      players: [...this.players],
    };
  }
}
