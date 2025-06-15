
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
  const { setUser: setAuthUser } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.photoURL);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName || "",
    },
  });

  useEffect(() => {
    if (user) {
        form.reset({ displayName: user.displayName || "" });
        setAvatarPreview(user.photoURL);
    }
  }, [user, form]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfetti) {
      timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    startTransition(async () => {
      try {
        const currentFirebaseUser = auth.currentUser;
        if (!currentFirebaseUser) {
          toast({ variant: "destructive", title: "Error", description: "User not authenticated. Please log in again." });
          setAvatarFile(null);
          return;
        }

        let actualDisplayNameChanged = false;
        let actualAvatarChanged = false;

        const initialDisplayName = currentFirebaseUser.displayName || "";
        const formDisplayName = data.displayName || "";

        if (formDisplayName !== initialDisplayName) {
          actualDisplayNameChanged = true;
        }

        if (avatarFile) {
          actualAvatarChanged = true;
        }

        if (!actualDisplayNameChanged && !actualAvatarChanged) {
          toast({ title: "No Changes", description: "No changes were made to your profile." });
          setAvatarFile(null);
          return;
        }

        if (actualAvatarChanged && avatarFile) {
          await uploadAvatar(avatarFile, currentFirebaseUser);
        }

        if (actualDisplayNameChanged) {
          await updateUserProfile({ displayName: formDisplayName });
        }

        // If any change was made and successful
        await currentFirebaseUser.reload();
        const refreshedUser = auth.currentUser;

        if (refreshedUser) {
           // Create a new object for the user state to ensure context updates
          setAuthUser({ ...refreshedUser });
        } else {
          // Fallback if refreshedUser is null, though unlikely if reload succeeds
          setAuthUser(null);
        }

        toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
        setShowConfetti(true);
        setAvatarFile(null); // Clear staged file after successful upload

      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = "Could not update your profile. Please try again.";
        if (error && typeof error === 'object' && 'code' in error) {
            if (error.code === 'auth/requires-recent-login') {
                description = "This operation requires recent authentication. Please log out and log back in before trying again.";
            } else if (error.code === 'storage/unauthorized') {
                description = "You are not authorized to upload this file. Please check your Firebase Storage rules.";
            }
        }
        toast({ variant: "destructive", title: "Update Failed", description });
        setAvatarFile(null); // Ensure avatarFile is reset even on error
      }
    });
  };

  const getInitials = (name?: string | null): string => {
    // Watch the current form value for displayName, fallback to user prop
    const currentDisplayName = form.watch('displayName') || user?.displayName;
    if (currentDisplayName) {
      const names = currentDisplayName.split(' ');
      if (names.length > 1 && names[0] && names[names.length -1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return currentDisplayName.substring(0, 2).toUpperCase();
    }
    return user?.email?.substring(0,2).toUpperCase() || 'U';
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
          <Label>Avatar</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatarPreview || undefined} alt="User avatar" />
              <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2 h-4 w-4" /> Change Avatar
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
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" {...form.register('displayName')} placeholder="Your display name" />
          {form.formState.errors.displayName && (
            <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={user?.email || ""} disabled className="bg-muted/50" />
          <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </form>
    </>
  );
}
