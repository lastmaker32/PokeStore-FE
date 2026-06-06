import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '../src/components/layouts/Header';
import Footer from '../src/components/layouts/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PokeStore',
  description: 'A high-volume e-commerce platform for Pokémon merchandise.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen bg-off-white">
          <Header />
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
