
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameState } from '@/types/game';
import { BarChart3, Clock, TrendingUp } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
}

const GameStats: React.FC<GameStatsProps> = ({ gameState }) => {
  const getGameDuration = () => {
    if (!gameState.gameStarted || gameState.gameHistory.length === 0) return '0:00';
    
    const firstMove = gameState.gameHistory[0];
    const lastMove = gameState.gameHistory[gameState.gameHistory.length - 1];
    const duration = (lastMove.timestamp - firstMove.timestamp) / 1000 / 60; // in minutes
    
    const minutes = Math.floor(duration);
    const seconds = Math.floor((duration - minutes) * 60);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const getPlayerMoveCount = () => {
    const moveCounts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    gameState.gameHistory.forEach(move => {
      moveCounts[move.playerId as keyof typeof moveCounts]++;
    });
    return moveCounts;
  };

  const getAverageDiceRoll = () => {
    if (gameState.gameHistory.length === 0) return 0;
    
    const totalDiceValue = gameState.gameHistory.reduce((sum, move) => sum + move.diceValue, 0);
    return (totalDiceValue / gameState.gameHistory.length).toFixed(1);
  };

  const getLuckyRolls = () => {
    return gameState.gameHistory.filter(move => move.diceValue === 6).length;
  };

  const moveCounts = getPlayerMoveCount();

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Game Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Duration</span>
            </div>
            <span className="text-lg font-bold text-blue-600">{getGameDuration()}</span>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="font-medium">Total Moves</span>
            </div>
            <span className="text-lg font-bold text-green-600">{gameState.totalMoves}</span>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Moves per Player</h4>
          {gameState.players.map(player => (
            <div key={player.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-${player.color}-500`}></div>
                <span className="capitalize text-sm">{player.color}</span>
              </div>
              <span className="font-medium">{moveCounts[player.id as keyof typeof moveCounts]}</span>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Average Dice Roll:</span>
            <span className="font-medium">{getAverageDiceRoll()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Lucky Rolls (6s):</span>
            <span className="font-medium text-yellow-600">{getLuckyRolls()}</span>
          </div>
        </div>

        {gameState.winner && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg animate-bounce">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <div>
                <p className="font-bold text-yellow-800">Winner!</p>
                <p className="text-sm text-yellow-700 capitalize">{gameState.winner.color} Player</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GameStats;
