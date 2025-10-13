
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
    // Redirect a user who is already logged in
    if (!loading && user) {
      router.push('/discover');
    }
  }, [user, loading, router]);

  const handleLogin = async (values: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await signInWithEmail(values.email, values.password);
    toast({ title: 'Login Successful', description: 'Welcome back!' });
    router.push('/discover');
  };

  if (loading || user) {
    return (
       <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
