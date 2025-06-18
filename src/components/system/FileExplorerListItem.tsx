import React from 'react';
import { Folder, FileText, Image as ImageIcon, Music, Video, Archive } from 'lucide-react'; // Example icons

export interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'image' | 'audio' | 'video' | 'archive'; // Extended types
  size?: string; // e.g., "1.2 MB", "23 KB"
  dateModified?: string; // e.g., "2023-10-26"
  // Potentially other metadata
}

interface FileExplorerListItemProps {
  item: FileItem;
  isSelected?: boolean;
  onSelect: (itemId: string) => void;
  onDoubleClick: (item: FileItem) => void;
}

const FileExplorerListItem: React.FC<FileExplorerListItemProps> = ({
  item,
  isSelected,
  onSelect,
  onDoubleClick,
}) => {
  console.log(`Rendering FileExplorerListItem: ${item.name}`);

  const getIcon = () => {
    switch (item.type) {
      case 'folder': return <Folder className="w-5 h-5 text-yellow-500" />;
      case 'image': return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case 'audio': return <Music className="w-5 h-5 text-purple-500" />;
      case 'video': return <Video className="w-5 h-5 text-red-500" />;
      case 'archive': return <Archive className="w-5 h-5 text-orange-500" />;
      case 'file':
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div
      className={`flex items-center p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer text-sm
                  ${isSelected ? 'bg-blue-100 ring-1 ring-blue-300' : ''}`}
      onClick={() => onSelect(item.id)}
      onDoubleClick={() => onDoubleClick(item)}
      role="button"
      tabIndex={0}
      aria-selected={isSelected}
    >
      <div className="w-8 flex-shrink-0">{getIcon()}</div>
      <div className="flex-grow truncate min-w-0 pr-2" title={item.name}>{item.name}</div>
      {item.dateModified && <div className="w-32 flex-shrink-0 text-gray-500 text-xs pr-2 truncate" title={item.dateModified}>{item.dateModified}</div>}
      {item.size && <div className="w-20 flex-shrink-0 text-right text-gray-500 text-xs truncate" title={item.size}>{item.size}</div>}
    </div>
  );
};

export default FileExplorerListItem;