export type Player = {
  id: string;
  symbol: 'X' | 'O';
  name: string;
};

export type GameState = {
  board: (string | null)[];
  turn: 'X' | 'O';
  winner: string | 'draw' | null;
  players: Player[];
};

export type Move = {
  roomId: string;
  index: number;
};

export type RoomInfo = {
  roomId: string;
  gameId: string;
};
