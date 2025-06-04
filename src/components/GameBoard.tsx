
import React from 'react';
import { GameState, BOARD_POSITIONS, STARTING_POSITIONS, SAFE_POSITIONS } from '@/types/game';
import GamePiece from './GamePiece';

interface GameBoardProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, setGameState }) => {
  const boardSize = 15; // 15x15 grid
  
  const getPositionCoordinates = (position: number) => {
    // Convert board position to x,y coordinates on 15x15 grid
    const positions = [
      // Red starting side (bottom)
      [6, 14], [6, 13], [6, 12], [6, 11], [6, 10], [6, 9],
      [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
      [0, 7], [0, 6],
      // Blue starting side (left)
      [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6],
      [6, 5], [6, 4], [6, 3], [6, 2], [6, 1], [6, 0],
      [7, 0], [8, 0],
      // Yellow starting side (top)
      [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 6],
      [9, 6], [10, 6], [11, 6], [12, 6], [13, 6], [14, 6],
      [14, 7], [14, 8],
      // Green starting side (right)
      [13, 8], [12, 8], [11, 8], [10, 8], [9, 8], [8, 8],
      [8, 9], [8, 10], [8, 11], [8, 12], [8, 13], [8, 14]
    ];
    
    return positions[position] || [7, 7];
  };

  const getHomeCoordinates = (playerId: number, pieceId: number) => {
    const homeAreas = {
      0: [[1, 1], [3, 1], [1, 3], [3, 3]], // Red
      1: [[1, 11], [3, 11], [1, 13], [3, 13]], // Blue
      2: [[11, 11], [13, 11], [11, 13], [13, 13]], // Yellow
      3: [[11, 1], [13, 1], [11, 3], [13, 3]] // Green
    };
    return homeAreas[playerId as keyof typeof homeAreas][pieceId];
  };

  const getFinalStretchCoordinates = (playerId: number, position: number) => {
    const finalPositions = position - 52;
    const stretches = {
      0: [[7, 13], [7, 12], [7, 11], [7, 10], [7, 9], [7, 8]], // Red to center
      1: [[1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [6, 7]], // Blue to center
      2: [[7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6]], // Yellow to center
      3: [[13, 7], [12, 7], [11, 7], [10, 7], [9, 7], [8, 7]] // Green to center
    };
    return stretches[playerId as keyof typeof stretches][finalPositions];
  };

  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const isHomeArea = (x < 6 && y < 6) || (x > 8 && y < 6) || (x < 6 && y > 8) || (x > 8 && y > 8);
        const isCenterArea = x >= 6 && x <= 8 && y >= 6 && y <= 8;
        const isPath = !isHomeArea && !isCenterArea;
        const isSafePosition = SAFE_POSITIONS.some(pos => {
          const [px, py] = getPositionCoordinates(pos);
          return px === x && py === y;
        });
        const isStartPosition = STARTING_POSITIONS.some(pos => {
          const [px, py] = getPositionCoordinates(pos);
          return px === x && py === y;
        });

        let cellColor = 'bg-white';
        if (isHomeArea) {
          if (x < 6 && y < 6) cellColor = 'bg-red-100';
          else if (x > 8 && y < 6) cellColor = 'bg-green-100';
          else if (x < 6 && y > 8) cellColor = 'bg-blue-100';
          else if (x > 8 && y > 8) cellColor = 'bg-yellow-100';
        } else if (isCenterArea) {
          cellColor = 'bg-gradient-to-br from-purple-200 to-pink-200';
        } else if (isSafePosition) {
          cellColor = 'bg-green-200';
        } else if (isStartPosition) {
          cellColor = 'bg-yellow-200';
        } else if (isPath) {
          cellColor = 'bg-gray-100';
        }

        grid.push(
          <div
            key={`${x}-${y}`}
            className={`
              relative w-8 h-8 border border-gray-300 ${cellColor}
              transition-all duration-200 hover:scale-105
              ${isSafePosition ? 'border-green-500 border-2' : ''}
              ${isStartPosition ? 'border-yellow-500 border-2' : ''}
              ${isCenterArea && x === 7 && y === 7 ? 'bg-gradient-to-br from-gold to-yellow-400' : ''}
            `}
            style={{
              gridColumn: x + 1,
              gridRow: y + 1,
            }}
          >
            {isSafePosition && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            )}
            {isStartPosition && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        );
      }
    }
    
    return grid;
  };

  const renderPieces = () => {
    return gameState.players.flatMap(player =>
      player.pieces.map(piece => {
        let x, y;
        
        if (piece.position === -1) {
          [x, y] = getHomeCoordinates(player.id, piece.id);
        } else if (piece.position >= 52) {
          [x, y] = getFinalStretchCoordinates(player.id, piece.position);
        } else {
          [x, y] = getPositionCoordinates(piece.position);
        }

        return (
          <GamePiece
            key={`${player.id}-${piece.id}`}
            player={player}
            piece={piece}
            x={x}
            y={y}
            gameState={gameState}
            setGameState={setGameState}
          />
        );
      })
    );
  };

  return (
    <div className="flex justify-center">
      <div className="relative bg-white rounded-lg shadow-2xl p-4 animate-scale-in">
        <div 
          className="grid gap-0 border-2 border-gray-400 rounded-lg overflow-hidden"
          style={{ 
            gridTemplateColumns: `repeat(${boardSize}, 2rem)`,
            gridTemplateRows: `repeat(${boardSize}, 2rem)`
          }}
        >
          {renderGrid()}
          {renderPieces()}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
