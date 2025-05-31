
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
import { useAuth } from '@/hooks/use-auth';

const profileSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters.").max(50, "Display name too long.").optional(),
  // photoURL is handled separately via file input
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileSettingsProps {
  user: User;
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
        let newPhotoURL = user.photoURL;
        if (avatarFile) {
          newPhotoURL = await uploadAvatar(user, avatarFile);
        }
        
        await updateUserProfile({
          displayName: data.displayName || undefined, // Pass undefined if empty to not clear it accidentally
          photoURL: newPhotoURL,
        });

        // Update user in AuthContext
        if (auth.currentUser) {
          setAuthUser({ ...auth.currentUser }); 
        }

        toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
        form.reset({ displayName: data.displayName }); // Reset form with new values
        setAvatarFile(null); // Clear selected file
      } catch (error) {
        console.error("Profile update error:", error);
        toast({ variant: "destructive", title: "Update Failed", description: "Could not update your profile. Please try again." });
      }
    });
  };

  const getInitials = (name?: string | null): string => {
    if (name) {
      const names = name.split(' ');
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
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
            <AvatarFallback className="text-2xl">{getInitials(form.watch('displayName') || user.displayName)}</AvatarFallback>
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

// Need to import auth from firebase config for current user
import { auth } from '@/lib/firebase/config';
