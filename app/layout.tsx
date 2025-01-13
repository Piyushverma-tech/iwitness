import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { Providers } from './providers';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iWitness - Anonymous Crime Reporting App',

  description:
    'iWitness is an anonymous crime reporting app empowering individuals to safely and securely report incidents without revealing their identity. With real-time reporting, location tagging, and AI-driven categorization, iWitness connects citizens with authorities to create safer communities. Take action, stay anonymous, and make a difference with iWitness.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <div className="relative min-h-screen bg-black selection:bg-sky-500/20">
          {/* gradient bg */}
          <div className="fixed inset-0 -z-10 min-h-screen">
            <div className="absolute inset-0 h-full bg[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
            <div className="absolute inset-0 h-full bg[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
          </div>
          {/* navbar */}
          <Navbar />
          <main className="pt-16">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
