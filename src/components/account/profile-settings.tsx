
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
  user: User; // This prop is from AuthContext, initially
}

export default function ProfileSettings({ user: initialUserFromContext }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { setUser: setAuthUser } = useAuth(); // setUser from AuthContext
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialUserFromContext.photoURL);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: initialUserFromContext.displayName || "",
    },
  });

  useEffect(() => {
    // This effect syncs the form with the user from AuthContext.
    // Useful if the user prop updates from elsewhere or on initial load.
    if (initialUserFromContext) {
        form.reset({ displayName: initialUserFromContext.displayName || "" });
        setAvatarPreview(initialUserFromContext.photoURL);
    }
  }, [initialUserFromContext, form]);

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

  const onSubmit: SubmitHandler<ProfileFormValues> = (data) => {
    startTransition(async () => {
      const currentUser = auth.currentUser; // Get the most current Firebase auth user state
      if (!currentUser) {
        toast({ variant: "destructive", title: "Error", description: "User not authenticated. Please log in again." });
        setAvatarFile(null);
        return;
      }

      let profileUpdated = false;
      const formDisplayName = data.displayName || "";
      const initialDisplayNameFromAuth = currentUser.displayName || "";
      
      try {
        // Handle avatar update
        if (avatarFile) {
          await uploadAvatar(avatarFile, currentUser); // uploadAvatar updates auth.currentUser.photoURL
          profileUpdated = true;
        }

        // Handle display name update
        if (formDisplayName !== initialDisplayNameFromAuth) {
          await updateUserProfile({ displayName: formDisplayName }); // updates auth.currentUser.displayName
          profileUpdated = true;
        }

        if (!profileUpdated) {
          toast({ title: "No Changes", description: "No changes were made to your profile." });
        } else {
          await currentUser.reload(); // Crucial: reload to get the absolute latest state from Firebase backend
          const refreshedUser = auth.currentUser; // auth.currentUser is now the refreshed user

          if (refreshedUser) {
            setAuthUser({ ...refreshedUser }); // Update AuthContext, which triggers useEffect to update form
          }
          toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
          setShowConfetti(true);
        }
      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = "Could not update your profile. Please try again.";
        if (error && typeof error === 'object' && 'code' in error) {
            if (error.code === 'auth/requires-recent-login') {
                description = "This operation requires recent authentication. Please log out and log back in before trying again.";
            } else if (error.code === 'storage/unauthorized') {
                description = "You are not authorized to upload this file. Check Firebase Storage rules.";
            }
        }
        toast({ variant: "destructive", title: "Update Failed", description });
      } finally {
        setAvatarFile(null); // Always clear the selected file after attempt
      }
    });
  };
  
  const getInitials = (): string => {
    // Use form value for display name first, then context user, then email
    const currentDisplayName = form.watch('displayName') || initialUserFromContext?.displayName;
    if (currentDisplayName) {
      const names = currentDisplayName.split(' ');
      if (names.length > 1 && names[0] && names[names.length -1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      if (names[0]) return names[0].substring(0, 2).toUpperCase();
    }
    return initialUserFromContext?.email?.substring(0,2).toUpperCase() || 'U';
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
          <Input id="email" type="email" value={initialUserFromContext?.email || ""} disabled className="bg-muted/50" />
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
