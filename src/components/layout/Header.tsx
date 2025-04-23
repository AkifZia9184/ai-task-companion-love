
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { LogOut } from 'lucide-react';

interface HeaderProps {
  username?: string;
}

export default function Header({ username }: HeaderProps) {
  const [greeting, setGreeting] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Signed out successfully',
      });
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
             AI To-Do List
          </h1>
        </div>
        <div className="flex items-center gap-4">
          {username && (
            <div className="hidden md:block text-sm">
              <span className="font-medium">{greeting}, </span>
              <span className="font-bold text-primary">{username}</span>
            </div>
          )}
          <ThemeToggle />
          {username && (
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
