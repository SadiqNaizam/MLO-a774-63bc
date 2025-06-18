import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Minimize2,Maximize2, Minus } from 'lucide-react'; // Window control icons

interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean; // To control visibility
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  // Basic positioning and sizing, more advanced would require state and drag/resize libraries
  initialPosition?: { x: number; y: number };
  initialSize?: { width: string | number; height: string | number };
  zIndex?: number;
}

const WindowFrame: React.FC<WindowFrameProps> = ({
  title,
  children,
  isOpen,
  onClose,
  onMinimize,
  onMaximize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 600, height: 400 },
  zIndex = 10,
}) => {
  console.log(`Rendering WindowFrame: ${title}, IsOpen: ${isOpen}`);

  if (!isOpen) {
    return null;
  }

  // Basic styling for now, actual drag/resize would need more complex state/logic
  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${initialPosition.y}px`,
    left: `${initialPosition.x}px`,
    width: typeof initialSize.width === 'number' ? `${initialSize.width}px` : initialSize.width,
    height: typeof initialSize.height === 'number' ? `${initialSize.height}px` : initialSize.height,
    zIndex,
  };

  return (
    <div
      style={style}
      className="bg-gray-700 border border-gray-500 rounded-lg shadow-2xl flex flex-col overflow-hidden resize" // Added resize for basic OS-level resize
    >
      {/* Title Bar */}
      <div className="h-8 bg-gray-800 text-white flex items-center justify-between px-2 select-none cursor-grab active:cursor-grabbing">
        <span className="text-sm font-medium truncate">{title}</span>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-300 hover:bg-gray-600 hover:text-white" onClick={onMinimize} aria-label="Minimize">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-300 hover:bg-gray-600 hover:text-white" onClick={onMaximize} aria-label="Maximize">
            <Maximize2 className="h-3 w-3" /> {/* Use Square icon for Maximize, or a dedicated Maximize icon */}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:bg-red-600 hover:text-white" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-1 bg-gray-200 text-black overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;