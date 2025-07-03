"use client";
import React, { useState, useEffect } from "react";
import { Category, Project, Position } from "@/types/project";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Neuron from "./Neuron";
import ProjectModal from "./ProjectModal";
import PersonalModal from "./PersonalModal";

interface NeuralNetworkPortfolioProps {
  categories: Category[];
}

const NeuralNetworkPortfolio: React.FC<NeuralNetworkPortfolioProps> = ({
  categories,
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isMobile, setIsMobile] = useState(false);
  const [neuronPositions, setNeuronPositions] = useState<{
    [key: number]: Position;
  }>({});
  const [isClient, setIsClient] = useState(false);

  // Spring animation for global drag interaction
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Global drag gesture handler
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start({
      x: down ? mx : 0,
      y: down ? my : 0,
      immediate: down,
      config: { tension: 300, friction: 30 },
    });
  });

  useEffect(() => {
    setIsClient(true);

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
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Simple seeded random number generator for deterministic positioning
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  // 3D Brain-shaped positioning algorithm with category clustering
  const calculateBrainPositions = () => {
    const positions: { [key: number]: Position } = {};
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const brainWidth = Math.min(dimensions.width * 0.6, 600);
    const brainHeight = Math.min(dimensions.height * 0.6, 400);

    // Define brain regions for each category with better spacing
    const brainRegions = [
      {
        x: centerX - brainWidth * 0.35,
        y: centerY - brainHeight * 0.25,
        radius: brainWidth * 0.18,
      }, // AI/ML - frontal lobe
      {
        x: centerX + brainWidth * 0.35,
        y: centerY - brainHeight * 0.25,
        radius: brainWidth * 0.18,
      }, // Backend - parietal lobe
      {
        x: centerX - brainWidth * 0.25,
        y: centerY + brainHeight * 0.15,
        radius: brainWidth * 0.15,
      }, // Frontend - temporal lobe
      {
        x: centerX + brainWidth * 0.25,
        y: centerY + brainHeight * 0.15,
        radius: brainWidth * 0.15,
      }, // Mobile - occipital lobe
      { x: centerX, y: centerY - brainHeight * 0.4, radius: brainWidth * 0.12 }, // HubSpot - cerebellum
    ];

    categories.forEach((category, categoryIndex) => {
      const region = brainRegions[categoryIndex] || brainRegions[0];

      category.projects.forEach((project, projectIndex) => {
        // Better spacing within brain regions using deterministic positioning
        const angle = (projectIndex / category.projects.length) * Math.PI * 2;
        const radiusSeed = project.id * 123 + categoryIndex * 456; // Use project ID as seed
        const radius = region.radius * (0.4 + seededRandom(radiusSeed) * 0.6); // Increased minimum radius for better spacing

        const xSeed = project.id * 789 + projectIndex * 321;
        const ySeed = project.id * 654 + projectIndex * 987;
        const x =
          region.x +
          Math.cos(angle) * radius +
          (seededRandom(xSeed) - 0.5) * 25; // Increased randomness spread
        const y =
          region.y +
          Math.sin(angle) * radius +
          (seededRandom(ySeed) - 0.5) * 25;

        positions[project.id] = { x, y };
      });
    });

    // Central output position (brain stem)
    const outputPosition: Position = {
      x: centerX,
      y: centerY + brainHeight / 3,
    };

    return { positions, outputPosition };
  };

  const { positions, outputPosition } = calculateBrainPositions();

  // Initialize neuron positions only on client-side
  useEffect(() => {
    if (isClient) {
      setNeuronPositions(positions);
    }
  }, [dimensions, isClient]); // Added isClient dependency

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

  // Handle individual neuron drag
  const handleNeuronDrag = (projectId: number, newPosition: Position) => {
    setNeuronPositions((prev) => ({
      ...prev,
      [projectId]: newPosition,
    }));
  };

  // Use neuron positions (either dragged or default)
  const currentPositions =
    Object.keys(neuronPositions).length > 0 ? neuronPositions : positions;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* ... keep existing code (animated div, title, SVG, neurons, modals, legend) */}
      <animated.div
        {...bind()}
        style={{
          x,
          y,
          touchAction: "none",
          cursor: "grab",
          width: "100%",
          height: "100%",
        }}
        className="relative"
      >
        {/* Brain Title */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 z-10 text-center ${isMobile ? "top-16" : "top-8"}`}
        >
          <h1
            className={`font-bold text-white mb-2 ${isMobile ? "text-xl" : "text-4xl"}`}
          >
            Portfolio
          </h1>
          <p className={`text-blue-200 ${isMobile ? "text-xs" : "text-xl"}`}>
            Mark Fahim - AI Software Engineer
          </p>
        </div>

        {/* SVG for brain connections - only render on client to prevent hydration mismatch */}
        {isClient && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: dimensions.width, height: dimensions.height }}
          >
            {/* Neural connections between nearby neurons */}
            {Object.entries(currentPositions).map(([projectId, position]) => {
              return Object.entries(currentPositions).map(
                ([otherProjectId, otherPosition]) => {
                  if (projectId !== otherProjectId) {
                    const distance = Math.sqrt(
                      Math.pow(position.x - otherPosition.x, 2) +
                        Math.pow(position.y - otherPosition.y, 2),
                    );
                    // Only connect nearby neurons (brain-like connectivity) - increased threshold for better spacing
                    if (distance < 150) {
                      return (
                        <line
                          key={`connection-${projectId}-${otherProjectId}`}
                          x1={position.x}
                          y1={position.y}
                          x2={otherPosition.x}
                          y2={otherPosition.y}
                          stroke="url(#brainGradient)"
                          strokeWidth={isMobile ? "0.5" : "1"}
                          opacity="0.3"
                        />
                      );
                    }
                  }
                  return null;
                },
              );
            })}

            {/* Connections to central output */}
            {Object.entries(currentPositions).map(([projectId, position]) => (
              <line
                key={`output-connection-${projectId}`}
                x1={position.x}
                y1={position.y}
                x2={outputPosition.x}
                y2={outputPosition.y}
                stroke="url(#outputGradient)"
                strokeWidth={isMobile ? "1" : "2"}
                opacity="0.4"
              />
            ))}

            {/* Gradient definitions */}
            <defs>
              <linearGradient
                id="brainGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.6" />
              </linearGradient>
              <linearGradient
                id="outputGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Neurons for projects */}
        {categories.map((category) =>
          category.projects.map((project) => (
            <Neuron
              key={project.id}
              project={project}
              position={currentPositions[project.id] || positions[project.id]}
              onClick={() => handleNeuronClick(project)}
              onDrag={(newPosition) =>
                handleNeuronDrag(project.id, newPosition)
              }
              isMobile={isMobile}
              isDraggable={true}
            />
          )),
        )}

        {/* Central Output Neuron (Brain Stem) */}
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

      {/* Legend - Brain themed - Hidden on mobile */}
      {!isMobile && (
        <div className="absolute bg-black bg-opacity-60 rounded-lg p-4 text-white backdrop-blur-sm bottom-8 right-8">
          {/* 🧠 Neural Brain Legend */}
          <h3 className="font-semibold mb-2">Projects</h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-500 w-4 h-4"></div>
              <span>AI/Machine Learning </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-green-500 w-4 h-4"></div>
              <span>Backend Development </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-purple-500 w-4 h-4"></div>
              <span>Frontend Development </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-orange-500 w-4 h-4"></div>
              <span>Mobile Development </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-500 w-4 h-4"></div>
              <span>HubSpot Automation </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 w-4 h-4"></div>
              <span>Central Processing (You)</span>
            </div>
          </div>
          <p className="mt-2 opacity-75 text-xs">
            Click neurons for details • Drag neurons to move them
          </p>
        </div>
      )}

      {/* Mobile Let's Connect Button */}
      {isMobile && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <button
            onClick={handleOutputClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
          >
            🚀 Let's Connect
          </button>
        </div>
      )}

      {/* Mobile drag instruction */}
      {isMobile && (
        <div className="absolute top-32 left-1/2 transform -translate-x-1/2 text-white text-center px-4 z-10">
          <div className="bg-black bg-opacity-50 rounded-lg px-3 py-2 backdrop-blur-sm">
            <p className="text-xs opacity-90">🧠 Drag neurons to explore</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuralNetworkPortfolio;
