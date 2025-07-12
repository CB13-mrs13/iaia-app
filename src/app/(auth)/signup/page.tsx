
"use client";

import AuthForm from '@/components/auth/auth-form';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';
import { Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Redirect if user is already logged in, but not if we're in the middle of showing confetti for a new signup.
    if (!loading && user && !showConfetti) {
      router.push('/discover');
    }
  }, [user, loading, router, showConfetti]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      // This timer is just to stop rendering confetti after a while to save resources
      timer = setTimeout(() => {
        setShowConfetti(false);
        router.push('/discover');
      }, 7000); 
    }
    return () => clearTimeout(timer);
  }, [showConfetti, router]);

  const handleSignUp = async (values: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await signUpWithEmail(values.email, values.password, values.displayName);
    toast({ title: 'Sign Up Successful', description: 'Welcome to IAIA! Your account has been created.' });
    setShowConfetti(true);
    // The useEffect will handle the redirection after a delay.
  };
  
  if (loading || (!loading && user)) {
    // Prevent rendering form during initial auth check or if redirecting
    return (
       <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  // If not loading and no user, render the form.
  return (
    <>
      {showConfetti && width && height && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={800}
          gravity={0.1}
          spread={360}
          origin={{ x: 0.5, y: 0.5 }}
        />
      )}
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </>
  );
}
