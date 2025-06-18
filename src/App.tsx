import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import newly created pages
import LockScreenView from "./pages/LockScreenView";
import DesktopView from "./pages/DesktopView";
import StartMenuModal from "./pages/StartMenuModal";
import SettingsWindowView from "./pages/SettingsWindowView";
import FileExplorerWindowView from "./pages/FileExplorerWindowView";
import NotFound from "./pages/NotFound"; // Assume NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LockScreenView />} />
          <Route path="/desktop" element={<DesktopView />} />
          <Route path="/start-menu" element={<StartMenuModal />} /> {/* Standalone representation */}
          <Route path="/settings" element={<SettingsWindowView />} /> {/* Standalone representation */}
          <Route path="/file-explorer" element={<FileExplorerWindowView />} /> {/* Standalone representation */}
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;