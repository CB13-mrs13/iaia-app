
"use client";

import AuthForm from '@/components/auth/auth-form';
import { signInWithEmail } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/discover'); // Redirect if already logged in
    }
  }, [user, loading, router]);

  const handleLogin = async (values: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await signInWithEmail(values.email, values.password);
    toast({ title: 'Login Successful', description: 'Welcome back!' });
    router.push('/discover');
  };

  // If we are checking auth or the user is logged in, show a loader.
  // This prevents the form from flashing on the screen for logged-in users
  // before they are redirected.
  if (loading || user) {
    return (
       <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not loading and no user, render the form.
  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
