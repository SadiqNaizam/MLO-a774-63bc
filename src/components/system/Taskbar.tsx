import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Example: for a search bar in taskbar
import { Windows } from 'lucide-react'; // Example icon for Start Menu
// Import TaskbarItem if it's defined and used here
// import TaskbarItem from './TaskbarItem';

interface TaskbarProps {
  onStartButtonClick?: () => void;
  // items: Array<{ id: string; appName: string; icon?: React.ReactNode; isActive?: boolean }>; // Example for taskbar items
}

const Taskbar: React.FC<TaskbarProps> = ({ onStartButtonClick }) => {
  console.log("Rendering Taskbar");
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-800 text-white flex items-center justify-between px-2 shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={onStartButtonClick} aria-label="Start Menu" className="hover:bg-gray-700">
          <Windows className="h-5 w-5" />
        </Button>
        {/* Placeholder for Pinned/Open App Icons (TaskbarItems) */}
        {/* Example: items.map(item => <TaskbarItem key={item.id} ... />) */}
        <div className="text-xs text-gray-400">App1</div>
        <div className="text-xs text-gray-400">App2</div>
      </div>

      {/* Optional: Search bar in taskbar */}
      {/* <div className="flex-1 max-w-xs">
        <Input type="search" placeholder="Search" className="bg-gray-700 border-gray-600 text-white h-8 text-sm" />
      </div> */}

      <div className="flex items-center space-x-2 pr-2">
        {/* System Tray Icons (Network, Volume, etc. placeholders) */}
        <span className="text-xs">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <span className="text-xs">{currentTime.toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
      </div>
    </div>
  );
};

export default Taskbar;