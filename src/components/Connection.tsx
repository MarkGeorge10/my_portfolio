import React from 'react';
import { Position } from '@/types/project';

interface ConnectionProps {
  from: Position;
  to: Position;
  animated?: boolean;
}

const Connection: React.FC<ConnectionProps> = ({ from, to, animated = false }) => {
  const length = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

  return (
    <div
      className="absolute origin-left"
      style={{
        left: from.x,
        top: from.y,
        width: length,
        height: '2px',
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div
        className={`w-full h-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-60 ${
          animated ? 'animate-pulse' : ''
        }`}
      />
    </div>
  );
};

export default Connection;