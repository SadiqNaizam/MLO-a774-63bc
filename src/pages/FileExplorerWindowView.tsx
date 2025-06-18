import React, { useState } from 'react';
import WindowFrame from '@/components/system/WindowFrame';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileExplorerToolbar from '@/components/system/FileExplorerToolbar';
import FileExplorerTreeView, { TreeNode } from '@/components/system/FileExplorerTreeView';
import FileExplorerListItem, { FileItem } from '@/components/system/FileExplorerListItem';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Folder, File as FileIcon, GripVertical } from 'lucide-react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";


// Mock data
const initialTreeNodes: TreeNode[] = [
  { id: 'desktop', name: 'Desktop', type: 'folder', children: [
    { id: 'desktop-file1', name: 'My Notes.txt', type: 'file' },
  ]},
  { id: 'documents', name: 'Documents', type: 'folder', children: [
    { id: 'doc-work', name: 'Work', type: 'folder', children: [
      { id: 'report-q1', name: 'Quarterly Report.docx', type: 'file' },
    ]},
    { id: 'doc-personal', name: 'Personal', type: 'folder' },
  ]},
  { id: 'pictures', name: 'Pictures', type: 'folder', children: [
    { id: 'pic-vacation', name: 'Vacation 2023', type: 'folder', children: [
       { id: 'img1', name: 'beach.jpg', type: 'file' }, // 'image' type not in TreeNode, but fine for display
    ]},
  ]},
  { id: 'downloads', name: 'Downloads', type: 'folder' },
];

const getMockFilesForNode = (nodeId: string): FileItem[] => {
  if (nodeId === 'desktop') return [{ id: 'desktop-file1', name: 'My Notes.txt', type: 'file', size: '1 KB', dateModified: '2023-10-27' }];
  if (nodeId === 'doc-work') return [{ id: 'report-q1', name: 'Quarterly Report.docx', type: 'file', size: '120 KB', dateModified: '2023-10-25' }];
  if (nodeId === 'pic-vacation') return [{ id: 'img1', name: 'beach.jpg', type: 'image', size: '2.3 MB', dateModified: '2023-08-15' }];
  if (nodeId === 'documents') return [
    { id: 'doc-work', name: 'Work', type: 'folder', dateModified: '2023-10-25' },
    { id: 'doc-personal', name: 'Personal', type: 'folder', dateModified: '2023-10-20' },
  ];
   if (nodeId === 'pictures') return [ { id: 'pic-vacation', name: 'Vacation 2023', type: 'folder', dateModified: '2023-08-15' }];
  return [];
};


const FileExplorerWindowView = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentPath, setCurrentPath] = useState<TreeNode[]>( [initialTreeNodes[0]] ); // Start at Desktop
  const [currentFiles, setCurrentFiles] = useState<FileItem[]>(getMockFilesForNode(initialTreeNodes[0].id));
  const [selectedFileItemId, setSelectedFileItemId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');
  const [selectedTreeNodeId, setSelectedTreeNodeId] = useState<string | null>(initialTreeNodes[0].id);

  React.useEffect(() => {
    console.log('FileExplorerWindowView loaded');
  }, []);

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedTreeNodeId(node.id);
    // Update current path - simplistic for now, assumes direct child
    const pathParts: TreeNode[] = [];
    const findPath = (nodes: TreeNode[], targetId: string, currentPathArr: TreeNode[]): boolean => {
        for (const n of nodes) {
            const newPath = [...currentPathArr, n];
            if (n.id === targetId) {
                setCurrentPath(newPath);
                return true;
            }
            if (n.children && findPath(n.children, targetId, newPath)) {
                return true;
            }
        }
        return false;
    }
    findPath(initialTreeNodes, node.id, []);
    setCurrentFiles(getMockFilesForNode(node.id));
    setSelectedFileItemId(null);
  };

  const handleFileSelect = (itemId: string) => {
    setSelectedFileItemId(itemId);
  };

  const handleFileDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      // Find the corresponding TreeNode and navigate
      const findNode = (nodes: TreeNode[], id: string): TreeNode | undefined => {
        for (const n of nodes) {
          if (n.id === id) return n; // Assuming file item id matches tree node id for folders
          if (n.children) {
            const found = findNode(n.children, id);
            if (found) return found;
          }
        }
        return undefined;
      };
      // Need to search entire tree, not just current selected node's children
      const nodeToOpen = findNode(initialTreeNodes, item.id);
      if (nodeToOpen) {
        handleNodeSelect(nodeToOpen);
      } else {
         alert(`Cannot open folder: ${item.name}. Node not found in tree.`);
      }
    } else {
      alert(`Opening file: ${item.name} (Type: ${item.type})`);
    }
  };
  
  const navigateHome = () => {
    handleNodeSelect(initialTreeNodes[0]); // Assuming 'Desktop' or a root node is first
  };
  
  const navigateUp = () => {
    if (currentPath.length > 1) {
        const parentNode = currentPath[currentPath.length - 2];
        handleNodeSelect(parentNode);
    }
  };


  if (!isOpen) {
    return <div className="p-4">File Explorer window is closed. <Button onClick={() => setIsOpen(true)}>Reopen</Button></div>;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
      <WindowFrame
        title="File Explorer"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => console.log("Minimize File Explorer (standalone)")}
        onMaximize={() => console.log("Maximize File Explorer (standalone)")}
        initialSize={{ width: '80vw', height: '70vh' }}
        initialPosition={{x: 50, y: 50}}
      >
        <div className="flex flex-col h-full bg-white">
          <div className="p-2 border-b flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={navigateUp} disabled={currentPath.length <=1}><Home className="h-4 w-4" /></Button>
            <Breadcrumb className="flex-grow">
              <BreadcrumbList>
                {currentPath.map((p, index) => (
                    <React.Fragment key={p.id}>
                     {index > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {index === currentPath.length - 1 ? (
                        <BreadcrumbPage>{p.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink onClick={() => handleNodeSelect(p)} className="cursor-pointer">
                          {p.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <Input type="search" placeholder="Search..." className="w-48 h-8" />
          </div>
          <FileExplorerToolbar 
            onNavigateUp={currentPath.length > 1 ? navigateUp : undefined}
            onHome={navigateHome}
            onNewFolder={() => alert("New Folder clicked")}
            onRefresh={() => handleNodeSelect(currentPath[currentPath.length - 1])} // Refresh current view
          />
          <ResizablePanelGroup direction="horizontal" className="flex-grow min-h-0">
            <ResizablePanel defaultSize={25} minSize={15} className="bg-gray-50">
              <ScrollArea className="h-full p-1">
                <FileExplorerTreeView nodes={initialTreeNodes} onNodeSelect={handleNodeSelect} selectedNodeId={selectedTreeNodeId} />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-gray-300 w-1 hover:bg-blue-500 transition-colors">
                <GripVertical className="h-4 w-4 text-gray-600" />
            </ResizableHandle>
            <ResizablePanel defaultSize={75} minSize={30}>
              <div className="flex flex-col h-full">
                <div className="p-1 border-b flex justify-end">
                  <Select value={viewMode} onValueChange={(value) => setViewMode(value as 'list' | 'table')}>
                    <SelectTrigger className="w-[120px] h-8 text-xs">
                      <SelectValue placeholder="View mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="list">List</SelectItem>
                      <SelectItem value="table">Details</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <ScrollArea className="flex-grow">
                  <ContextMenu>
                    <ContextMenuTrigger disabled={currentFiles.length === 0} className="block min-h-full"> {/* Ensure trigger covers area */}
                      {currentFiles.length === 0 && <p className="text-center text-gray-500 p-8">This folder is empty.</p>}
                      {viewMode === 'list' && currentFiles.length > 0 && (
                        <div>
                          {currentFiles.map(item => (
                            <FileExplorerListItem
                              key={item.id}
                              item={item}
                              isSelected={selectedFileItemId === item.id}
                              onSelect={handleFileSelect}
                              onDoubleClick={handleFileDoubleClick}
                            />
                          ))}
                        </div>
                      )}
                      {viewMode === 'table' && currentFiles.length > 0 && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-8"></TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Date modified</TableHead>
                              <TableHead className="text-right">Size</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentFiles.map(item => (
                              <TableRow 
                                key={item.id} 
                                onClick={() => handleFileSelect(item.id)} 
                                onDoubleClick={() => handleFileDoubleClick(item)}
                                className={selectedFileItemId === item.id ? "bg-blue-100" : ""}
                              >
                                <TableCell className="py-1 px-2">
                                    {item.type === 'folder' ? <Folder size={18} className="text-yellow-600"/> : <FileIcon size={18} className="text-gray-600"/>}
                                </TableCell>
                                <TableCell className="py-1 px-2">{item.name}</TableCell>
                                <TableCell className="py-1 px-2">{item.dateModified}</TableCell>
                                <TableCell className="text-right py-1 px-2">{item.size}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>Open</ContextMenuItem>
                      <ContextMenuItem>Copy</ContextMenuItem>
                      <ContextMenuItem>Paste</ContextMenuItem>
                      <ContextMenuItem>Rename</ContextMenuItem>
                      <ContextMenuItem className="text-red-600">Delete</ContextMenuItem>
                      <ContextMenuItem>Properties</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </WindowFrame>
    </div>
  );
};

export default FileExplorerWindowView;