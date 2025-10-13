
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
import { Loader2, Eye, EyeOff } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { FirebaseError } from 'firebase/app';

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
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
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
      } catch (error) {
        console.warn("Password update error:", error);
        let description = t.updateFailedToastDesc;
        if (error instanceof FirebaseError && error.code === 'auth/requires-recent-login') {
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
            numberOfPieces={800}
            gravity={0.1}
            spread={360}
            origin={{ x: 0.5, y: 0.5 }}
          />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="newPassword">{t.newPassword}</Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              {...form.register('newPassword')}
              placeholder={t.newPasswordPlaceholder}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.newPassword && (
            <p className="text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">{t.confirmNewPassword}</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              {...form.register('confirmPassword')}
              placeholder={t.confirmNewPasswordPlaceholder}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
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
