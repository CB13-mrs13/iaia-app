
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateUserProfile, uploadAvatar } from '@/lib/firebase/auth';
import { useToast } from '@/hooks/use-toast';
import type { User } from 'firebase/auth';
import { useState, useTransition, useRef, useEffect } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase/config';
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

export default function ProfileSettings({ user: initialUserFromContext }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { setUser: setAuthUser } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialUserFromContext.photoURL);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const { language } = useLanguage();
  const t = translations[language].account;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: initialUserFromContext.displayName || "",
    },
  });
  
  const { formState: { isDirty } } = form;
  const hasAvatarChanged = avatarFile !== null;

  // This effect syncs the form if the user prop changes from the outside
  useEffect(() => {
    if (initialUserFromContext) {
      form.reset({ displayName: initialUserFromContext.displayName || "" });
      setAvatarPreview(initialUserFromContext.photoURL);
    }
  }, [initialUserFromContext, form]);


  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => setShowConfetti(false), 7000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  
  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    startTransition(async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        toast({ variant: "destructive", title: t.errorToastTitle, description: t.unauthenticatedToastDesc });
        return;
      }
      
      const displayNameChanged = data.displayName !== initialUserFromContext.displayName;
      
      if (!displayNameChanged && !hasAvatarChanged) {
        toast({ title: t.noChangesToastTitle, description: t.noChangesToastDesc });
        return;
      }

      try {
        // Step 1: Upload avatar if changed. It will also update the profile URL internally.
        if (hasAvatarChanged && avatarFile) {
          await uploadAvatar(avatarFile, currentUser);
        }

        // Step 2: Update display name if changed
        if (displayNameChanged) {
          await updateUserProfile({ displayName: data.displayName || "" }, currentUser);
        }
        
        // Step 3: Reload user to get the latest profile data from Firebase services
        await currentUser.reload();
        
        // Step 4: Update the application's auth context with the fresh user object
        const refreshedUser = auth.currentUser!;
        setAuthUser({ ...refreshedUser });

        // Step 5: Manually reset the form to its new default state to clear isDirty
        form.reset({ displayName: refreshedUser.displayName || "" });

        // Step 6: Trigger success UI
        toast({ title: t.profileUpdatedToastTitle, description: t.profileUpdatedToastDesc });
        setShowConfetti(true);

      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = t.updateFailedToastDesc;
        if (error && typeof error === 'object' && 'code' in error) {
            if (error.code === 'auth/requires-recent-login') {
                description = t.reauthToastDesc;
            } else if (error.code === 'storage/unauthorized') {
                description = t.storageUnauthorizedToastDesc;
            }
        }
        toast({ variant: "destructive", title: t.updateFailedToastTitle, description });
      } finally {
        // Step 7: Clean up local state
        if (avatarFile && avatarPreview?.startsWith('blob:')) {
            URL.revokeObjectURL(avatarPreview);
        }
        setAvatarFile(null);
      }
    });
  };

  const getInitials = (): string => {
    const nameToUse = form.watch('displayName') || initialUserFromContext?.displayName;
    if (nameToUse) {
      const names = nameToUse.split(' ').filter(Boolean);
      if (names.length > 1 && names[0] && names[names.length - 1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      if (names[0]) return names[0].substring(0, 2).toUpperCase();
    }
    return initialUserFromContext?.email?.substring(0, 2).toUpperCase() || 'U';
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
          initialVelocityY={{ min: -30, max: -20 }}
          initialVelocityX={{ min: -15, max: 15 }}
          angle={270}
          spread={120}
          origin={{ y: 0.95 }}
        />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label>{t.avatar}</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || undefined} alt="User avatar" />
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" /> {t.changeAvatar}
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleAvatarChange}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="displayName">{t.displayName}</Label>
          <Input id="displayName" {...form.register('displayName')} placeholder={t.displayNamePlaceholder} />
          {form.formState.errors.displayName && (
            <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">{t.email}</Label>
          <Input id="email" type="email" value={initialUserFromContext?.email || ""} disabled className="bg-muted/50" />
          <p className="text-xs text-muted-foreground">{t.emailCannotBeChanged}</p>
        </div>
        <Button type="submit" disabled={isPending || (!isDirty && !hasAvatarChanged)}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t.saveChanges}
        </Button>
      </form>
    </>
  );
}
