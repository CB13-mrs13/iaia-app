
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateUserProfile } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import type { User } from 'firebase/auth';
import { useState, useTransition, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters.").max(50, "Display name too long.").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  user: User;
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { user: authUser, setUser: setAuthUser } = useAuth();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { language } = useLanguage();
  const t = translations[language].account;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName || "",
    },
  });
  
  const { formState: { isDirty } } = form;

  // Syncs the form if the user prop changes from the outside
  useEffect(() => {
    if (user) {
      form.reset({ displayName: user.displayName || "" });
    }
  }, [user, form]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => setShowConfetti(false), 7000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    startTransition(async () => {
      if (!isDirty) {
        toast({ title: t.noChangesToastTitle, description: t.noChangesToastDesc });
        return;
      }
      if (!authUser) {
         toast({ variant: "destructive", title: t.errorToastTitle, description: t.unauthenticatedToastDesc });
        return;
      }

      try {
        await updateUserProfile({ displayName: data.displayName || "" }, authUser);
        
        // Manually update context user to reflect change immediately
        const updatedUser = { ...authUser, displayName: data.displayName || null };
        setAuthUser(updatedUser as User);

        // Manually reset form to new state
        form.reset({ displayName: data.displayName || "" });

        toast({ title: t.profileUpdatedToastTitle, description: t.profileUpdatedToastDesc });
        setShowConfetti(true);

      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = t.updateFailedToastDesc;
        if (error?.code === 'auth/requires-recent-login') {
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
          numberOfPieces={500}
          gravity={0.2}
          spread={360}
          initialVelocity={40}
          origin={{ x: 0.5, y: 0.5 }}
        />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="displayName">{t.displayName}</Label>
          <Input id="displayName" {...form.register('displayName')} placeholder={t.displayNamePlaceholder} />
          {form.formState.errors.displayName && (
            <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">{t.email}</Label>
          <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted/50" />
          <p className="text-xs text-muted-foreground">{t.emailCannotBeChanged}</p>
        </div>
        <Button type="submit" disabled={isPending || !isDirty}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t.saveChanges}
        </Button>
      </form>
    </>
  );
}
