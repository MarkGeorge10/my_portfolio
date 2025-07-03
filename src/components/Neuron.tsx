import React, { useRef, useEffect, useState } from "react";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { NeuronProps, Position } from "@/types/project";

interface ExtendedNeuronProps extends NeuronProps {
  isMobile?: boolean;
  onDrag?: (position: Position) => void;
  isDraggable?: boolean;
}

const Neuron: React.FC<ExtendedNeuronProps> = ({
  project,
  position,
  isOutput = false,
  onClick,
  onHover,
  onDrag,
  isDraggable = false,
  isMobile = false,
}) => {
  // Individual neuron spring animation
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // Hover timer ref and progress state
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const [hoverProgress, setHoverProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Individual neuron drag handler
  const bind = useDrag(
    ({ down, movement: [mx, my], event }) => {
      if (!isDraggable) return;

      event?.stopPropagation(); // Prevent global drag

      if (down) {
        isDraggingRef.current = true;
        hasDraggedRef.current = false;
        setIsHovering(false);
        setHoverProgress(0);

        // Clear hover timers when dragging starts
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = null;
        }
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        api.start({ x: mx, y: my, immediate: true });
      } else {
        // Mark that a drag operation completed if there was movement
        const dragDistance = Math.sqrt(mx * mx + my * my);
        if (dragDistance > 5) {
          // Only consider it a drag if moved more than 5px
          hasDraggedRef.current = true;
        }

        // When drag ends, update the position and reset spring
        if (onDrag && dragDistance > 5) {
          onDrag({
            x: position.x + mx,
            y: position.y + my,
          });
        }
        api.start({ x: 0, y: 0 });

        // Reset dragging state after a short delay
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 100);

        // Reset drag completion flag after a longer delay to prevent click
        setTimeout(() => {
          hasDraggedRef.current = false;
        }, 200);
      }
    },
    {
      enabled: isDraggable,
    },
  );

  const getCategoryColor = (categoryId?: number) => {
    const colors = {
      1: "bg-blue-500", // AI/ML
      2: "bg-green-500", // Backend
      3: "bg-purple-500", // Frontend
      4: "bg-orange-500", // Mobile
      5: "bg-red-500", // HubSpot
    };
    return colors[categoryId as keyof typeof colors] || "bg-gray-500";
  };

  const getNeuronSize = () => {
    if (isMobile) {
      return isOutput ? "w-12 h-12" : "w-8 h-8";
    }
    return isOutput ? "w-16 h-16" : "w-12 h-12";
  };

  const getInnerSize = () => {
    if (isMobile) {
      return isOutput ? "w-8 h-8" : "w-6 h-6";
    }
    return isOutput ? "w-12 h-12" : "w-8 h-8";
  };

  const getOffset = () => {
    if (isMobile) {
      return isOutput ? 24 : 16;
    }
    return isOutput ? 32 : 24;
  };

  const categoryId = project ? Math.floor(project.id / 10000) : undefined;
  const offset = getOffset();

  // Hover handlers with progress animation
  const handleMouseEnter = () => {
    if (!project || !onHover || isDraggingRef.current) return;

    setIsHovering(true);
    setHoverProgress(0);

    // Clear any existing timers
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Start progress animation
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / 2000, 1) * 100;
      setHoverProgress(progress);

      if (progress >= 100) {
        clearInterval(progressIntervalRef.current!);
        progressIntervalRef.current = null;
      }
    }, 16); // ~60fps

    // Set the 2-second timer for modal opening
    hoverTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        onHover();
        setIsHovering(false);
        setHoverProgress(0);
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoverProgress(0);

    // Clear all timers when mouse leaves
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Click handler that prevents modal opening after drag
  const handleClick = (e: React.MouseEvent) => {
    // Prevent modal opening if a drag operation just completed
    if (hasDraggedRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Call the original onClick handler
    if (onClick) {
      onClick();
    }
  };

  const getCursorStyle = () => {
    if (isDraggable) return "cursor-move";
    return "cursor-pointer";
  };

  return (
    <animated.div
      {...(isDraggable ? bind() : {})}
      className={`absolute ${getNeuronSize()} rounded-full border-2 transition-all duration-300 ${
        isHovering
          ? "border-yellow-400 shadow-xl scale-110"
          : "border-white shadow-lg"
      } ${
        isOutput
          ? "bg-gradient-to-r from-purple-600 to-pink-600"
          : getCategoryColor(categoryId)
      } pointer-events-auto ${getCursorStyle()}`}
      style={{
        left: position.x - offset,
        top: position.y - offset,
        x: isDraggable ? x : 0,
        y: isDraggable ? y : 0,
        touchAction: isDraggable ? "none" : "auto",
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={project?.title || "Mark Fahim - AI Software Engineer"}
    >
      <div className="w-full h-full rounded-full flex items-center justify-center relative">
        {isOutput ? (
          <div
            className={`${getInnerSize()} rounded-full bg-white flex items-center justify-center ${
              isMobile ? "text-xs" : "text-xs"
            } font-bold text-purple-600`}
          >
            MF
          </div>
        ) : (
          <div
            className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} rounded-full bg-white bg-opacity-30 flex items-center justify-center`}
          >
            <div
              className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} rounded-full bg-white`}
            ></div>
          </div>
        )}
      </div>

      {/* Pulse animation for output neuron only */}
      {isOutput && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 animate-ping opacity-30"></div>
      )}

      {/* Hover progress ring */}
      {isHovering && project && (
        <div className="absolute inset-0 rounded-full">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="rgba(250, 204, 21, 0.3)"
              strokeWidth="2"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="rgb(250, 204, 21)"
              strokeWidth="2"
              strokeDasharray="62.83"
              strokeDashoffset={62.83 - (62.83 * hoverProgress) / 100}
              className="transition-all duration-75 ease-linear"
            />
          </svg>
        </div>
      )}

      {/* Drag indicator for draggable neurons */}
      {isDraggable && !isHovering && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
      )}

      {/* Hover instruction tooltip */}
      {isHovering && project && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
          Hold to view details...
        </div>
      )}
    </animated.div>
  );
};

export default Neuron;
