
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

const COOKIE_CONSENT_KEY = "cookie_consent_accepted";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== "true") {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 border-t border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-transform duration-500 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center sm:text-left">
          {t.cookieConsent.message}{" "}
          <Link href="/privacy-policy" className="underline text-primary hover:text-primary/80">
            {t.legal.privacyPolicy}.
          </Link>
        </p>
        <Button onClick={handleAccept} size="sm">
          {t.cookieConsent.accept}
        </Button>
      </div>
    </div>
  );
}

    