
"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].legal;

  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by CB13 - Cousinbruno. &copy; {new Date().getFullYear()} IAIA. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
            {t.termsOfService}
          </Link>
          <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
            {t.privacyPolicy}
          </Link>
          <Link href="/user-manual" className="text-muted-foreground hover:text-foreground transition-colors">
            {t.userManual}
          </Link>
        </div>
      </div>
    </footer>
  );
}

    
