import React from 'react';
import { NeuronProps } from '@/types/project';

interface ExtendedNeuronProps extends NeuronProps {
  isMobile?: boolean;
}

const Neuron: React.FC<ExtendedNeuronProps> = ({ 
  project, 
  position, 
  isOutput = false, 
  onClick,
  isMobile = false 
}) => {
  const getCategoryColor = (categoryId?: number) => {
    const colors = {
      1: 'bg-blue-500',      // AI/ML
      2: 'bg-green-500',     // Backend
      3: 'bg-purple-500',    // Frontend
      4: 'bg-orange-500',    // Mobile
      5: 'bg-red-500',       // HubSpot
    };
    return colors[categoryId as keyof typeof colors] || 'bg-gray-500';
  };

  const getNeuronSize = () => {
    if (isMobile) {
      return isOutput ? 'w-12 h-12' : 'w-8 h-8';
    }
    return isOutput ? 'w-16 h-16' : 'w-12 h-12';
  };

  const getInnerSize = () => {
    if (isMobile) {
      return isOutput ? 'w-8 h-8' : 'w-6 h-6';
    }
    return isOutput ? 'w-12 h-12' : 'w-8 h-8';
  };

  const getOffset = () => {
    if (isMobile) {
      return isOutput ? 24 : 16;
    }
    return isOutput ? 32 : 24;
  };

  const categoryId = project ? Math.floor(project.id / 10000) : undefined;
  const offset = getOffset();

  return (
    <div
      className={`absolute ${getNeuronSize()} rounded-full border-2 border-white shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-110 hover:shadow-xl ${
        isOutput ? 'bg-gradient-to-r from-purple-600 to-pink-600' : getCategoryColor(categoryId)
      } pointer-events-auto`}
      style={{
        left: position.x - offset,
        top: position.y - offset,
      }}
      onClick={onClick}
      title={project?.title || 'Mark Fahim - AI Software Engineer'}
    >
      <div className="w-full h-full rounded-full flex items-center justify-center">
        {isOutput ? (
          <div className={`${getInnerSize()} rounded-full bg-white flex items-center justify-center ${
            isMobile ? 'text-xs' : 'text-xs'
          } font-bold text-purple-600`}>
            MF
          </div>
        ) : (
          <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} rounded-full bg-white bg-opacity-30 flex items-center justify-center`}>
            <div className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-full bg-white`}></div>
          </div>
        )}
      </div>
      
      {/* Pulse animation for output neuron */}
      {isOutput && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-30"></div>
      )}
    </div>
  );
};

export default Neuron;
