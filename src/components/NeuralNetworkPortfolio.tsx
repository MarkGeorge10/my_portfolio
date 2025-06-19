import React, { useState, useEffect } from 'react';
import { Category, Project, Position } from '@/types/project';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Neuron from './Neuron';
import ProjectModal from './ProjectModal';
import PersonalModal from './PersonalModal';

interface NeuralNetworkPortfolioProps {
  categories: Category[];
}

const NeuralNetworkPortfolio: React.FC<NeuralNetworkPortfolioProps> = ({ categories }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  // Spring animation for drag interaction
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Drag gesture handler
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({ 
      x: down ? mx : 0, 
      y: down ? my : 0,
      immediate: down,
      config: { tension: 300, friction: 30 }
    });
  });

  useEffect(() => {
    const updateDimensions = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      
      if (isMobileDevice) {
        setDimensions({
          width: window.innerWidth - 20,
          height: window.innerHeight - 100,
        });
      } else {
        setDimensions({
          width: Math.max(1200, window.innerWidth - 100),
          height: Math.max(800, window.innerHeight - 200),
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const calculatePositions = () => {
    const positions: { [key: number]: Position } = {};
    const layerWidth = dimensions.width / (categories.length + 2);
    
    categories.forEach((category, categoryIndex) => {
      const layerX = layerWidth * (categoryIndex + 1);
      const projectCount = category.projects.length;
      const layerHeight = dimensions.height * (isMobile ? 0.7 : 0.8);
      const startY = (dimensions.height - layerHeight) / 2;
      
      category.projects.forEach((project, projectIndex) => {
        const y = startY + (layerHeight / (projectCount + 1)) * (projectIndex + 1);
        positions[project.id] = { x: layerX, y };
      });
    });

    const outputPosition: Position = {
      x: layerWidth * (categories.length + 1),
      y: dimensions.height / 2,
    };

    return { positions, outputPosition };
  };

  const { positions, outputPosition } = calculatePositions();

  const handleNeuronClick = (project?: Project) => {
    if (project) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const handleOutputClick = () => {
    setIsPersonalModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const closePersonalModal = () => {
    setIsPersonalModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <animated.div 
        {...bind()} 
        style={{ 
          x, 
          y, 
          touchAction: 'none',
          cursor: 'grab',
          width: '100%',
          height: '100%'
        }}
        className="relative"
      >
        {/* Category Labels */}
        {categories.map((category, index) => {
          const layerWidth = dimensions.width / (categories.length + 2);
          const x = layerWidth * (index + 1);
          return (
            <div
              key={category.id}
              className={`absolute text-white font-semibold text-center transform -translate-x-1/2 ${
                isMobile ? 'text-xs' : 'text-sm'
              }`}
              style={{
                left: x,
                top: isMobile ? 30 : 50,
                width: isMobile ? '100px' : '150px',
              }}
            >
              {category.name}
            </div>
          );
        })}

        {/* Output Label */}
        <div
          className={`absolute text-white font-semibold text-center transform -translate-x-1/2 ${
            isMobile ? 'text-xs' : 'text-sm'
          }`}
          style={{
            left: outputPosition.x,
            top: isMobile ? 30 : 50,
            width: isMobile ? '100px' : '150px',
          }}
        >
          Mark Fahim
        </div>

        {/* SVG for connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          {/* Connections from projects to output */}
          {Object.entries(positions).map(([projectId, position]) => (
            <line
              key={`connection-${projectId}`}
              x1={position.x}
              y1={position.y}
              x2={outputPosition.x}
              y2={outputPosition.y}
              stroke="url(#connectionGradient)"
              strokeWidth={isMobile ? "1" : "2"}
              opacity="0.6"
              className="animate-pulse"
            />
          ))}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Neurons for projects */}
        {categories.map(category =>
          category.projects.map(project => (
            <Neuron
              key={project.id}
              project={project}
              position={positions[project.id]}
              onClick={() => handleNeuronClick(project)}
              isMobile={isMobile}
            />
          ))
        )}

        {/* Output Neuron (You) */}
        <Neuron
          position={outputPosition}
          isOutput={true}
          onClick={handleOutputClick}
          isMobile={isMobile}
        />
      </animated.div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Personal Modal */}
      <PersonalModal
        isOpen={isPersonalModalOpen}
        onClose={closePersonalModal}
      />

      {/* Legend - Responsive positioning */}
      <div className={`absolute bg-black bg-opacity-50 rounded-lg p-4 text-white ${
        isMobile ? 'bottom-4 left-4 right-4' : 'bottom-8 right-8'
      }`}>
        <h3 className={`font-semibold mb-2 ${isMobile ? 'text-sm' : ''}`}>Neural Network Legend</h3>
        <div className={`space-y-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-blue-500 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span>AI/Machine Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-green-500 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span>Backend Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-purple-500 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span>Frontend Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-orange-500 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span>Mobile Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-red-500 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span>HubSpot Automation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full bg-gradient-to-r from-purple-600 to-pink-600 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`}></div>
            <span>Output (You)</span>
          </div>
        </div>
        <p className={`mt-2 opacity-75 ${isMobile ? 'text-xs' : 'text-xs'}`}>
          {isMobile ? 'Tap neurons for details' : 'Click on any neuron to view project details'}
        </p>
      </div>

      {/* Mobile drag instruction */}
      {isMobile && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-center">
          <p className="text-xs opacity-75">Drag to explore the network</p>
        </div>
      )}
    </div>
  );
};

export default NeuralNetworkPortfolio;