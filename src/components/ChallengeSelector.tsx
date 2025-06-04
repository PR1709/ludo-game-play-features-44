
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Challenge } from '@/types/game';
import { BadgeIndianRupee, Trophy, Users } from 'lucide-react';

interface ChallengeSelectorProps {
  challenges: Challenge[];
  selectedChallenge: Challenge | null;
  onSelectChallenge: (challenge: Challenge) => void;
  onStartGame: () => void;
}

const ChallengeSelector: React.FC<ChallengeSelectorProps> = ({
  challenges,
  selectedChallenge,
  onSelectChallenge,
  onStartGame
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Choose Your Challenge
        </h2>
        <p className="text-gray-600">Select a challenge to start playing and win real money!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {challenges.map((challenge) => (
          <Card 
            key={challenge.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
              selectedChallenge?.id === challenge.id 
                ? 'ring-2 ring-purple-500 bg-purple-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onSelectChallenge(challenge)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-bold">{challenge.name}</CardTitle>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <BadgeIndianRupee className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">Entry Fee</span>
                </div>
                <span className="font-bold text-lg">
                  {challenge.currency}{challenge.entryFee}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm text-gray-600">Win Amount</span>
                </div>
                <span className="font-bold text-lg text-green-600">
                  {challenge.currency}{challenge.winningAmount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Players</span>
                </div>
                <span className="text-sm">
                  {challenge.participants}/{challenge.maxParticipants}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(challenge.participants / challenge.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedChallenge && (
        <div className="text-center animate-fade-in">
          <Card className="max-w-md mx-auto bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
            <CardContent className="p-6">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-purple-800">
                  {selectedChallenge.name} Selected!
                </h3>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-lg">{selectedChallenge.currency}{selectedChallenge.entryFee}</div>
                    <div className="text-gray-600">Entry Fee</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg text-green-600">{selectedChallenge.currency}{selectedChallenge.winningAmount}</div>
                    <div className="text-gray-600">Win Amount</div>
                  </div>
                </div>
                <Button 
                  onClick={onStartGame}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Start Game - Pay {selectedChallenge.currency}{selectedChallenge.entryFee}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ChallengeSelector;
