
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
import { Loader2 } from 'lucide-react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from '@/hooks/use-window-size';

const passwordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // path of error
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function PasswordSettings() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  
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
      }, 7000); // Confetti lasts for 7 seconds
    }
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const onSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    startTransition(async () => {
      try {
        await updateUserPassword(data.newPassword);
        toast({ title: "Password Updated", description: "Your password has been successfully changed." });
        setShowConfetti(true);
        form.reset();
      } catch (error: any) {
        console.error("Password update error:", error);
        let description = "Could not update your password. Please try again.";
        if (error.code === 'auth/requires-recent-login') {
          description = "This operation is sensitive and requires recent authentication. Please log out and log back in before updating your password.";
        }
        toast({ variant: "destructive", title: "Update Failed", description });
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
            numberOfPieces={350} // Increased pieces
            gravity={0.2} // Slower fall
            initialVelocityY={{ min: -30, max: -15 }} // Upward burst
            initialVelocityX={{ min: -10, max: 10 }} // Sideways spread
            angle={270} // Direction: mostly up
            spread={120} // Spread angle
            origin={{ y: 0.95 }} // Erupt from near bottom of screen
          />
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-1">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" {...form.register('newPassword')} placeholder="Enter new password" />
          {form.formState.errors.newPassword && (
            <p className="text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} placeholder="Confirm new password" />
          {form.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Change Password
        </Button>
      </form>
    </>
  );
}
