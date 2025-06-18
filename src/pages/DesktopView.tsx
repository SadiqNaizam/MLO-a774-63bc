import React, { useState, useCallback } from 'react';
import Taskbar from '@/components/system/Taskbar';
import DesktopIcon from '@/components/system/DesktopIcon';
import WindowFrame from '@/components/system/WindowFrame';
import StartMenuLayout from '@/components/system/StartMenuLayout'; // For the Start Menu content
import { Button } from '@/components/ui/button'; // ShadCN Button
import { Label } from '@/components/ui/label'; // ShadCN Label
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"; // ShadCN ContextMenu
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // ShadCN Popover for Start Menu
import { Settings, FileText, FolderOpen, Power } from 'lucide-react';

// Define types for desktop items and windows
interface DesktopItem {
  id: string;
  label: string;
  iconType: 'file' | 'folder' | 'image' | React.ReactNode;
  action: () => void; // Action to perform on double click
}

interface WindowItem {
  id: string;
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  isMinimized?: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: string | number; height: string | number };
  zIndex?: number;
}

// Mock content for windows
const SettingsContent = () => <div className="p-4">Settings Application Content Area. <p>Customize your experience here.</p></div>;
const FileExplorerContent = () => <div className="p-4">File Explorer Content Area. <p>Browse your files and folders.</p></div>;
const NotepadContent = () => <textarea className="w-full h-full p-2 border-none focus:ring-0 resize-none" placeholder="Type here..."></textarea>;


const DesktopView = () => {
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const [nextZIndex, setNextZIndex] = useState(10); // For managing window stacking

  React.useEffect(() => {
    console.log('DesktopView loaded');
  }, []);

  const openWindow = useCallback((id: string, title: string, content: React.ReactNode, initialPos?: {x:number, y:number}, initialSize?: {width: string|number, height:string|number}) => {
    setWindows(prevWindows => {
      const existingWindowIndex = prevWindows.findIndex(w => w.id === id);
      const newZIndex = nextZIndex + 1;
      setNextZIndex(newZIndex);

      if (existingWindowIndex !== -1) {
        // Window exists, bring to front and ensure it's open
        return prevWindows.map((w, index) =>
          index === existingWindowIndex ? { ...w, isOpen: true, isMinimized: false, zIndex: newZIndex } : w
        );
      } else {
        // New window
        return [
          ...prevWindows,
          { id, title, content, isOpen: true, isMinimized: false, initialPosition: initialPos || { x: Math.random() * 200 + 50, y: Math.random() * 100 + 50 }, initialSize: initialSize || { width: 600, height: 400 }, zIndex: newZIndex },
        ];
      }
    });
    setIsStartMenuOpen(false); // Close start menu when an app is launched
  }, [nextZIndex]);


  const toggleWindowMinimize = (id: string) => {
    setWindows(prevWindows =>
      prevWindows.map(w => (w.id === id ? { ...w, isMinimized: !w.isMinimized, isOpen: w.isMinimized ? true : w.isOpen } : w))
    );
  };

  const closeWindow = (id: string) => {
    setWindows(prevWindows => prevWindows.filter(w => w.id !== id));
  };
  
  const bringToFront = (id: string) => {
    setWindows(prevWindows => {
        const windowIndex = prevWindows.findIndex(w => w.id === id);
        if (windowIndex === -1 || prevWindows[windowIndex].zIndex === nextZIndex) return prevWindows;

        const newZIndex = nextZIndex + 1;
        setNextZIndex(newZIndex);
        return prevWindows.map(w => w.id === id ? {...w, zIndex: newZIndex, isMinimized: false} : w);
    });
};


  const desktopItems: DesktopItem[] = [
    { id: 'settings-app', label: 'Settings', iconType: <Settings className="w-10 h-10 mb-1 text-gray-400" />, action: () => openWindow('settings-app', 'Settings', <SettingsContent />) },
    { id: 'file-explorer-app', label: 'File Explorer', iconType: <FolderOpen className="w-10 h-10 mb-1 text-yellow-500" />, action: () => openWindow('file-explorer-app', 'File Explorer', <FileExplorerContent />) },
    { id: 'notepad-app', label: 'Notepad', iconType: <FileText className="w-10 h-10 mb-1 text-blue-300" />, action: () => openWindow('notepad-app', 'Notepad', <NotepadContent />, {x: 150, y:150}, {width: 400, height: 300}) },
    { id: 'my-computer', label: 'My Computer', iconType: 'folder', action: () => openWindow('file-explorer-my-computer', 'My Computer', <FileExplorerContent />) },
    { id: 'recycle-bin', label: 'Recycle Bin', iconType: <Folder className="w-10 h-10 mb-1 text-gray-500" />, action: () => console.log('Open Recycle Bin') },
  ];

  const startMenuItems = [
    { id: 'notepad-app', name: 'Notepad', icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: 'settings-app', name: 'Settings', icon: <Settings className="w-5 h-5 mr-2" /> },
    { id: 'file-explorer-app', name: 'File Explorer', icon: <FolderOpen className="w-5 h-5 mr-2" /> },
  ];

  const handleAppClick = (appId: string) => {
    if (appId === 'notepad-app') openWindow('notepad-app', 'Notepad', <NotepadContent />, {x: 150, y:150}, {width: 400, height: 300});
    else if (appId === 'settings-app') openWindow('settings-app', 'Settings', <SettingsContent />);
    else if (appId === 'file-explorer-app') openWindow('file-explorer-app', 'File Explorer', <FileExplorerContent />);
    setIsStartMenuOpen(false);
  };


  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?technology,desktop')" }}>
      <ContextMenu>
        <ContextMenuTrigger className="flex-grow relative p-4">
          {/* Desktop Icons Area */}
          <div className="flex flex-wrap gap-4">
            {desktopItems.map(item => (
              <DesktopIcon
                key={item.id}
                id={item.id}
                label={item.label}
                iconType={item.iconType}
                onDoubleClick={() => item.action()}
                onClick={() => console.log(`${item.label} clicked`)}
              />
            ))}
          </div>

          {/* Application Windows Area */}
          {windows.map(win => (
            !win.isMinimized && win.isOpen && (
              <div key={win.id} onMouseDown={() => bringToFront(win.id)}>
                <WindowFrame
                  title={win.title}
                  isOpen={win.isOpen}
                  onClose={() => closeWindow(win.id)}
                  onMinimize={() => toggleWindowMinimize(win.id)}
                  onMaximize={() => console.log(`Maximize ${win.title}`)} // Placeholder
                  initialPosition={win.initialPosition}
                  initialSize={win.initialSize}
                  zIndex={win.zIndex}
                >
                  {win.content}
                </WindowFrame>
              </div>
            )
          ))}
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>View Options</ContextMenuItem>
          <ContextMenuItem>Sort by</ContextMenuItem>
          <ContextMenuItem>Refresh</ContextMenuItem>
          <ContextMenuItem>New Folder</ContextMenuItem>
          <ContextMenuItem>Display Settings</ContextMenuItem>
          <ContextMenuItem>Personalize</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
        
      {/* Start Menu Popover */}
      <Popover open={isStartMenuOpen} onOpenChange={setIsStartMenuOpen}>
        <PopoverTrigger asChild>
          {/* This button is part of the Taskbar, but PopoverTrigger needs to be here */}
          {/* The actual Taskbar component will have its own button that calls setIsStartMenuOpen(true) */}
          {/* This is a structural requirement for Popover. The Taskbar's button will control 'isStartMenuOpen' */}
          <span /> 
        </PopoverTrigger>
        <PopoverContent 
            side="top" 
            align="start" 
            className="p-0 w-auto h-auto bg-transparent border-none shadow-none fixed bottom-12 left-0" // Positioned by Taskbar
            style={{ transform: 'translateY(0)', bottom: '3rem', left: '0.5rem' }} // Adjust if taskbar height changes
            onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus stealing
        >
            <StartMenuLayout
              apps={startMenuItems}
              userName="Simulated User"
              userAvatarUrl="https://source.unsplash.com/random/40x40?avatar"
              onAppClick={handleAppClick}
              onSearchChange={query => console.log('Search query:', query)}
              onSettingsClick={() => openWindow('settings-app', 'Settings', <SettingsContent />)}
              onAccountClick={() => console.log('Account clicked')}
              onSignOutClick={() => {
                // Simulate sign out, navigate to lock screen
                setWindows([]); // Close all windows
                setIsStartMenuOpen(false); // Close start menu
                // Ideally, use navigate ('/') but navigate is not available directly here.
                // This should be handled by a global state or passed function.
                // For now, log it. A real app would navigate.
                window.location.href = '/'; // Simple redirect
                console.log('Sign Out clicked, redirecting to /');
              }}
            />
        </PopoverContent>
      </Popover>

      <Taskbar 
        onStartButtonClick={() => {setIsStartMenuOpen(prev => !prev); if(!isStartMenuOpen) setNextZIndex(nextZIndex+1);}}
        // Pass open windows for taskbar items
        items={windows.map(w => ({
            id: w.id,
            appName: w.title,
            isActive: w.isOpen && !w.isMinimized && w.zIndex === nextZIndex, // Active if on top and not minimized
            isMinimized: !!w.isMinimized,
            onClick: () => {
                if (w.isMinimized) {
                    toggleWindowMinimize(w.id); // Unminimize
                }
                bringToFront(w.id); // Bring to front
            }
        }))}
       />
    </div>
  );
};

export default DesktopView;