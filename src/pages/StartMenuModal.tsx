import React from 'react';
import StartMenuLayout from '@/components/system/StartMenuLayout';
import { Input } from '@/components/ui/input'; // Although StartMenuLayout uses Input, listed in layout-info
import { ScrollArea } from '@/components/ui/scroll-area'; // Same as above
import { Button } from '@/components/ui/button'; // Same as above
import { Avatar } from '@/components/ui/avatar'; // Same as above
import { Separator } from '@/components/ui/separator'; // Same as above
// Menubar is listed but StartMenuLayout seems to cover its functionality with buttons.
// If a separate Menubar was intended, it's not clear how it integrates with StartMenuLayout.
import { FileText, Settings, FolderOpen, Power } from 'lucide-react'; // Icons for placeholder apps

const StartMenuModal = () => {
  console.log('StartMenuModal Page loaded');

  const placeholderApps = [
    { id: 'app1', name: 'Placeholder App 1', icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: 'app2', name: 'Another Application', icon: <Settings className="w-5 h-5 mr-2" /> },
    { id: 'app3', name: 'Cool Utility', icon: <FolderOpen className="w-5 h-5 mr-2" /> },
    { id: 'app4', name: 'Game Launcher', icon: <Power className="w-5 h-5 mr-2" /> },
  ];

  const handleAppClick = (appId: string) => {
    alert(`App ${appId} clicked! This page is a standalone Start Menu representation.`);
  };

  const handleSearch = (query: string) => {
    console.log("Start Menu Search (standalone page):", query);
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50 p-4">
      {/* This page displays StartMenuLayout as if it's the main content. */}
      {/* In a real scenario, StartMenuLayout would be in a Popover/Dialog on DesktopView. */}
      <StartMenuLayout
        apps={placeholderApps}
        userName="Demo User"
        userAvatarUrl="https://source.unsplash.com/random/40x40?face"
        onAppClick={handleAppClick}
        onSearchChange={handleSearch}
        onSettingsClick={() => alert('Settings clicked (standalone page)')}
        onAccountClick={() => alert('Account clicked (standalone page)')}
        onSignOutClick={() => alert('Sign Out clicked (standalone page)')}
      />
      {/* 
        Input, ScrollArea, Button, Avatar, Separator are used by StartMenuLayout.
        Menubar is not explicitly used here as StartMenuLayout has its own structure.
      */}
    </div>
  );
};

export default StartMenuModal;