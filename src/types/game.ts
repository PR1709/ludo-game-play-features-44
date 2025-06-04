
export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  id: number;
  position: number; // -1 for home, 0-51 for board positions, 52-57 for final stretch
}

export interface Player {
  id: number;
  color: 'red' | 'blue' | 'yellow' | 'green';
  pieces: Piece[];
  isWinner: boolean;
}

export interface GameMove {
  playerId: number;
  pieceId: number;
  fromPosition: number;
  toPosition: number;
  diceValue: number;
  timestamp: number;
}

export interface GameState {
  currentPlayer: number;
  players: Player[];
  diceValue: number;
  gameStarted: boolean;
  winner: Player | null;
  totalMoves: number;
  gameHistory: GameMove[];
}

export const BOARD_POSITIONS = 52;
export const HOME_POSITIONS = 6;
export const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];
export const STARTING_POSITIONS = [0, 13, 26, 39];
