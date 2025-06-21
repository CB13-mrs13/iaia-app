
"use client";

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteCurrentUserAccount } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

export default function DeleteAccount() {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language].account;

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteCurrentUserAccount();
        toast({ title: t.accountDeletedToastTitle, description: t.accountDeletedToastDesc });
        router.push('/'); 
        router.refresh();
        setIsOpen(false);
      } catch (error: any) {
        console.error("Account deletion error:", error);
        let description = t.deleteFailedToastDesc;
        if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/requires-recent-login') {
          description = t.reauthToastDesc;
        }
        toast({ variant: "destructive", title: t.deleteFailedToastTitle, description });
        setIsOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 h-4 w-4" /> {t.deleteAccount}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.deleteAccountConfirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.deleteAccountConfirmDesc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>{t.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending} className="bg-destructive hover:bg-destructive/90">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t.confirmDelete}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
