
"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Send, Home, MessageSquare, User, Tag } from 'lucide-react';
import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { useAuth } from '@/hooks/use-auth';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  feedbackType: z.enum(['suggestion', 'bug', 'feedback']),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = translations[language].contactPage;
  const userNavT = translations[language].userNav;
  const { user, loading } = useAuth();
  const homeLink = user ? "/discover" : "/";

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      message: "",
    },
  });
  
  // Set default values if user logs in after form is rendered
  if (user && form.getValues('email') === '') {
    form.reset({
      name: user.displayName || '',
      email: user.email || '',
    });
  }

  const handleSubmit: SubmitHandler<ContactFormValues> = (data) => {
    startTransition(() => {
      // Simulate form submission
      console.log("Form submitted (simulation):", data);

      toast({
        title: t.toastSuccessTitle,
        description: t.toastSuccessDescription,
      });
      form.reset({
        ...form.getValues(),
        message: "", // Reset only the message field
      });
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
       <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
         <Button asChild variant="outline">
          <Link href={homeLink}>
            <Home className="mr-2 h-4 w-4" />
            {userNavT.home}
          </Link>
        </Button>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>{t.formTitle}</CardTitle>
          <CardDescription>{t.formDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Mail className="h-4 w-4" />
            <AlertTitle>{t.infoTitle}</AlertTitle>
            <AlertDescription dangerouslySetInnerHTML={{ __html: t.infoDescription }} />
          </Alert>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <Label htmlFor="name">{t.nameLabel}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" {...form.register('name')} placeholder={t.namePlaceholder} className="pl-10" />
                </div>
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                )}
              </div>
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
            </div>
             <div className="space-y-1">
              <Label htmlFor="feedbackType">{t.feedbackTypeLabel}</Label>
                <Select onValueChange={(value) => form.setValue('feedbackType', value as 'suggestion' | 'bug' | 'feedback')} defaultValue={form.getValues('feedbackType')}>
                  <SelectTrigger id="feedbackType" className="w-full">
                     <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder={t.feedbackTypePlaceholder} />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="suggestion">{t.suggestion}</SelectItem>
                    <SelectItem value="bug">{t.bugReport}</SelectItem>
                    <SelectItem value="feedback">{t.generalFeedback}</SelectItem>
                  </SelectContent>
                </Select>
                 {form.formState.errors.feedbackType && (
                  <p className="text-sm text-destructive">{form.formState.errors.feedbackType.message}</p>
                )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="message">{t.messageLabel}</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea id="message" {...form.register('message')} placeholder={t.messagePlaceholder} className="pl-10 min-h-[120px]" />
              </div>
              {form.formState.errors.message && (
                <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {t.submitButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
