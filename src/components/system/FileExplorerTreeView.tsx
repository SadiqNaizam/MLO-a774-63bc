import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FileText } from 'lucide-react'; // Icons for tree view

export interface TreeNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

interface FileExplorerTreeViewProps {
  nodes: TreeNode[];
  onNodeSelect: (node: TreeNode) => void;
  selectedNodeId?: string | null;
}

interface TreeItemProps {
  node: TreeNode;
  onNodeSelect: (node: TreeNode) => void;
  selectedNodeId?: string | null;
  level: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, onNodeSelect, selectedNodeId, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent onNodeSelect when toggling
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = () => {
    onNodeSelect(node);
    if (hasChildren && !isOpen) { // Auto-open folder on select if it has children and is closed
        setIsOpen(true);
    }
  };

  const isSelected = selectedNodeId === node.id;

  return (
    <div>
      <div
        className={`flex items-center p-1 hover:bg-gray-200 cursor-pointer rounded ${isSelected ? 'bg-blue-100' : ''}`}
        style={{ paddingLeft: \`\${level * 16 + 4}px\` }}
        onClick={handleSelect}
      >
        {hasChildren ? (
          <button onClick={handleToggle} className="mr-1 focus:outline-none">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
        ) : (
          <span className="mr-1 w-4 inline-block" /> // Placeholder for alignment
        )}
        {node.type === 'folder' ? <Folder size={16} className="mr-1 text-yellow-600" /> : <FileText size={16} className="mr-1 text-gray-600" />}
        <span className="text-sm truncate">{node.name}</span>
      </div>
      {isOpen && hasChildren && (
        <div>
          {node.children?.map(childNode => (
            <TreeItem key={childNode.id} node={childNode} onNodeSelect={onNodeSelect} selectedNodeId={selectedNodeId} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorerTreeView: React.FC<FileExplorerTreeViewProps> = ({ nodes, onNodeSelect, selectedNodeId }) => {
  console.log("Rendering FileExplorerTreeView");
  return (
    <div className="p-2 text-gray-800">
      {nodes.map(node => (
        <TreeItem key={node.id} node={node} onNodeSelect={onNodeSelect} selectedNodeId={selectedNodeId} level={0} />
      ))}
    </div>
  );
};

export default FileExplorerTreeView;