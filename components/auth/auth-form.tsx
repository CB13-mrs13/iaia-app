
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Eye, EyeOff, Mail, User, LockKeyhole, AlertTriangle } from 'lucide-react';
import { useState, useTransition, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

// Define schemas once outside the component for stability
const commonSchema = {
  email: z.string().trim().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
};

const signUpSchema = z.object({
  ...commonSchema,
  displayName: z.string().min(2, "Display name must be at least 2 characters.").optional(),
});

const signInSchema = z.object(commonSchema);

type AuthFormProps = {
  mode: 'login' | 'signup';
  onSubmit: (values: any) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
};

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].auth;

  const schema = mode === 'signup' ? signUpSchema : signInSchema;
  type FormValues = z.infer<typeof schema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
    }
  });

  const handleSubmit: SubmitHandler<FormValues> = async (data) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSubmit(data);
      } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        let errorMessage = t.errors.default;
        let errorTitle = mode === 'login' ? t.errors.loginFailedTitle : t.errors.signUpFailedTitle;

        if ( (err.code && String(err.code).includes('api-key-not-valid')) || (err.message && String(err.message).includes('api-key-not-valid')) ) {
            errorMessage = t.errors.apiKeyInvalid;
            errorTitle = t.errors.configErrorTitle;
        } else if (err.code) {
          switch (err.code) {
            case 'auth/invalid-email':
              errorMessage = t.errors.invalidEmail;
              break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              errorMessage = t.errors.invalidCredentials;
              break;
            case 'auth/email-already-in-use':
              errorMessage = t.errors.emailInUse;
              break;
            case 'auth/weak-password':
              errorMessage = t.errors.weakPassword;
              break;
            default:
              errorMessage = err.message || errorMessage;
          }
        } else if (err.message) {
          errorMessage = err.message;
        }

        setError(errorMessage);
        toast({ variant: 'destructive', title: errorTitle, description: errorMessage });
      }
    });
  };

  const getTranslatedError = (field: keyof FormValues) => {
    const error = form.formState.errors[field];
    if (!error) return null;

    switch (field) {
      case 'email':
        return t.validation.invalidEmail;
      case 'password':
        return t.validation.passwordLength;
      case 'displayName':
        return t.validation.displayNameLength;
      default:
        return error.message;
    }
  };


  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Image src="/iaia-logo.png" alt="IAIA Logo" width={48} height={48} className="h-12 w-12" priority />
        </div>
        <CardTitle className="text-2xl font-bold">
          {mode === 'login' ? t.loginTitle : t.signupTitle}
        </CardTitle>
        <CardDescription>
          {mode === 'login' ? t.loginDescription : t.signupDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <Label htmlFor="displayName">{t.displayNameLabel}</Label>
               <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="displayName" type="text" {...form.register('displayName')} placeholder={t.displayNamePlaceholder} className="pl-10" />
              </div>
              {form.formState.errors.displayName && (
                <p className="text-sm text-destructive">{getTranslatedError('displayName')}</p>
              )}
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="email">{t.emailLabel}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" {...form.register('email')} placeholder={t.emailPlaceholder} className="pl-10" />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{getTranslatedError('email')}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">{t.passwordLabel}</Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...form.register('password')}
                placeholder="••••••••"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? t.hidePassword : t.showPassword}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-destructive">{getTranslatedError('password')}</p>
            )}
          </div>
          {error && (
            <Alert variant="destructive" className="text-left">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>{t.errors.authErrorTitle}</AlertTitle>
                <AlertDescription>
                {error}
                </AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === 'login' ? t.loginButton : t.signupButton}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <p className="text-sm text-muted-foreground">
          {mode === 'login' ? t.prompt.noAccount : t.prompt.hasAccount}
          <Button variant="link" asChild className="px-1 text-primary">
            <Link href={mode === 'login' ? '/signup' : '/login'}>
              {mode === 'login' ? t.signupLink : t.loginLink}
            </Link>
          </Button>
        </p>
        {mode === 'login' && (
          <Button variant="link" asChild className="px-1 text-sm text-muted-foreground">
            <Link href="/forgot-password">{t.prompt.forgotPassword}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
