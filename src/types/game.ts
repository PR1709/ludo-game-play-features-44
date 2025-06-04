
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

export interface Challenge {
  id: string;
  name: string;
  entryFee: number;
  winningAmount: number;
  currency: string;
  participants: number;
  maxParticipants: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
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
  selectedChallenge: Challenge | null;
}

export const BOARD_POSITIONS = 52;
export const HOME_POSITIONS = 6;
export const SAFE_POSITIONS = [0, 8, 13, 21, 26, 34, 39, 47];
export const STARTING_POSITIONS = [0, 13, 26, 39];

export const CHALLENGES: Challenge[] = [
  {
    id: 'challenge-free',
    name: 'Free Play',
    entryFee: 0,
    winningAmount: 0,
    currency: '₹',
    participants: 1,
    maxParticipants: 4,
    difficulty: 'Easy'
  },
  {
    id: 'challenge-1',
    name: 'Beginner Challenge',
    entryFee: 1,
    winningAmount: 1.8,
    currency: '₹',
    participants: 2,
    maxParticipants: 4,
    difficulty: 'Easy'
  },
  {
    id: 'challenge-5',
    name: 'Casual Match',
    entryFee: 5,
    winningAmount: 9,
    currency: '₹',
    participants: 3,
    maxParticipants: 4,
    difficulty: 'Easy'
  },
  {
    id: 'challenge-10',
    name: 'Classic Battle',
    entryFee: 10,
    winningAmount: 18,
    currency: '₹',
    participants: 1,
    maxParticipants: 4,
    difficulty: 'Medium'
  },
  {
    id: 'challenge-25',
    name: 'Pro Tournament',
    entryFee: 25,
    winningAmount: 45,
    currency: '₹',
    participants: 2,
    maxParticipants: 4,
    difficulty: 'Medium'
  },
  {
    id: 'challenge-50',
    name: 'Expert League',
    entryFee: 50,
    winningAmount: 90,
    currency: '₹',
    participants: 1,
    maxParticipants: 4,
    difficulty: 'Hard'
  },
  {
    id: 'challenge-100',
    name: 'Championship',
    entryFee: 100,
    winningAmount: 180,
    currency: '₹',
    participants: 0,
    maxParticipants: 4,
    difficulty: 'Hard'
  }
];
