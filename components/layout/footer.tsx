"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/hooks/use-language";
import LanguageSwitcher from "./language-switcher";
import { Button } from "@/components/ui/button";
import { Linkedin, Instagram } from "lucide-react";

// X Logo SVG component
const XLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-label="X social media icon"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// TikTok Logo SVG component
const TikTokLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-label="TikTok social media icon"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].legal;

  // Correction pour l'année dynamique côté client (évite l'hydratation mismatch)
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 text-sm">
          <div className="flex items-center gap-x-2">
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
              <a href="https://x.com/iaia_app" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X">
                <XLogo />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
              <a href="https://www.linkedin.com/company/iaia-app/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
              <a href="https://www.instagram.com/iaia_app/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
              <a href="https://www.tiktok.com/@iaia_app" target="_blank" rel="noopener noreferrer" aria-label="Follow us on TikTok">
                <TikTokLogo />
              </a>
            </Button>
          </div>
          <div className="h-4 w-px bg-border hidden md:block"></div>
          <LanguageSwitcher />
          <div className="h-4 w-px bg-border hidden md:block"></div>
          <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors duration-300 px-2 font-medium">
            {t.footerContact}
          </Link>
          <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors duration-300 px-2 font-medium">
            {t.termsOfService}
          </Link>
          <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors duration-300 px-2 font-medium">
            {t.privacyPolicy}
          </Link>
          <Link href="/user-manual" className="text-muted-foreground hover:text-primary transition-colors duration-300 px-2 font-medium">
            {t.userManual}
          </Link>
        </div>
        <div className="h-px w-32 bg-border"></div>
        <p className="text-center text-xs md:text-sm leading-loose text-muted-foreground mt-2">
          Built by CB13 - Cousinbruno. &copy; {year ?? ""} IAIA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}