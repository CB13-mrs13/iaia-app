"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page has been temporarily disabled.
// It automatically redirects users to the discover page.

export default function StudioPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/discover');
  }, [router]);

  return (
    <div className="flex h-[calc(100vh-theme(spacing.32))] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
