import React from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { LogOut, Settings, UserCircle } from 'lucide-react'; // Example icons

interface AppItem {
  id: string;
  name: string;
  icon?: React.ReactNode; // e.g. <NotepadIcon />
}

interface StartMenuLayoutProps {
  apps: AppItem[];
  userName?: string;
  userAvatarUrl?: string;
  onAppClick: (appId: string) => void;
  onSearchChange?: (query: string) => void;
  onSettingsClick?: () => void;
  onAccountClick?: () => void;
  onSignOutClick?: () => void;
}

const StartMenuLayout: React.FC<StartMenuLayoutProps> = ({
  apps,
  userName = "User",
  userAvatarUrl,
  onAppClick,
  onSearchChange,
  onSettingsClick,
  onAccountClick,
  onSignOutClick
}) => {
  console.log("Rendering StartMenuLayout");
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-96 h-[600px] bg-gray-800 bg-opacity-90 backdrop-blur-md text-white flex flex-col shadow-xl rounded-r-lg">
      {/* Search Bar */}
      <div className="p-3">
        <Input
          type="search"
          placeholder="Type here to search"
          className="w-full bg-gray-700 border-gray-600 placeholder-gray-400 text-white h-10"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* App List */}
      <ScrollArea className="flex-grow p-3">
        <div className="space-y-1">
          {filteredApps.length > 0 ? filteredApps.map((app) => (
            <Button
              key={app.id}
              variant="ghost"
              className="w-full justify-start text-left h-10 hover:bg-gray-700"
              onClick={() => onAppClick(app.id)}
            >
              {app.icon || <div className="w-5 h-5 mr-2 bg-gray-500 rounded-sm" />} {/* Placeholder */}
              {app.name}
            </Button>
          )) : (
            <p className="text-gray-400 text-sm text-center py-4">No apps found.</p>
          )}
        </div>
      </ScrollArea>

      <Separator className="bg-gray-700" />

      {/* User/Power Options */}
      <div className="p-3 space-y-1">
        <Button variant="ghost" className="w-full justify-start text-left h-10 hover:bg-gray-700" onClick={onAccountClick}>
          <Avatar className="w-6 h-6 mr-2">
            <AvatarImage src={userAvatarUrl} alt={userName} />
            <AvatarFallback>{userName.substring(0,1).toUpperCase()}</AvatarFallback>
          </Avatar>
          {userName}
        </Button>
        <div className="flex justify-between">
             <Button variant="ghost" className="flex-1 justify-start text-left h-10 hover:bg-gray-700" onClick={onSettingsClick}>
                <Settings className="w-5 h-5 mr-2" /> Settings
             </Button>
             <Button variant="ghost" className="flex-1 justify-start text-left h-10 hover:bg-gray-700" onClick={onSignOutClick}>
                <LogOut className="w-5 h-5 mr-2" /> Sign Out
             </Button>
        </div>
      </div>
    </div>
  );
};

export default StartMenuLayout;