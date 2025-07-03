import React, { useRef, useEffect } from "react";
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

  // Hover timer ref
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);

  // Individual neuron drag handler
  const bind = useDrag(
    ({ down, movement: [mx, my], event }) => {
      if (!isDraggable) return;

      event?.stopPropagation(); // Prevent global drag

      if (down) {
        isDraggingRef.current = true;
        // Clear hover timer when dragging starts
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = null;
        }
        api.start({ x: mx, y: my, immediate: true });
      } else {
        // When drag ends, update the position and reset spring
        if (onDrag) {
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

  // Hover handlers
  const handleMouseEnter = () => {
    if (!project || !onHover || isDraggingRef.current) return;

    // Clear any existing timer
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    // Set a new 2-second timer
    hoverTimerRef.current = setTimeout(() => {
      if (!isDraggingRef.current) {
        onHover();
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    // Clear the timer when mouse leaves
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const getCursorStyle = () => {
    if (isDraggable) return "cursor-move";
    return "cursor-pointer";
  };

  return (
    <animated.div
      {...(isDraggable ? bind() : {})}
      className={`absolute ${getNeuronSize()} rounded-full border-2 border-white shadow-lg transform transition-all duration-300 ${
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
      onClick={onClick}
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

      {/* Drag indicator for draggable neurons */}
      {isDraggable && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
      )}
    </animated.div>
  );
};

export default Neuron;
