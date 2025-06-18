import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp, PlusCircle, Edit3, Trash2, Home, RefreshCw } from 'lucide-react'; // Example icons

interface FileExplorerToolbarProps {
  onNavigateUp?: () => void;
  onNewFolder?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onHome?: () => void;
  onRefresh?: () => void;
  // Add other relevant actions
}

const FileExplorerToolbar: React.FC<FileExplorerToolbarProps> = ({
  onNavigateUp,
  onNewFolder,
  // onRename,
  // onDelete,
  onHome,
  onRefresh
}) => {
  console.log("Rendering FileExplorerToolbar");

  return (
    <div className="h-12 bg-gray-100 border-b border-gray-300 flex items-center px-2 space-x-1">
      <Button variant="ghost" size="icon" onClick={onNavigateUp} title="Navigate Up" disabled={!onNavigateUp}>
        <ArrowUp className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onHome} title="Home" disabled={!onHome}>
        <Home className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onRefresh} title="Refresh" disabled={!onRefresh}>
        <RefreshCw className="h-5 w-5" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300 mx-1" /> {/* Separator */}

      <Button variant="ghost" onClick={onNewFolder} className="text-sm px-2 py-1 h-auto" disabled={!onNewFolder}>
        <PlusCircle className="h-4 w-4 mr-1" /> New Folder
      </Button>
      {/* Add more buttons as needed e.g., Rename, Delete, View options */}
      {/* <Button variant="ghost" onClick={onRename} className="text-sm px-2 py-1 h-auto" disabled={!onRename}>
        <Edit3 className="h-4 w-4 mr-1" /> Rename
      </Button>
      <Button variant="ghost" onClick={onDelete} className="text-sm px-2 py-1 h-auto text-red-600 hover:text-red-700" disabled={!onDelete}>
        <Trash2 className="h-4 w-4 mr-1" /> Delete
      </Button> */}
    </div>
  );
};

export default FileExplorerToolbar;