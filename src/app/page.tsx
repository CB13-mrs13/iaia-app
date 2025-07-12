
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Mail, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import { translations } from '@/lib/translations';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

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
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden relative h-96 shadow-2xl md:h-[600px] lg:h-[700px]">
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
              style={{ objectFit: 'cover' }}
              className="w-full h-full"
              data-ai-hint={item.hint}
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 p-6 md:p-12">
              <h3 className="text-white text-2xl md:text-4xl font-bold">{item.caption}</h3>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={goToPrevious} variant="outline" size="icon" className="absolute top-1/2 -left-4 md:left-12 transform -translate-y-1/2 rounded-full z-20 h-12 w-12">
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button onClick={goToNext} variant="outline" size="icon" className="absolute top-1/2 -right-4 md:right-12 transform -translate-y-1/2 rounded-full z-20 h-12 w-12">
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
};

interface HeroItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

const HeroSlideshow = ({ items }: { items: HeroItem[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language].landingPage;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[currentIndex];

  return (
    <>
      <div key={currentIndex} className="absolute inset-0 h-full w-full overflow-hidden">
        {currentItem.type === 'image' ? (
          <Image
            src={currentItem.src}
            alt={currentItem.alt}
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="animate-ken-burns"
          />
        ) : (
          <video
            src={currentItem.src}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
       <div className="absolute inset-0 bg-black/20" />
        <div className="z-10 p-4 animate-fadeIn">
          <h1 className="text-8xl md:text-9xl font-bold leading-none mb-4 animate-slideInUp" style={{ animationDelay: '0.2s' }}>
            {currentItem.title}
          </h1>
          <h2 className="text-5xl md:text-7xl font-extrabold text-primary animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            {currentItem.subtitle}
          </h2>
          <Button asChild size="lg" className="mt-8 text-lg animate-slideInUp" style={{ animationDelay: '0.8s' }}>
            <Link href="/signup">
              {t.heroButton}
            </Link>
          </Button>
        </div>
    </>
  );
};


export default function LandingPage() {
  const { language } = useLanguage();
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = translations[language].landingPage;

  useEffect(() => {
    // This effect is now removed to prevent unwanted redirection.
    // Page protection logic is handled on protected pages like /discover.
  }, [user, loading, router]);


  const carouselItems = [
    { image: '/images/catcheur-iaia.jpg', caption: t.carouselCaption1, hint: 'wrestler champion' },
    { image: '/images/ballerine-iaia.jpg', caption: t.carouselCaption2, hint: 'ballerina queen' },
    { image: '/images/ceo-iaia.jpg', caption: t.carouselCaption3, hint: 'boss commanding' },
  ];

  const heroItems: HeroItem[] = [
    { type: 'video', src: '/videos/wrestler-hero.mp4', alt: 'A powerful wrestler celebrating victory', title: t.heroTitle, subtitle: t.heroSubtitleKing },
    { type: 'image', src: '/images/ballerine-iaia.jpg', alt: 'An elegant ballerina performing', title: t.heroTitle, subtitle: t.heroSubtitleQueen },
    { type: 'image', src: '/images/ceo-iaia.jpg', alt: 'A confident businessperson in command', title: t.heroTitle, subtitle: t.heroSubtitleBoss },
  ];

  if (loading || (!loading && user)) {
    // While the user object is loading, we can show a loader, but not for a logged-in user to avoid flicker.
    if(loading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    // A logged-in user will be redirected from a protected page if they land here,
    // but we let them see the landing page if they navigate to it directly.
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
      >
        <HeroSlideshow items={heroItems} />
      </section>

      {/* Section 1: What is IAIA? */}
      <section className="py-20 px-4 bg-card">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">{t.section1Title}</h2>
            <p className="text-lg text-muted-foreground">
              {t.section1Text1}
            </p>
            <p className="text-xl font-semibold text-primary">
              {t.section1Text2}
            </p>
             <Button variant="secondary" asChild>
                <Link href="#how-it-works">
                  {t.section1Button}
                </Link>
            </Button>
          </div>
          <Link href="/signup" className="group block transition-transform duration-300 hover:scale-105">
            <div 
              className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-xl flex items-center justify-center p-8 bg-primary group-hover:bg-accent transition-colors duration-300"
              data-ai-hint="iaia logo abstract"
            >
              <Image src="/iaia-logo.png" alt="IAIA Logo" width={200} height={200} className="w-40 h-40 md:w-52 md:h-52 object-contain transition-transform duration-300 group-hover:scale-75" />
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <p className="text-center text-2xl md:text-3xl font-bold text-white leading-relaxed drop-shadow-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {t.logoSlogan}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Section 2: Storytelling */}
       <section className="py-20 bg-background text-center">
        <div className="container mx-auto max-w-none px-0">
          <h2 className="text-4xl font-bold mb-12 px-4">{t.section2Title}</h2>
          <Carousel items={carouselItems} />
        </div>
        <div className="container mx-auto mt-12 max-w-3xl space-y-4">
          <p className="text-lg text-muted-foreground">
            {t.section2Text1}
          </p>
          <p className="text-2xl font-semibold">
            {t.section2Text2}
          </p>
          <Link href="/signup" className="block transition-transform duration-300 hover:scale-105">
            <p className="text-lg font-medium bg-accent text-accent-foreground p-4 rounded-lg shadow-md">
              {t.section2Text3}
            </p>
          </Link>
        </div>
      </section>
      
      {/* Section 3: How it works? */}
      <section id="how-it-works" className="py-20 px-4 bg-card">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">{t.section3Title}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Card>
              <CardContent className="p-6">
                <div className="text-5xl font-extrabold text-primary mb-4">1.</div>
                <h3 className="text-xl font-semibold mb-2">{t.step1Title}</h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-md italic">{t.step1Text}</p>
              </CardContent>
            </Card>
             <Card>
              <CardContent className="p-6">
                <div className="text-5xl font-extrabold text-primary mb-4">2.</div>
                <h3 className="text-xl font-semibold mb-2">{t.step2Title}</h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-md italic">{t.step2Text}</p>
              </CardContent>
            </Card>
             <Card>
              <CardContent className="p-6">
                <div className="text-5xl font-extrabold text-primary mb-4">3.</div>
                <h3 className="text-xl font-semibold mb-2">{t.step3Title}</h3>
                <p className="text-muted-foreground bg-muted p-3 rounded-md italic">{t.step3Text}</p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-8 text-xl font-bold text-primary">{t.section3Benefit}</p>
        </div>
      </section>

      {/* Section 4: Why IAIA is different? */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">{t.section4Title}</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>{t.feature1}</span></li>
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>{t.feature2}</span></li>
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>{t.feature3}</span></li>
            <li className="flex items-start"><Check className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" /><span>{t.feature4}</span></li>
          </ul>
          <Link href="/signup" className="block mt-12 transition-transform duration-300 hover:scale-105">
            <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <p className="text-lg font-medium">{t.section4Quote}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="py-20 px-4 bg-accent text-accent-foreground">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-5xl font-extrabold mb-8">{t.section5Title}</h2>
          <div className="bg-card text-card-foreground p-8 rounded-lg shadow-2xl">
            {/* The beta sign-up form is temporarily hidden */}
            <div className="hidden">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                   <Input type="email" placeholder={t.formPlaceholder} className="pl-10 h-12 text-base" />
                </div>
                 <Button type="submit" size="lg" variant="secondary" className="w-full text-lg">
                    {t.formButton}
                  </Button>
              </form>
               <p className="text-xs text-muted-foreground mt-2">{t.formDisclaimer}</p>
               <div className="my-4 flex items-center">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink mx-4 text-muted-foreground text-sm">{t.formOr}</span>
                <div className="flex-grow border-t border-border"></div>
              </div>
            </div>
            
             <Button asChild size="lg" className="w-full text-lg">
                <Link href="/signup">
                  {t.formButton2}
                </Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
