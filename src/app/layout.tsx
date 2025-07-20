
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import QueryProvider from '@/contexts/query-provider';
import CookieConsentBanner from '@/components/layout/cookie-consent-banner';

// Optimized font loading with next/font
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap', // Important for performance
});

export const metadata: Metadata = {
  title: 'IAIA - Your AI Tool Companion',
  description: 'Discover and utilize the best AI tools for your needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className={`font-body antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <QueryProvider>
          <LanguageProvider>
            <AuthProvider>
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
              <Toaster />
              <CookieConsentBanner />
            </AuthProvider>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
