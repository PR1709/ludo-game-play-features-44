
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameState } from '@/types/game';
import { Crown, User } from 'lucide-react';

interface PlayerPanelProps {
  gameState: GameState;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ gameState }) => {
  const getPlayerStats = (playerId: number) => {
    const player = gameState.players[playerId];
    const piecesAtHome = player.pieces.filter(p => p.position === -1).length;
    const piecesOnBoard = player.pieces.filter(p => p.position >= 0 && p.position < 52).length;
    const piecesInFinalStretch = player.pieces.filter(p => p.position >= 52 && p.position < 57).length;
    const piecesFinished = player.pieces.filter(p => p.position === 57).length;
    
    return { piecesAtHome, piecesOnBoard, piecesInFinalStretch, piecesFinished };
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseClasses = 'transition-all duration-300';
    const colorClasses = {
      red: `border-red-500 ${isActive ? 'bg-red-50 shadow-red-200' : ''}`,
      blue: `border-blue-500 ${isActive ? 'bg-blue-50 shadow-blue-200' : ''}`,
      yellow: `border-yellow-500 ${isActive ? 'bg-yellow-50 shadow-yellow-200' : ''}`,
      green: `border-green-500 ${isActive ? 'bg-green-50 shadow-green-200' : ''}`
    };
    
    return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses]} ${isActive ? 'border-2 shadow-lg scale-105' : 'border'}`;
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Players
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {gameState.players.map((player) => {
          const stats = getPlayerStats(player.id);
          const isCurrentPlayer = gameState.currentPlayer === player.id && gameState.gameStarted;
          
          return (
            <div
              key={player.id}
              className={getColorClasses(player.color, isCurrentPlayer)}
            >
              <div className="p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full bg-${player.color}-500`}></div>
                    <span className="font-semibold capitalize">{player.color}</span>
                    {player.isWinner && <Crown className="w-4 h-4 text-yellow-500" />}
                  </div>
                  {isCurrentPlayer && (
                    <span className="text-xs bg-yellow-200 px-2 py-1 rounded-full animate-pulse">
                      Current
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Home:</span>
                    <span className="font-medium">{stats.piecesAtHome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Board:</span>
                    <span className="font-medium">{stats.piecesOnBoard}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final:</span>
                    <span className="font-medium">{stats.piecesInFinalStretch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finished:</span>
                    <span className="font-medium text-green-600">{stats.piecesFinished}</span>
                  </div>
                </div>
                
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${player.color}-500 h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${(stats.piecesFinished / 4) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PlayerPanel;
