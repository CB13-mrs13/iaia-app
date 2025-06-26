
"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User as UserIcon, Settings, Home, Star } from 'lucide-react';
import type { User } from 'firebase/auth';
import { signOutUser } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

interface UserNavProps {
  user: User;
}

export default function UserNav({ user }: UserNavProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].userNav;

  const handleSignOut = async () => {
    try {
      await signOutUser();
      toast({ title: t.signOutSuccessToastTitle, description: t.signOutSuccessToastDesc });
      router.push('/login'); // Redirect to login page
      router.refresh(); // Crucial to re-fetch server components and update client components
    } catch (error) {
      toast({ variant: 'destructive', title: t.signOutErrorToastTitle, description: t.signOutErrorToastDesc });
    }
  };

  const getInitials = (displayName?: string | null, email?: string | null): string => {
    if (displayName) {
      const names = displayName.split(' ');
      if (names.length > 1 && names[0] && names[names.length -1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return displayName.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || 'User avatar'} />
            <AvatarFallback>{getInitials(user.displayName, user.email)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || t.user}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              <span>{t.home}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/favorites">
              <Star className="mr-2 h-4 w-4" />
              <span>{t.myFavorites}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t.accountSettings}</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t.signOut}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
