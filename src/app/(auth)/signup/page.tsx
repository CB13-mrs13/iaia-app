
"use client";

import AuthForm from '@/components/auth/auth-form';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); // Redirect if already logged in
    }
  }, [user, loading, router]);

  const handleSignUp = async (values: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await signUpWithEmail(values.email, values.password, values.displayName);
    toast({ title: 'Sign Up Successful', description: 'Welcome to IAIA! Your account has been created.' });
    router.push('/');
    router.refresh();
  };
  
  if (loading || (!loading && user)) {
    return null;
  }

  return <AuthForm mode="signup" onSubmit={handleSignUp} />;
}
