
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserNav from './user-nav';
import { useAuth } from '@/hooks/use-auth';
import LanguageSwitcher from './language-switcher';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Link href="/" className="mr-6 flex items-center space-x-2 cursor-pointer" aria-label="Homepage and open logo popup">
              <Image
                src="/iaia-logo.png"
                alt="IAIA Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="font-bold text-2xl sm:inline-block">IAIA</span>
            </Link>
          </DialogTrigger>
          <DialogContent className="bg-transparent border-none shadow-none p-0 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
            <div className="flex justify-center items-center">
              <Image
                src="https://placehold.co/800x600.png" // Remplacez par l'URL de votre image
                alt="Popup Image"
                width={800}
                height={600}
                className="opacity-75 rounded-lg object-contain"
                data-ai-hint="abstract creative" // Modifiez si vous voulez une autre image par IA
              />
            </div>
          </DialogContent>
        </Dialog>
        <nav className="flex flex-1 items-center space-x-4">
          {/* Add nav links here if needed, e.g.,
          <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Features
          </Link>
          */}
        </nav>
        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <UserNav user={user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
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
