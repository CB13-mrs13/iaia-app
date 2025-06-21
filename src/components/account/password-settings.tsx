
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUserPassword } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useState, useTransition, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function PasswordSettings() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { language } = useLanguage();
  const t = translations[language].account;
  
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const onSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    startTransition(async () => {
      try {
        await updateUserPassword(data.newPassword);
        toast({ title: t.passwordUpdatedToastTitle, description: t.passwordUpdatedToastDesc });
        setShowConfetti(true);
        form.reset();
      } catch (error: any) {
        console.error("Password update error:", error);
        let description = t.updateFailedToastDesc;
        if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/requires-recent-login') {
          description = t.reauthToastDesc;
        }
        toast({ variant: "destructive", title: t.updateFailedToastTitle, description });
      }
    });
  };

  return (
    <>
      {showConfetti && width && height && (
          <ReactConfetti 
            width={width} 
            height={height} 
            recycle={false} 
            numberOfPieces={600}
            gravity={0.2}
            spread={180}
            initialVelocityY={-30}
            origin={{ y: 0.95 }}
          />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="newPassword">{t.newPassword}</Label>
          <Input id="newPassword" type="password" {...form.register('newPassword')} placeholder={t.newPasswordPlaceholder} />
          {form.formState.errors.newPassword && (
            <p className="text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">{t.confirmNewPassword}</Label>
          <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} placeholder={t.confirmNewPasswordPlaceholder} />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t.changePassword}
        </Button>
      </form>
    </>
  );
}
