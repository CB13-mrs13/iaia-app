
"use client";

import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";
import { translations } from "@/lib/translations";
import LanguageSwitcher from "./language-switcher";
import { Linkedin } from "lucide-react";
import { Button } from "../ui/button";

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


export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].legal;

  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4">
        <div className="flex flex-wrap justify-center items-center gap-x-2 gap-y-2 text-sm">
          <div className="flex items-center gap-x-2">
            <Button asChild variant="ghost" size="icon">
              <Link href="https://x.com/iaia_app" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X">
                <XLogo />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon">
              <Link href="https://www.linkedin.com/company/iaia-app/" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <LanguageSwitcher />
           <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors px-2">
            {t.footerContact}
          </Link>
          <Link href="/terms-of-service" className="text-muted-foreground hover:text-accent transition-colors px-2">
            {t.termsOfService}
          </Link>
          <Link href="/privacy-policy" className="text-muted-foreground hover:text-accent transition-colors px-2">
            {t.privacyPolicy}
          </Link>
          <Link href="/user-manual" className="text-muted-foreground hover:text-accent transition-colors px-2">
            {t.userManual}
          </Link>
        </div>
        <p className="text-center text-sm leading-loose text-muted-foreground pt-4">
          Built by CB13 - Cousinbruno. &copy; {new Date().getFullYear()} IAIA. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
