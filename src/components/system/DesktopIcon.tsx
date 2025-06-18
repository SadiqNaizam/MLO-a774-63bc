import React from 'react';
import { FileText, Folder, Image as ImageIcon } from 'lucide-react'; // Example icons

interface DesktopIconProps {
  id: string;
  label: string;
  iconType?: 'file' | 'folder' | 'image' | React.ReactNode; // Allow custom icon component
  onDoubleClick?: (id: string) => void;
  onClick?: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  iconType = 'file',
  onDoubleClick,
  onClick,
}) => {
  console.log(`Rendering DesktopIcon: ${label}`);

  const handleDoubleClick = () => {
    if (onDoubleClick) onDoubleClick(id);
    console.log(`DesktopIcon: ${label} double-clicked`);
  };

  const handleClick = () => {
    if (onClick) onClick(id);
    console.log(`DesktopIcon: ${label} clicked`);
  };

  const renderIcon = () => {
    if (React.isValidElement(iconType)) {
        return React.cloneElement(iconType as React.ReactElement, { className: "w-10 h-10 mb-1" });
    }
    switch (iconType) {
      case 'folder':
        return <Folder className="w-10 h-10 mb-1 text-yellow-500" />;
      case 'image':
        return <ImageIcon className="w-10 h-10 mb-1 text-blue-500" />;
      case 'file':
      default:
        return <FileText className="w-10 h-10 mb-1 text-gray-300" />;
    }
  };

  return (
    <div
      className="flex flex-col items-center p-2 w-24 h-28 text-center text-white hover:bg-blue-500 hover:bg-opacity-30 rounded cursor-pointer select-none"
      onDoubleClick={handleDoubleClick}
      onClick={handleClick}
      title={label}
    >
      {renderIcon()}
      <span className="text-xs break-words line-clamp-2 leading-tight">{label}</span>
    </div>
  );
};

export default DesktopIcon;