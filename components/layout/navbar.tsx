
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { LogIn, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserNav from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import LanguageSwitcher from './language-switcher';

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-transform duration-300 hover:scale-105" aria-label="Homepage">
          <Image src="/iaia-logo.png" alt="IAIA Logo" width={40} height={40} className="h-10 w-10" />
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            asChild 
            className="text-black hover:text-primary hover:bg-primary/10 transition-all duration-300"
          >
            <Link href="/user-manual" aria-label="User Manual">
              <Wrench className="h-5 w-5 md:h-6 md:w-6 stroke-[2]" />
            </Link>
          </Button>
          
          <LanguageSwitcher />
          
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted"></div>
          ) : user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild 
                className="text-black hover:text-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Link href="/login" aria-label="Login">
                  <LogIn className="h-5 w-5 md:h-6 md:w-6 stroke-[2]" />
                </Link>
              </Button>
              
              <Link 
                href="/signup"
                className="btn-yellow text-xs md:text-base px-4 md:px-8 py-2 md:py-2.5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
