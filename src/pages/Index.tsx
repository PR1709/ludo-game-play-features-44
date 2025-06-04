
import React, { useState, useEffect } from 'react';
import GameBoard from '@/components/GameBoard';
import PlayerPanel from '@/components/PlayerPanel';
import GameControls from '@/components/GameControls';
import WinnerModal from '@/components/WinnerModal';
import GameStats from '@/components/GameStats';
import { GameState, Player, Position } from '@/types/game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: 0,
    players: [
      { id: 0, color: 'red', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false },
      { id: 1, color: 'blue', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false },
      { id: 2, color: 'yellow', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false },
      { id: 3, color: 'green', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false }
    ],
    diceValue: 0,
    gameStarted: false,
    winner: null,
    totalMoves: 0,
    gameHistory: []
  });

  const [showWinnerModal, setShowWinnerModal] = useState(false);

  useEffect(() => {
    if (gameState.winner) {
      setShowWinnerModal(true);
    }
  }, [gameState.winner]);

  const resetGame = () => {
    setGameState({
      currentPlayer: 0,
      players: [
        { id: 0, color: 'red', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false },
        { id: 1, color: 'blue', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false },
        { id: 2, color: 'yellow', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false },
        { id: 3, color: 'green', pieces: [{ position: -1, id: 0 }, { position: -1, id: 1 }, { position: -1, id: 2 }, { position: -1, id: 3 }], isWinner: false }
      ],
      diceValue: 0,
      gameStarted: false,
      winner: null,
      totalMoves: 0,
      gameHistory: []
    });
    setShowWinnerModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 via-blue-500 via-yellow-500 to-green-500 bg-clip-text text-transparent animate-fade-in">
            🎲 Ludo Game 🎮
          </h1>
          <p className="text-xl text-gray-600 mt-2 animate-fade-in">
            Classic Board Game • 4 Players • Strategic Fun
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3 space-y-6">
            <GameBoard 
              gameState={gameState} 
              setGameState={setGameState} 
            />
            <GameControls 
              gameState={gameState} 
              setGameState={setGameState}
              onResetGame={resetGame}
            />
          </div>
          
          <div className="space-y-6">
            <PlayerPanel 
              gameState={gameState}
            />
            <GameStats 
              gameState={gameState}
            />
          </div>
        </div>

        <WinnerModal 
          isOpen={showWinnerModal}
          winner={gameState.winner}
          onClose={() => setShowWinnerModal(false)}
          onPlayAgain={resetGame}
        />
      </div>
    </div>
  );
};

export default Index;
