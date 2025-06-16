
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
  const { setUser: setAuthUser } = useAuth();
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
      const currentFirebaseUser = auth.currentUser; 
      if (!currentFirebaseUser) {
        toast({ variant: "destructive", title: "Error", description: "User not authenticated. Please log in again." });
        setAvatarFile(null);
        return;
      }

      let profileWasActuallyUpdated = false;
      const formDisplayName = data.displayName || "";
      const initialAuthDisplayName = currentFirebaseUser.displayName || "";
      // Store initial photoURL from the potentially reloaded currentFirebaseUser
      const initialAuthPhotoURL = currentFirebaseUser.photoURL;


      try {
        // Handle avatar update
        if (avatarFile) {
          // uploadAvatar internally calls updateUserProfile on the Firebase auth user object
          await uploadAvatar(avatarFile, currentFirebaseUser);
          profileWasActuallyUpdated = true;
        }

        // Handle display name update
        // Only update if the name actually changed from what Firebase auth has
        if (formDisplayName !== initialAuthDisplayName) {
          await updateUserProfile({ displayName: formDisplayName }, currentFirebaseUser);
          profileWasActuallyUpdated = true;
        }
        
        if (!profileWasActuallyUpdated) {
          toast({ title: "No Changes", description: "No changes were made to your profile." });
        } else {
          // Crucial: reload to get the absolute latest state from Firebase backend
          // This ensures auth.currentUser (and thus currentFirebaseUser if re-fetched) has the new photoURL/displayName
          await currentFirebaseUser.reload(); 
          const refreshedUser = auth.currentUser; // This is now the user with updated info

          if (refreshedUser) {
             // Update AuthContext with the refreshed user data
            setAuthUser({ ...refreshedUser });
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
            }  else if (error.code === 'storage/object-not-found' && profileWasActuallyUpdated) {
                // This can happen if old avatar deletion fails but new one succeeds.
                // The main update likely succeeded, so we can proceed to inform the user.
                 await currentFirebaseUser.reload(); 
                 const refreshedUser = auth.currentUser;
                 if (refreshedUser) setAuthUser({ ...refreshedUser });
                 toast({ title: "Profile Updated", description: "Your profile has been updated (old avatar cleanup warning)." });
                 setShowConfetti(true);
                 profileWasActuallyUpdated = true; // ensure it stays true
            }
        }
        if (!profileWasActuallyUpdated || (error && error.code !== 'storage/object-not-found')){ // Avoid double toast for the specific storage/object-not-found case handled above
             toast({ variant: "destructive", title: "Update Failed", description });
        }
      } finally {
        setAvatarFile(null); // Always clear the selected file after attempt
      }
    });
  };
  
  const getInitials = (): string => {
    const currentDisplayNameInForm = form.watch('displayName'); // Prioritize form value
    const authUserDisplayName = initialUserFromContext?.displayName;
    const authUserEmail = initialUserFromContext?.email;

    const nameToUse = currentDisplayNameInForm || authUserDisplayName;

    if (nameToUse) {
      const names = nameToUse.split(' ');
      if (names.length > 1 && names[0] && names[names.length -1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      if (names[0]) return names[0].substring(0, 2).toUpperCase();
    }
    return authUserEmail?.substring(0,2).toUpperCase() || 'U';
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
          initialVelocityY={{ min: -30, max: -20 }} // Upward burst
          initialVelocityX={{ min: -15, max: 15 }}
          angle={270} // Direction: up
          spread={120} // Spread angle
          origin={{ y: 0.95 }} // Erupt from near bottom
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

