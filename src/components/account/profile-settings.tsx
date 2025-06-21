
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
      const currentFirebaseUser = auth.currentUser;
      if (!currentFirebaseUser) {
        toast({ variant: "destructive", title: "Erreur", description: "Utilisateur non authentifié." });
        return;
      }

      try {
        const updates: { displayName?: string; photoURL?: string } = {};
        let profileHasChanged = false;

        // 1. Handle avatar upload if a new file is selected
        if (avatarFile) {
          const newPhotoURL = await uploadAvatar(avatarFile, currentFirebaseUser);
          updates.photoURL = newPhotoURL;
          profileHasChanged = true;
        }

        // 2. Handle display name change if it's different
        const formDisplayName = data.displayName || "";
        if (formDisplayName !== currentFirebaseUser.displayName) {
          updates.displayName = formDisplayName;
          profileHasChanged = true;
        }

        // 3. Apply updates only if there are actual changes
        if (profileHasChanged) {
          await updateUserProfile(updates, currentFirebaseUser);
          
          await currentFirebaseUser.reload();
          const refreshedUser = auth.currentUser;
          if (refreshedUser) {
            setAuthUser({ ...refreshedUser });
          }

          toast({ title: "Profil mis à jour", description: "Votre profil a été mis à jour avec succès." });
          setShowConfetti(true);
        } else {
          toast({ title: "Aucun changement", description: "Aucune modification n'a été apportée à votre profil." });
        }
      } catch (error: any) {
        console.error("Profile update error:", error);
        let description = "Impossible de mettre à jour votre profil. Veuillez réessayer.";
        if (error?.code === 'auth/requires-recent-login') {
          description = "Cette opération nécessite une authentification récente. Veuillez vous déconnecter et vous reconnecter.";
        } else if (error?.code === 'storage/unauthorized') {
          description = "Vous n'êtes pas autorisé à téléverser ce fichier. Vérifiez les règles de sécurité de Firebase Storage.";
        }
        toast({ variant: "destructive", title: "Échec de la mise à jour", description });
      } finally {
        // Clean up the selected file and object URL regardless of outcome
        if (avatarFile) {
          URL.revokeObjectURL(avatarPreview!);
        }
        setAvatarFile(null);
      }
    });
  };

  const getInitials = (): string => {
    const currentDisplayNameInForm = form.watch('displayName');
    const authUserDisplayName = initialUserFromContext?.displayName;
    const authUserEmail = initialUserFromContext?.email;
    const nameToUse = currentDisplayNameInForm || authUserDisplayName;

    if (nameToUse) {
      const names = nameToUse.split(' ');
      if (names.length > 1 && names[0] && names[names.length - 1]) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      if (names[0]) return names[0].substring(0, 2).toUpperCase();
    }
    return authUserEmail?.substring(0, 2).toUpperCase() || 'U';
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
              <Upload className="mr-2 h-4 w-4" /> Changer d'Avatar
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
          <Label htmlFor="displayName">Nom d'affichage</Label>
          <Input id="displayName" {...form.register('displayName')} placeholder="Votre nom d'affichage" />
          {form.formState.errors.displayName && (
            <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={initialUserFromContext?.email || ""} disabled className="bg-muted/50" />
          <p className="text-xs text-muted-foreground">L'email ne peut pas être modifié.</p>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Enregistrer les modifications
        </Button>
      </form>
    </>
  );
}
