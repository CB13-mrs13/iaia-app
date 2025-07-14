
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

// Using a simple object for translations as this component is standalone
const notFoundTranslations = {
  en: {
    title: "404 - Page Lost in Space",
    subtitle: "Oops! It seems the page you're looking for has ventured into the cosmos.",
    button: "Return to Home Base",
  },
  fr: {
    title: "404 - Page Perdue dans l'Espace",
    subtitle: "Oups ! Il semble que la page que vous cherchez s'est aventurée dans le cosmos.",
    button: "Retour à la Base",
  },
  es: {
    title: "404 - Página Perdida en el Espacio",
    subtitle: "¡Vaya! Parece que la página que buscas se ha aventurado en el cosmos.",
    button: "Volver a la Base",
  },
};

export default function NotFound() {
  const { language } = useLanguage();
  const t = notFoundTranslations[language] || notFoundTranslations.en;

  return (
    <div className="relative flex min-h-[calc(100vh-theme(spacing.32))] items-center justify-center text-center text-white overflow-hidden p-4">
      {/* Background Image */}
      <Image
        src="/images/luchador-astronaut.jpg"
        alt="A luchador astronaut lost in space"
        fill
        style={{ objectFit: 'cover' }}
        className="z-0"
        data-ai-hint="luchador astronaut"
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center animate-fadeIn space-y-6">
        <h1 className="text-6xl md:text-8xl font-bold leading-none animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          404
        </h1>
        <h2 className="text-2xl md:text-4xl font-extrabold text-primary animate-slideInUp" style={{ animationDelay: '0.5s' }}>
          {t.title}
        </h2>
        <p className="max-w-md text-lg text-white/80 animate-slideInUp" style={{ animationDelay: '0.6s' }}>
          {t.subtitle}
        </p>
        <Button asChild size="lg" className="mt-8 text-lg animate-slideInUp" style={{ animationDelay: '0.8s' }}>
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            {t.button}
          </Link>
        </Button>
      </div>
    </div>
  );
}
