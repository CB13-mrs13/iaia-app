"use client";

import Link from 'next/link';
import Image from 'next/image';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserNav from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import LanguageSwitcher from './language-switcher';

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="mr-2 flex items-center space-x-2 sm:mr-6"
          aria-label="Homepage"
        >
          <Image
            src="/iaia-logo.png"
            alt="IAIA Logo"
            width={40}
            height={40}
            className="h-10 w-10"
            priority // Ajout de la propriété priority pour le LCP
          />
          <span className="hidden font-bold text-2xl sm:inline-block">IAIA</span>
        </Link>

        <nav className="flex flex-1 items-center space-x-4">
          {/* Add nav links here if needed, e.g.,
          <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          */}
        </nav>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <LanguageSwitcher />
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login" aria-label="Login">
                  <LogIn className="h-5 w-5 sm:mr-2" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
