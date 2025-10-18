
import React from 'react';

interface MenuScreenProps {
  onStart: () => void;
  highScore: number;
}

const MenuScreen: React.FC<MenuScreenProps> = ({ onStart, highScore }) => {
  return (
    <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-5xl font-black text-indigo-400 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-wider mb-4">
        GEMINI
      </h1>
      <h2 className="text-5xl font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-widest mb-12">
        GRAND PRIX
      </h2>

      <div className="mb-8">
        <p className="text-lg text-gray-300">High Score</p>
        <p className="text-4xl font-bold text-yellow-400">{highScore}</p>
      </div>

      <button
        onClick={onStart}
        className="px-8 py-4 bg-green-500 text-white text-2xl font-bold rounded-lg shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-200 ease-in-out border-b-4 border-green-700 active:border-b-0 active:translate-y-1"
      >
        START RACE
      </button>

      <div className="mt-12 text-gray-400">
        <p className="font-bold mb-2">Controls:</p>
        <p>Use <span className="font-mono bg-gray-700 px-2 py-1 rounded">Arrow Keys</span> or</p>
        <p><span className="font-mono bg-gray-700 px-2 py-1 rounded">A</span> / <span className="font-mono bg-gray-700 px-2 py-1 rounded">D</span> to steer</p>
      </div>
    </div>
  );
};

export default MenuScreen;
