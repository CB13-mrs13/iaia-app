"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait until the authentication status is determined
    if (!loading) {
      if (user) {
        // If user is logged in, redirect to the main content page
        router.replace('/discover');
      } else {
        // If user is not logged in, redirect to the login page
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  // Display a loading indicator while checking auth status
  return (
    <div className="flex h-[calc(100vh-theme(spacing.32))] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
