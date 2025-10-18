
import React from 'react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, highScore, onRestart }) => {
  return (
    <div className="w-full h-full bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center crash-animation">
      <h1 className="text-6xl font-black text-red-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-widest mb-8">
        GAME OVER
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-xl border-2 border-gray-600 w-full max-w-xs">
        <div className="mb-6">
          <p className="text-lg text-gray-300">Your Score</p>
          <p className="text-5xl font-bold text-white">{score}</p>
        </div>
        <div>
          <p className="text-lg text-gray-300">High Score</p>
          <p className="text-3xl font-bold text-yellow-400">{highScore}</p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="mt-10 px-8 py-4 bg-indigo-500 text-white text-2xl font-bold rounded-lg shadow-lg hover:bg-indigo-600 transform hover:scale-105 transition-transform duration-200 ease-in-out border-b-4 border-indigo-700 active:border-b-0 active:translate-y-1"
      >
        PLAY AGAIN
      </button>
    </div>
  );
};

export default GameOverScreen;
