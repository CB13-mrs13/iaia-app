
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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user.displayName || "",
    },
  });

  useEffect(() => {
    form.reset({ displayName: user.displayName || "" });
    setAvatarPreview(user.photoURL);
  }, [user, form.reset]);


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
        let profileUpdated = false;
        let newPhotoURL = user.photoURL; // Keep current photoURL unless changed

        if (avatarFile) {
          newPhotoURL = await uploadAvatar(avatarFile); 
          profileUpdated = true;
        }

        if (data.displayName !== user.displayName) {
          await updateUserProfile({ displayName: data.displayName || undefined });
          profileUpdated = true;
        }

        if (profileUpdated && auth.currentUser) {
          await auth.currentUser.reload();
          const refreshedUser = auth.currentUser; 
          setAuthUser(refreshedUser ? { ...refreshedUser } : null); 

          if (refreshedUser) {
            form.reset({ displayName: refreshedUser.displayName || "" });
            setAvatarPreview(refreshedUser.photoURL); // Ensure preview uses the potentially new URL
          }
        }
        
        setAvatarFile(null); 
        if (profileUpdated) {
          toast({ title: "Profile Updated", description: "Your profile has been successfully updated." });
        } else {
          toast({ title: "No Changes", description: "No changes were made to your profile." });
        }

      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = "Could not update your profile. Please try again.";
        if (error.code === 'auth/requires-recent-login') {
            description = "This operation requires recent authentication. Please log out and log back in before trying again.";
        } else if (error.code === 'storage/unauthorized') {
            description = "You are not authorized to upload this file. Please check your Firebase Storage rules.";
        } else if (error.code === 'storage/object-not-found' && avatarFile) {
            console.warn("Old avatar not found for deletion, continuing profile update.");
        }
        toast({ variant: "destructive", title: "Update Failed", description });
      }
    });
  };

  const getInitials = (name?: string | null): string => {
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
