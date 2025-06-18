import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"; // ShadCN Form

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LockScreenView = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "user@example.com", // Default mock username
      password: "password", // Default mock password
    },
  });

  React.useEffect(() => {
    console.log('LockScreenView loaded');
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const onSubmit = (data: LoginFormValues) => {
    console.log("Login attempt:", data);
    // Mock login success
    if (data.username === "user@example.com" && data.password === "password") {
      navigate('/desktop');
    } else {
      form.setError("root", { type: "manual", message: "Invalid credentials" });
      console.error("Invalid login credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature,abstract')" }}>
      <div className="absolute top-4 right-4 text-white text-xl font-semibold bg-black/30 p-2 rounded">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src="https://source.unsplash.com/random/100x100?avatar,person" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
              )}
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          <p>This is a simulated OS environment.</p>
        </CardFooter>
      </Card>
       <footer className="absolute bottom-4 text-white text-sm bg-black/30 p-2 rounded">
        &copy; {new Date().getFullYear()} Ascendion OS Simulation
      </footer>
    </div>
  );
};

export default LockScreenView;