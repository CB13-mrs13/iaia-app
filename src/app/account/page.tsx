
"use client";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileSettings from "@/components/account/profile-settings";
import PasswordSettings from "@/components/account/password-settings";
import DeleteAccount from "@/components/account/delete-account";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export default function AccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language].account;

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.32))]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </header>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{t.profileTitle}</CardTitle>
          <CardDescription>{t.profileSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileSettings user={user} />
        </CardContent>
      </Card>

      <Separator />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>{t.passwordTitle}</CardTitle>
          <CardDescription>{t.passwordSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <PasswordSettings />
        </CardContent>
      </Card>
      
      <Separator />

      <Card className="border-destructive shadow-md">
        <CardHeader>
          <CardTitle className="text-destructive">{t.dangerZoneTitle}</CardTitle>
          <CardDescription>{t.dangerZoneSubtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccount />
        </CardContent>
      </Card>
    </div>
  );
}
