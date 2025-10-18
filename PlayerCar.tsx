
import React from 'react';
import { Position } from '../types';
import { PLAYER_WIDTH, PLAYER_HEIGHT } from '../constants';

interface PlayerCarProps {
  position: Position;
}

const PlayerCar: React.FC<PlayerCarProps> = ({ position }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${PLAYER_WIDTH}px`,
        height: `${PLAYER_HEIGHT}px`,
        transition: 'left 50ms linear',
      }}
    >
      <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-lg">
        {/* Main Body */}
        <path d="M10 20 L 10 180 Q 50 210, 90 180 L 90 20 Q 50 -10, 10 20 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="5"/>
        {/* Stripe */}
        <path d="M45 0 L 45 200 M55 0 L 55 200" stroke="white" strokeWidth="6"/>
        {/* Windshield */}
        <path d="M20 50 Q 50 40, 80 50 L 80 90 Q 50 110, 20 90 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="4"/>
        {/* Rear Wing */}
        <rect x="5" y="170" width="90" height="15" fill="#4b5563" stroke="#1f2937" strokeWidth="4" rx="5"/>
        <rect x="20" y="165" width="60" height="25" fill="#4b5563" stroke="#1f2937" strokeWidth="4" rx="5"/>
      </svg>
    </div>
  );
};

export default React.memo(PlayerCar);
