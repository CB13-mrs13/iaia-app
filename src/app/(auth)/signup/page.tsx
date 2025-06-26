
"use client";

import AuthForm from '@/components/auth/auth-form';
import { signUpWithEmail } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000); // Confetti lasts for 7 seconds for new sign-ups
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const handleSignUp = async (values: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    await signUpWithEmail(values.email, values.password, values.displayName);
    toast({ title: 'Sign Up Successful', description: 'Welcome to IAIA! Your account has been created.' });
    setShowConfetti(true);
    // Wait for confetti to be visible briefly before redirecting and refreshing
    setTimeout(() => {
      router.push('/');
      router.refresh();
    }, 2500); 
  };
  
  // This check is removed to allow the confetti to display during the signup process.
  // if (loading || (!loading && user)) {
  //   return null;
  // }

  return (
    <>
      {showConfetti && width && height && (
        <ReactConfetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          spread={360}
          initialVelocity={30}
          origin={{ x: 0.5, y: 0.5 }}
        />
      )}
      <AuthForm mode="signup" onSubmit={handleSignUp} />
    </>
  );
}
