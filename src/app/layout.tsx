import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeStore",
  description: "A modern e-commerce platform for Pokémon enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-off-white text-dark-slate`}>
        <Header />
        <main className="min-h-[calc(100vh-theme(spacing.24))] sm:min-h-[calc(100vh-theme(spacing.32))] flex flex-col items-center justify-between p-6 sm:p-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
