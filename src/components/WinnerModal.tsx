
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Player } from '@/types/game';
import { Trophy, Sparkles, RotateCcw } from 'lucide-react';

interface WinnerModalProps {
  isOpen: boolean;
  winner: Player | null;
  onClose: () => void;
  onPlayAgain: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, winner, onClose, onPlayAgain }) => {
  if (!winner) return null;

  const handlePlayAgain = () => {
    onClose();
    onPlayAgain();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Trophy className="w-20 h-20 text-yellow-500 animate-bounce" />
                <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-spin" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                🎉 Congratulations! 🎉
              </h2>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6 py-4">
          <div className="space-y-2">
            <div className={`w-16 h-16 rounded-full bg-${winner.color}-500 mx-auto animate-pulse`}></div>
            <h3 className="text-2xl font-bold capitalize text-gray-800">
              {winner.color} Player Wins!
            </h3>
            <p className="text-gray-600">
              All pieces have reached home safely! 🏠
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
            <p className="text-lg font-medium text-purple-800">
              Victory achieved! 
            </p>
            <p className="text-sm text-purple-600 mt-1">
              You've mastered the ancient game of Ludo!
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handlePlayAgain}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
            
            <Button 
              onClick={onClose}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerModal;
