
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Navbar() {
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Link
              href="/"
              className="mr-6 flex items-center space-x-2 cursor-pointer"
              aria-label="Homepage and open logo popup"
            >
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
          <DialogContent className="p-0 bg-transparent border-none shadow-none max-w-3xl w-auto h-auto flex items-center justify-center">
            <DialogTitle className="sr-only">IAIA Logo Popup</DialogTitle>
            <div className="relative w-[80vw] h-[80vh] max-w-[700px] max-h-[500px] opacity-80"> {/* Ajusté max-w et max-h pour mieux s'adapter, et opacité */}
              <Image
                src="/pop-up-logo-iaia.png"
                alt="IAIA Popup Logo"
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 80vw, 700px" // Tailles ajustées
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
