
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Mail, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper component for Carousel
const Carousel = ({ items }: { items: { image: string; caption: string; hint: string }[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === items.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden relative h-96 rounded-lg shadow-2xl">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              'absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out',
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <Image
              src={item.image}
              alt={item.caption}
              fill
              className="object-cover"
              data-ai-hint={item.hint}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-white text-2xl font-bold">{item.caption}</h3>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={goToPrevious} variant="outline" size="icon" className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 rounded-full z-20">
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button onClick={goToNext} variant="outline" size="icon" className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 rounded-full z-20">
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};


export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/discover');
    }
  }, [user, loading, router]);
  
  // Prevent flash of content while checking auth state or redirecting
  if (loading || (!loading && user)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        {/* You can add a loader here if you want */}
      </div>
    );
  }

  const carouselItems = [
    { image: '/catcheur-iaia.jpg', caption: '“C’est toi le Roi.”', hint: 'wrestler champion' },
    { image: '/ballerine-iaia.jpg', caption: '“C’est toi la Reine.”', hint: 'ballerina queen' },
    { image: '/ceo-iaia.jpg', caption: '“Maintenant, c’est toi le Boss.”', hint: 'boss commanding' },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/catcheur-iaia.jpg"
          alt="Lutteur IAIA dominant le ring"
          fill
          className="object-cover -z-10"
          data-ai-hint="wrestler jumping"
          priority
        />
        <div className="absolute inset-0 bg-black/60 -z-10" />
        <div className="z-10 p-4 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            Tu croyais tout savoir sur l’IA ?
          </h1>
          <h2 className="text-5xl md:text-7xl font-extrabold text-primary animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            Avec IAIA, c’est toi le boss.
          </h2>
          <Button asChild size="lg" className="mt-8 text-lg animate-slideInUp" style={{ animationDelay: '0.8s' }}>
            <Link href="/signup">
              👉 Testez IAIA gratuitement
            </Link>
          </Button>
        </div>
      </section>

      {/* Section 1: What is IAIA? */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">IAIA, c’est quoi ?</h2>
            <p className="text-lg text-muted-foreground">
              Un assistant intelligent qui te dit quelle IA utiliser selon ce que tu veux créer.
              Texte, image, voix, code, vidéo :
            </p>
            <p className="text-xl font-semibold text-primary">
              👉 IAIA les connaît toutes. Et te guide vers la bonne, à chaque fois.
            </p>
             <Button variant="secondary" asChild>
                <Link href="#how-it-works">
                  → Voir des exemples <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
             <Image
                src="https://placehold.co/600x800.png"
                alt="Femme de ménage masquée"
                fill
                className="object-cover"
                data-ai-hint="masked cleaner"
              />
          </div>
        </div>
      </section>

      {/* Section 2: Storytelling */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Tu prends le pouvoir.</h2>
          <Carousel items={carouselItems} />
          <div className="mt-8 max-w-3xl mx-auto space-y-4">
            <p className="text-lg text-muted-foreground">
              Chaque image est une métaphore de ce que fait IAIA pour toi.
            </p>
            <p className="text-2xl font-semibold">
              IAIA t’arme. IAIA te propulse. IAIA t’élève.
            </p>
            <p className="text-lg font-medium bg-accent text-accent-foreground p-4 rounded-lg shadow-md">
              🔥 Peu importe ton niveau technique, IAIA te met aux commandes.
            </p>
          </div>
        </div>
      </section>
      
      {/* Section 3: How it works? */}
      <section id="how-it-works" className="py-20 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Card>
              <CardContent className="p-6">
                <div className="text-5xl font-extrabold text-primary mb-4">1.</div>
                <h3 className="text-xl font-semibold mb-2">Tu dis ce que tu veux créer</h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-md italic">“Je veux générer une voix féminine réaliste pour un podcast”</p>
              </CardContent>
            </Card>
             <Card>
              <CardContent className="p-6">
                <div className="text-5xl font-extrabold text-primary mb-4">2.</div>
                <h3 className="text-xl font-semibold mb-2">IAIA analyse et sélectionne</h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-md italic">Ex : ElevenLabs avec le bon réglage vocal</p>
              </CardContent>
            </Card>
             <Card>
              <CardContent className="p-6">
                <div className="text-5xl font-extrabold text-primary mb-4">3.</div>
                <h3 className="text-xl font-semibold mb-2">Tu passes à l’action</h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-md italic">...sans te perdre dans 100 outils.</p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-8 text-xl font-bold text-primary">🎯 Gain : temps, clarté, efficacité créative.</p>
        </div>
      </section>

      {/* Section 4: Why IAIA is different? */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Pourquoi IAIA est différent ?</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>IAIA ne te remplace pas : il <b>t’amplifie</b></span></li>
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>IAIA n’est pas une IA, c’est ton <b>coach IA</b></span></li>
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>IAIA s’adapte à toi : <b>novice ou expert</b></span></li>
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>IAIA croit que l’IA doit être <b>accessible à tous</b></span></li>
          </ul>
          <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-lg font-medium">💡 “Pas besoin d’être un dev, ni prompt master. Tu veux créer ? IAIA te montre comment.”</p>
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="py-20 px-4 bg-accent text-accent-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-8">C’est toi qui commandes maintenant.</h2>
          <div className="bg-card text-card-foreground p-8 rounded-lg shadow-2xl">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="relative">
                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                 <Input type="email" placeholder="Laisse ton email et accède à la version beta" className="pl-10 h-12 text-base" />
              </div>
               <Button type="submit" size="lg" className="w-full text-lg">
                  Rejoindre la beta
                </Button>
            </form>
             <p className="text-xs text-muted-foreground mt-2">🔐 Pas de spam, juste du pouvoir créatif</p>
             <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-muted-foreground text-sm">OU</span>
              <div className="flex-grow border-t border-border"></div>
            </div>
             <Button asChild size="lg" variant="secondary" className="w-full text-lg">
                <Link href="/signup">
                  👉 Tester IAIA maintenant
                </Link>
             </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto text-center">
          <Image src="/iaia-logo.png" alt="IAIA Logo" width={40} height={40} className="h-10 w-10 mx-auto mb-4" />
          <p className="text-sm">Built by CBT3 - Cousinbruno. © {new Date().getFullYear()} IAIA. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="#" className="hover:text-white">Réseaux sociaux</Link>
            <Link href="#" className="hover:text-white">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-white">Politique IA</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
