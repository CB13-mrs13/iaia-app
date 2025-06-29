
"use client";

import AuthForm from '@/components/auth/auth-form';
import { signInWithEmail } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

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
    // The redirect is now handled by the useEffect hook.
    // This prevents a race condition where navigation happens before the auth state
    // has propagated to all components, such as the Navbar.
  };

  if (loading || (!loading && user)) {
     // Show loading or prevent rendering form if already logged in and redirecting
    return null;
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
