
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Bot } from 'lucide-react';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { sendPasswordResetEmail } from '@/lib/firebase/auth';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const handleSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    setError(null);
    setSuccess(null);
    startTransition(async () => {
      try {
        await sendPasswordResetEmail(data.email);
        setSuccess(`Password reset email sent to ${data.email}. Please check your inbox (and spam folder).`);
        toast({ title: 'Email Sent', description: `Password reset instructions sent to ${data.email}.` });
        form.reset();
      } catch (err: any) {
        let errorMessage = "Failed to send password reset email. Please try again.";
        if (err.code === 'auth/user-not-found') {
          errorMessage = "No account found with this email address.";
        }
        setError(errorMessage);
        toast({ variant: 'destructive', title: 'Error', description: errorMessage });
      }
    });
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
           <Bot className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold">Forgot Your Password?</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center p-4 bg-green-100 border border-green-300 text-green-700 rounded-md">
            <p>{success}</p>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" {...form.register('email')} placeholder="you@example.com" className="pl-10" />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            {error && <p className="text-sm text-destructive text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Reset Link
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" asChild className="text-primary">
          <Link href="/login">Back to Login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
