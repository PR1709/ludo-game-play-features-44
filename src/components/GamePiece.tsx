
import React from 'react';
import { GameState, Player, Piece } from '@/types/game';

interface GamePieceProps {
  player: Player;
  piece: Piece;
  x: number;
  y: number;
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GamePiece: React.FC<GamePieceProps> = ({ 
  player, 
  piece, 
  x, 
  y, 
  gameState, 
  setGameState 
}) => {
  const canMovePiece = () => {
    if (gameState.currentPlayer !== player.id || gameState.diceValue === 0) return false;
    
    // Can move out of home with 6
    if (piece.position === -1 && gameState.diceValue === 6) return true;
    
    // Can move piece that's on board
    if (piece.position >= 0 && piece.position < 58) return true;
    
    return false;
  };

  const movePiece = () => {
    if (!canMovePiece()) return;

    const newGameState = { ...gameState };
    const currentPlayer = newGameState.players[player.id];
    const pieceToMove = currentPlayer.pieces.find(p => p.id === piece.id);
    
    if (!pieceToMove) return;

    const oldPosition = pieceToMove.position;
    let newPosition;

    if (pieceToMove.position === -1) {
      // Move out of home
      newPosition = player.id * 13; // Starting position for each player
    } else {
      newPosition = pieceToMove.position + gameState.diceValue;
      
      // Check if piece has completed the circuit
      if (newPosition >= 52) {
        const finalStretchStart = 52;
        newPosition = finalStretchStart + (newPosition - 52);
        
        // Check if reached home (position 57)
        if (newPosition > 57) {
          newPosition = 57; // Home position
        }
      }
    }

    // Check for captures
    newGameState.players.forEach(otherPlayer => {
      if (otherPlayer.id !== player.id) {
        otherPlayer.pieces.forEach(otherPiece => {
          if (otherPiece.position === newPosition && newPosition >= 0 && newPosition < 52) {
            // Capture the piece (send it home)
            otherPiece.position = -1;
          }
        });
      }
    });

    pieceToMove.position = newPosition;
    
    // Add move to history
    newGameState.gameHistory.push({
      playerId: player.id,
      pieceId: piece.id,
      fromPosition: oldPosition,
      toPosition: newPosition,
      diceValue: gameState.diceValue,
      timestamp: Date.now()
    });

    newGameState.totalMoves++;
    
    // Check for winner
    const allPiecesHome = currentPlayer.pieces.every(p => p.position === 57);
    if (allPiecesHome) {
      currentPlayer.isWinner = true;
      newGameState.winner = currentPlayer;
    }

    // Move to next player (unless rolled a 6)
    if (gameState.diceValue !== 6) {
      newGameState.currentPlayer = (newGameState.currentPlayer + 1) % 4;
    }
    
    newGameState.diceValue = 0;
    
    setGameState(newGameState);
  };

  const getColorClasses = () => {
    const colors = {
      red: 'bg-red-500 border-red-700 shadow-red-300',
      blue: 'bg-blue-500 border-blue-700 shadow-blue-300',
      yellow: 'bg-yellow-500 border-yellow-700 shadow-yellow-300',
      green: 'bg-green-500 border-green-700 shadow-green-300'
    };
    return colors[player.color];
  };

  return (
    <div
      className={`
        absolute w-6 h-6 rounded-full border-2 cursor-pointer
        transform -translate-x-1/2 -translate-y-1/2
        transition-all duration-300 z-10
        ${getColorClasses()}
        ${canMovePiece() ? 'hover:scale-125 hover:shadow-lg animate-pulse' : ''}
        ${gameState.currentPlayer === player.id && gameState.diceValue > 0 ? 'animate-bounce' : ''}
      `}
      style={{
        left: `${(x + 0.5) * 2}rem`,
        top: `${(y + 0.5) * 2}rem`,
      }}
      onClick={movePiece}
    >
      <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
      {piece.position === 57 && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-spin">
          👑
        </div>
      )}
    </div>
  );
};

export default GamePiece;
