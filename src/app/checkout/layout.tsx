import Link from 'next/link';

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-off-white text-dark-slate">
        <header className="bg-pure-white shadow-sm sticky top-0 z-50">
          <nav className="container mx-auto p-4 flex items-center justify-center">
            <Link href="/" className="text-2xl font-bold tracking-tight text-dark-slate">
              PokeStore
            </Link>
          </nav>
        </header>
        <main className="min-h-screen flex flex-col items-center justify-between p-6 sm:p-12">
          {children}
        </main>
        {/* No footer in checkout layout to reduce distractions */}
      </body>
    </html>
  );
}