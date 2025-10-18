
import React, { useState, useCallback, useEffect } from 'react';
import GameScreen from './components/GameScreen';
import MenuScreen from './components/MenuScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState } from './types';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Menu);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem('highScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  const startGame = useCallback(() => {
    setScore(0);
    setGameState(GameState.Playing);
  }, []);

  const endGame = useCallback(() => {
    setGameState(GameState.GameOver);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
  }, [score, highScore]);
  
  const renderGameState = () => {
    switch (gameState) {
      case GameState.Menu:
        return <MenuScreen onStart={startGame} highScore={highScore} />;
      case GameState.Playing:
        return <GameScreen setScore={setScore} endGame={endGame} score={score} />;
      case GameState.GameOver:
        return <GameOverScreen score={score} highScore={highScore} onRestart={startGame} />;
      default:
        return <MenuScreen onStart={startGame} highScore={highScore} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white font-sans">
      <div className="w-full max-w-sm aspect-[9/16] bg-gray-800 rounded-xl shadow-2xl p-4 border-4 border-indigo-500 relative overflow-hidden">
        {renderGameState()}
      </div>
    </div>
  );
};

export default App;
