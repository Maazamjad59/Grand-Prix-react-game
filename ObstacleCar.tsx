
import React from 'react';
import { Position } from '../types';
import { OBSTACLE_WIDTH, OBSTACLE_HEIGHT } from '../constants';

interface ObstacleCarProps {
  position: Position;
  color: string;
}

const ObstacleCar: React.FC<ObstacleCarProps> = ({ position, color }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${OBSTACLE_WIDTH}px`,
        height: `${OBSTACLE_HEIGHT}px`,
      }}
    >
      <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-md">
        {/* Main Body */}
        <rect x="10" y="10" width="80" height="180" rx="20" fill={color} stroke="black" strokeWidth="5"/>
        {/* Roof */}
        <rect x="20" y="40" width="60" height="90" rx="10" fill="rgba(0,0,0,0.3)" />
        {/* Windows */}
        <rect x="25" y="45" width="50" height="35" rx="5" fill="#a1a1aa"/>
        <rect x="25" y="85" width="50" height="40" rx="5" fill="#a1a1aa"/>
        {/* Headlights */}
        <rect x="20" y="15" width="20" height="10" fill="#fef08a" rx="5" />
        <rect x="60" y="15" width="20" height="10" fill="#fef08a" rx="5" />
        {/* Taillights */}
        <rect x="20" y="175" width="20" height="10" fill="#f87171" rx="5" />
        <rect x="60" y="175" width="20" height="10" fill="#f87171" rx="5" />
      </svg>
    </div>
  );
};

export default React.memo(ObstacleCar);
