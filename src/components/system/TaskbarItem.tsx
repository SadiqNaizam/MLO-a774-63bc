import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming TaskbarItem is clickable

interface TaskbarItemProps {
  appName: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  isMinimized?: boolean;
  onClick?: () => void;
}

const TaskbarItem: React.FC<TaskbarItemProps> = ({
  appName,
  icon,
  isActive,
  isMinimized,
  onClick,
}) => {
  console.log(`Rendering TaskbarItem: ${appName}, Active: ${isActive}, Minimized: ${isMinimized}`);

  return (
    <Button
      variant="ghost"
      className={`h-full px-3 py-1 text-xs flex items-center space-x-1 rounded-none hover:bg-gray-700
                  ${isActive ? 'bg-gray-600' : ''}
                  ${isMinimized && !isActive ? 'opacity-70' : ''}`}
      onClick={onClick}
      title={appName}
    >
      {icon || <div className="w-4 h-4 bg-gray-500 rounded-sm" />} {/* Placeholder icon */}
      <span>{appName.length > 10 ? `${appName.substring(0,8)}...` : appName}</span>
    </Button>
  );
};

export default TaskbarItem;