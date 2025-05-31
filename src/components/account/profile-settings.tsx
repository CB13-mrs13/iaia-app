
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
import { useState, useTransition, useRef } from 'react';
import { Loader2, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth'; // Ensure useAuth is imported
import { auth } from '@/lib/firebase/config'; // Direct import for auth.currentUser.reload()

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters.").max(50, "Display name too long.").optional(),
  // photoURL is handled separately via file input
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  user: User; // This prop provides initial user data
}

export default function ProfileSettings({ user }: ProfileSettingsProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const { setUser: setAuthUser } = useAuth(); // To update context after profile change
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.photoURL);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName || "",
    },
  });

  // Effect to update form and preview if user prop changes (e.g., from context update)
  React.useEffect(() => {
    form.reset({ displayName: user.displayName || "" });
    setAvatarPreview(user.photoURL);
  }, [user, form]);


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
        // Step 1: Handle avatar upload if a new file is selected
        if (avatarFile) {
          // uploadAvatar updates user.photoURL in Firebase Auth & returns the new URL
          // It now uses auth.currentUser internally, so no need to pass 'user'
          await uploadAvatar(avatarFile); 
        }

        // Step 2: Handle display name update if it changed
        // Compare with the initial displayName from the user prop
        if (data.displayName !== user.displayName) {
          await updateUserProfile({ displayName: data.displayName || undefined });
        }

        // After all Firebase updates, reload the current user's state from Firebase
        if (auth.currentUser) {
          await auth.currentUser.reload();
          // Get the freshly reloaded user object
          const refreshedUser = auth.currentUser; 
          // Update the AuthContext with this most up-to-date user information
          // The spread is important to ensure React sees a new object reference
          setAuthUser(refreshedUser ? { ...refreshedUser } : null); 

          // Update local component state (form and avatar preview) based on the refreshed user
          // This is redundant if the useEffect for 'user' prop handles it, but explicit update is fine.
          if (refreshedUser) {
            form.reset({ displayName: refreshedUser.displayName || "" });
            setAvatarPreview(refreshedUser.photoURL);
          }
        }
        
        setAvatarFile(null); // Clear selected file input
        toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });

      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = "Could not update your profile. Please try again.";
        if (error.code === 'auth/requires-recent-login') {
            description = "This operation requires recent authentication. Please log out and log back in before trying again.";
        } else if (error.code === 'storage/unauthorized') {
            description = "You are not authorized to upload this file. Please check your Firebase Storage rules.";
        } else if (error.code === 'storage/object-not-found' && avatarFile) {
            // This might happen if old avatar deletion failed benignly
            console.warn("Old avatar not found for deletion, continuing profile update.");
        }
        toast({ variant: "destructive", title: "Update Failed", description });
      }
    });
  };

  const getInitials = (name?: string | null): string => {
    // Use the name from the form first (being edited), then prop user, then email
    const currentDisplayName = form.watch('displayName') || user.displayName;
    if (currentDisplayName) {
      const names = currentDisplayName.split(' ');
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return currentDisplayName.substring(0, 2).toUpperCase();
    }
    return user.email?.substring(0,2).toUpperCase() || 'U';
  };

  return (
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
        <Input id="email" type="email" value={user.email || ""} disabled className="bg-muted/50" />
        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Changes
      </Button>
    </form>
  );
}

