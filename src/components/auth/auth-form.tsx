
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Eye, EyeOff, Mail, User, LockKeyhole, AlertTriangle } from 'lucide-react';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';

const commonSchema = {
  email: z.string().trim().email({ message: "Invalid email address." }),
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

  // Dynamically set validation messages from translations
  useEffect(() => {
    const commonSchemaWithTranslations = {
      email: z.string().trim().email({ message: t.validation.invalidEmail }),
      password: z.string().min(6, { message: t.validation.passwordLength }),
    };

    const newSchema = mode === 'signup' 
      ? z.object({
          ...commonSchemaWithTranslations,
          displayName: z.string().min(2, { message: t.validation.displayNameLength }).optional(),
        })
      : z.object(commonSchemaWithTranslations);
      
    form.reset(form.getValues(), {
        // @ts-ignore - a known issue, but it works
      resolver: zodResolver(newSchema)
    });
  }, [language, form, mode, t.validation]);

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

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Image src="/iaia-logo.png" alt="IAIA Logo" width={48} height={48} className="h-12 w-12" />
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
                <p className="text-sm text-destructive">{form.formState.errors.displayName.message}</p>
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
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
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
              <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
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
