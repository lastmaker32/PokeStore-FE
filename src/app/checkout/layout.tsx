import Link from 'next/link';

export const metadata = {
  title: 'Checkout | PokeStore',
  description: 'Complete your purchase at PokeStore.',
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-off-white">
      {/* Minimal Header for Checkout */}
      <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <nav className="container mx-auto flex justify-center">
          <Link href="/" className="text-2xl font-bold text-poke-red">
            PokeStore
          </Link>
        </nav>
      </header>

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      {/* Optional: A minimal footer for checkout, or no footer */}
      <footer className="bg-gray-100 text-gray-600 p-4 text-center text-sm">
        &copy; {new Date().getFullYear()} PokeStore.
      </footer>
    </div>
  );
}