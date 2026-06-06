'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

const Header = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-poke-red">
          PokeStore
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/catalog" className="text-gray-700 hover:text-poke-blue transition-colors duration-200">
            Catalog
          </Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-poke-blue transition-colors duration-200">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-poke-yellow text-poke-red rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;