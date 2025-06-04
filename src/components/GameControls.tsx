
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GameState } from '@/types/game';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, RotateCcw, Play } from 'lucide-react';

interface GameControlsProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  onResetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ gameState, setGameState, onResetGame }) => {
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling || gameState.diceValue > 0) return;
    
    setIsRolling(true);
    
    // Simulate dice rolling animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * 6) + 1;
      setGameState(prev => ({ ...prev, diceValue: randomValue }));
      rollCount++;
      
      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setGameState(prev => ({ 
          ...prev, 
          diceValue: finalValue,
          gameStarted: true
        }));
        setIsRolling(false);
      }
    }, 100);
  };

  const startGame = () => {
    setGameState(prev => ({ ...prev, gameStarted: true }));
  };

  const getDiceIcon = (value: number) => {
    const icons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
    const IconComponent = icons[value - 1];
    return <IconComponent className="w-12 h-12" />;
  };

  const currentPlayer = gameState.players[gameState.currentPlayer];

  return (
    <Card className="animate-fade-in">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Game Controls</h3>
            {!gameState.gameStarted ? (
              <div className="space-y-4">
                <p className="text-lg text-gray-600">Ready to play Ludo?</p>
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
              </div>
            ) : (
              <>
                <p className="text-lg text-gray-600 mb-4">
                  Current Player: 
                  <span className={`ml-2 font-bold text-${currentPlayer.color}-600 capitalize`}>
                    {currentPlayer.color}
                  </span>
                </p>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <Button
                      onClick={rollDice}
                      disabled={isRolling || gameState.diceValue > 0}
                      className={`
                        relative w-20 h-20 rounded-xl text-white font-bold text-xl
                        ${isRolling ? 'animate-spin' : 'animate-bounce'}
                        ${currentPlayer.color === 'red' ? 'bg-red-500 hover:bg-red-600' : ''}
                        ${currentPlayer.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                        ${currentPlayer.color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                        ${currentPlayer.color === 'green' ? 'bg-green-500 hover:bg-green-600' : ''}
                        disabled:opacity-50 disabled:cursor-not-allowed
                      `}
                    >
                      {gameState.diceValue > 0 ? (
                        getDiceIcon(gameState.diceValue)
                      ) : (
                        <span className="text-4xl">🎲</span>
                      )}
                    </Button>
                    <p className="mt-2 text-sm font-medium">
                      {isRolling ? 'Rolling...' : gameState.diceValue > 0 ? `Rolled ${gameState.diceValue}` : 'Roll Dice'}
                    </p>
                  </div>
                  
                  {gameState.diceValue === 6 && (
                    <div className="text-center animate-bounce">
                      <div className="text-4xl">🎉</div>
                      <p className="text-sm font-bold text-green-600">Bonus Turn!</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-2">
                  {gameState.diceValue > 0 && (
                    <p className="text-sm text-gray-600 animate-fade-in">
                      Click on a piece to move it {gameState.diceValue} spaces
                    </p>
                  )}
                  
                  <Button
                    onClick={onResetGame}
                    variant="outline"
                    className="hover:bg-gray-100"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Game
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameControls;
