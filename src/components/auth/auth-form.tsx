
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image'; // Import Image

const commonSchema = {
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
};

const signUpSchema = z.object({
  ...commonSchema,
  displayName: z.string().min(2, { message: "Display name must be at least 2 characters." }).optional(),
});

const signInSchema = z.object(commonSchema);

type AuthFormProps = {
  mode: 'login' | 'signup';
  onSubmit: (values: any) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const schema = mode === 'signup' ? signUpSchema : signInSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit(data);
      } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        let errorMessage = "An unexpected error occurred. Please try again.";
        if (err.code) {
          switch (err.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              errorMessage = "Invalid email or password.";
              break;
            case 'auth/email-already-in-use':
              errorMessage = "This email is already registered.";
              break;
            case 'auth/weak-password':
              errorMessage = "Password is too weak.";
              break;
            default:
              errorMessage = err.message || errorMessage;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        toast({ variant: 'destructive', title: mode === 'login' ? 'Login Failed' : 'Sign Up Failed', description: errorMessage });
      }
    });
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          {/* Replace BotIcon with Image component */}
          <Image 
            src="/iaia-logo.png" 
            alt="IAIA Logo" 
            width={48} 
            height={48} 
            className="h-12 w-12" 
          />
        </div>
        <CardTitle className="text-2xl font-bold">
          {mode === 'login' ? 'Welcome Back to IAIA!' : 'Create your IAIA Account'}
        </CardTitle>
        <CardDescription>
          {mode === 'login' ? 'Sign in to access your dashboard and discover AI tools.' : 'Join us to explore the world of AI.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <Label htmlFor="displayName">Display Name (Optional)</Label>
              <Input id="displayName" type="text" {...form.register('displayName')} placeholder="Your Name" />
              {form.formState.errors.displayName && (
                <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
              )}
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register('email')} placeholder="you@example.com" />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register('password')} placeholder="••••••••" />
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
            )}
          </div>
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
          <Button variant="link" asChild className="px-1 text-primary">
            <Link href={mode === 'login' ? '/signup' : '/login'}>
              {mode === 'login' ? 'Sign Up' : 'Login'}
            </Link>
          </Button>
        </p>
        {mode === 'login' && (
          <Button variant="link" asChild className="px-1 text-sm text-muted-foreground">
            <Link href="/forgot-password">Forgot password?</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
