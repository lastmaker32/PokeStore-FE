"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function Header() {
  const totalItems = useCartStore((state) => state.cartItems.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <header className="bg-poke-red text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          PokeStore
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/catalog" className="hover:text-poke-yellow transition-colors duration-200">
            Shop
          </Link>
          <Link href="/cart" className="relative hover:text-poke-yellow transition-colors duration-200">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-poke-yellow text-poke-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {/* TODO: Add auth/user links */}
        </div>
      </nav>
    </header>
  );
}