import React, { useState } from 'react';
import WindowFrame from '@/components/system/WindowFrame';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Palette, Display, BellDot, UserCircle } from 'lucide-react';

const SettingsWindowView = () => {
  const [isOpen, setIsOpen] = useState(true); // Manage open state for this standalone page
  const [darkMode, setDarkMode] = useState(false);
  const [accentColor, setAccentColor] = useState("blue");
  const [wallpaperUrl, setWallpaperUrl] = useState("https://source.unsplash.com/random/1920x1080?abstract");

  React.useEffect(() => {
    console.log('SettingsWindowView loaded');
  }, []);

  if (!isOpen) {
    // In a real app, this might navigate away or be handled by a parent component
    return <div className="p-4">Settings window is closed. <Button onClick={() => setIsOpen(true)}>Reopen</Button></div>;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-4">
        {/* This page simulates a settings window. For DesktopView, this content would be a child of its WindowFrame. */}
        <WindowFrame
        title="Settings"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)} // For standalone page, just closes it here
        onMinimize={() => console.log("Minimize Settings (standalone)")}
        onMaximize={() => console.log("Maximize Settings (standalone)")}
        initialSize={{ width: 700, height: 500 }}
        >
        <Tabs defaultValue="appearance" className="h-full flex flex-col">
            <TabsList className="shrink-0 border-b px-2 py-1.5 justify-start bg-gray-100 rounded-none">
            <TabsTrigger value="appearance" className="flex items-center gap-2"><Palette size={16}/> Appearance</TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2"><Display size={16}/> Display</TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2"><BellDot size={16}/> Notifications</TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2"><UserCircle size={16}/> Account</TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-grow p-1">
                <TabsContent value="appearance" className="p-4 space-y-6">
                    <Card>
                    <CardHeader>
                        <CardTitle>Theme</CardTitle>
                        <CardDescription>Customize the look and feel of the OS.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                            <span>Dark Mode</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Toggle between light and dark themes.
                            </span>
                        </Label>
                        <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="accent-color">Accent Color</Label>
                        <Select value={accentColor} onValueChange={setAccentColor}>
                            <SelectTrigger id="accent-color">
                            <SelectValue placeholder="Select accent color" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="wallpaper-url">Wallpaper URL</Label>
                        <Input id="wallpaper-url" value={wallpaperUrl} onChange={(e) => setWallpaperUrl(e.target.value)} placeholder="Enter image URL" />
                        <Button size="sm" onClick={() => alert(`Wallpaper set to: ${wallpaperUrl}`)}>Apply Wallpaper</Button>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="display" className="p-4">
                    <Card>
                    <CardHeader><CardTitle>Display Settings</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                        <Label htmlFor="resolution">Resolution</Label>
                        <Select defaultValue="1920x1080">
                            <SelectTrigger id="resolution"><SelectValue /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="1920x1080">1920 x 1080 (Recommended)</SelectItem>
                            <SelectItem value="1600x900">1600 x 900</SelectItem>
                            <SelectItem value="1366x768">1366 x 768</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div>
                        <Label htmlFor="scale">Scaling</Label>
                        <RadioGroup defaultValue="100" className="flex space-x-2">
                            <div className="flex items-center space-x-1"><RadioGroupItem value="100" id="scale-100" /><Label htmlFor="scale-100">100%</Label></div>
                            <div className="flex items-center space-x-1"><RadioGroupItem value="125" id="scale-125" /><Label htmlFor="scale-125">125%</Label></div>
                            <div className="flex items-center space-x-1"><RadioGroupItem value="150" id="scale-150" /><Label htmlFor="scale-150">150%</Label></div>
                        </RadioGroup>
                        </div>
                    </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="p-4">
                    <Card>
                    <CardHeader><CardTitle>Notification Settings</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="allow-notifications">Allow Notifications</Label>
                            <Switch id="allow-notifications" defaultChecked />
                        </div>
                        <p className="text-sm text-muted-foreground">Manage how you receive notifications from apps.</p>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="account" className="p-4">
                    <Card>
                    <CardHeader><CardTitle>Account Settings</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <p>User: Demo User (user@example.com)</p>
                        <Button variant="outline">Change Password</Button>
                        <Button variant="destructive">Sign Out</Button>
                    </CardContent>
                    </Card>
                </TabsContent>
            </ScrollArea>
        </Tabs>
        </WindowFrame>
    </div>
  );
};

export default SettingsWindowView;