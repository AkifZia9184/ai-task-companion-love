
import { useEffect, useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Dashboard from '@/pages/Dashboard';
import { supabase } from '@/lib/supabase';
import { Skeleton } from '@/components/ui/skeleton';

export default function Index() {
  const [session, setSession] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(!!data.session);
      } catch (error) {
        console.error('Error checking auth session:', error);
        setSession(false);
      } finally {
        setLoading(false);
      }
    }

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-72 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return session ? (
    <Dashboard />
  ) : (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/30">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Lovable AI To-Do
          </h1>
          <p className="text-muted-foreground">
            Your intelligent task management companion
          </p>
        </div>
        
        <AuthForm />
        
        <div className="text-sm text-center text-muted-foreground">
          <p>Organize your tasks with the help of AI</p>
          <p className="mt-2">Tasks are securely stored and personalized to your needs</p>
        </div>
      </div>
    </div>
  );
}
