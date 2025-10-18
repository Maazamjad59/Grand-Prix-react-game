import React, { useState, useEffect, useRef } from 'react';
import { Position, Obstacle } from '../types';
import PlayerCar from './PlayerCar';
import ObstacleCar from './ObstacleCar';
import { useKeyPress } from '../hooks/useKeyPress';
import * as C from '../constants';

interface GameScreenProps {
  setScore: React.Dispatch<React.SetStateAction<number>>;
  endGame: () => void;
  score: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ setScore, endGame, score }) => {
  const [playerPos, setPlayerPos] = useState<Position>({ x: C.PLAYER_INITIAL_X, y: C.PLAYER_INITIAL_Y });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const keysPressed = useKeyPress();
  
  // FIX: The error "Expected 1 arguments, but got 0." likely refers to this line, with the reported line number being off by one.
  // When a generic type is provided to useRef, an initial value is expected.
  const gameLoopRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(performance.now());
  const obstacleSpawnTimerRef = useRef<number>(0);
  const scoreTimerRef = useRef<number>(0);

  const gameLoop = (currentTime: number) => {
    const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000; // in seconds
    lastFrameTimeRef.current = currentTime;

    // Update Player Position
    setPlayerPos(prev => {
      let newX = prev.x;
      if (keysPressed['ArrowLeft'] || keysPressed['a']) {
        newX -= C.PLAYER_SPEED * deltaTime;
      }
      if (keysPressed['ArrowRight'] || keysPressed['d']) {
        newX += C.PLAYER_SPEED * deltaTime;
      }
      newX = Math.max(0, Math.min(newX, C.GAME_WIDTH - C.PLAYER_WIDTH));
      return { ...prev, x: newX };
    });

    // Update Obstacles & Spawn New Ones
    obstacleSpawnTimerRef.current += deltaTime * 1000;
    if (obstacleSpawnTimerRef.current > C.OBSTACLE_SPAWN_INTERVAL) {
        obstacleSpawnTimerRef.current = 0;
        const newObstacle: Obstacle = {
            id: Date.now(),
            x: C.LANES[Math.floor(Math.random() * C.LANES.length)],
            y: -C.OBSTACLE_HEIGHT,
            color: C.OBSTACLE_COLORS[Math.floor(Math.random() * C.OBSTACLE_COLORS.length)],
            speed: Math.random() * (C.OBSTACLE_SPEED_MAX - C.OBSTACLE_SPEED_MIN) + C.OBSTACLE_SPEED_MIN
        };
        setObstacles(prev => [...prev, newObstacle]);
    }
    
    setObstacles(prev => 
      prev
        .map(obs => ({ ...obs, y: obs.y + obs.speed * deltaTime }))
        .filter(obs => obs.y < C.GAME_HEIGHT)
    );

    // Update Score
    scoreTimerRef.current += deltaTime * 1000;
    if (scoreTimerRef.current > 100) { // Update score every 100ms
        scoreTimerRef.current = 0;
        setScore(prev => prev + 1);
    }
    
    // Check for collisions
    setPlayerPos(currentPlayerPos => {
        for (const obs of obstacles) {
            if (
                currentPlayerPos.x < obs.x + C.OBSTACLE_WIDTH &&
                currentPlayerPos.x + C.PLAYER_WIDTH > obs.x &&
                currentPlayerPos.y < obs.y + C.OBSTACLE_HEIGHT &&
                currentPlayerPos.y + C.PLAYER_HEIGHT > obs.y
            ) {
                endGame();
                return currentPlayerPos; 
            }
        }
        return currentPlayerPos;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    lastFrameTimeRef.current = performance.now();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-full bg-gray-700 relative overflow-hidden">
      <div 
        className="absolute inset-0 road-animation"
        style={{
          backgroundImage: `linear-gradient(white 30%, rgba(255,255,255,0) 30%), linear-gradient(white 30%, rgba(255,255,255,0) 30%)`,
          backgroundSize: `2px 100px, 2px 100px`,
          backgroundRepeat: `repeat-y, repeat-y`,
          backgroundPosition: `33.33% 0, 66.67% 0`,
        }}
      ></div>
      <div className="absolute top-2 left-2 text-xl font-bold text-white bg-black/50 px-3 py-1 rounded">
        SCORE: {score}
      </div>
      <PlayerCar position={playerPos} />
      {obstacles.map(obs => (
        <ObstacleCar key={obs.id} position={{ x: obs.x, y: obs.y }} color={obs.color} />
      ))}
    </div>
  );
};

export default GameScreen;