"use client";

import Image from 'next/image';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="bg-pure-white rounded-2xl shadow-soft overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative w-full h-48 sm:h-64 bg-off-white flex items-center justify-center p-4">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-dark-slate mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-poke-blue font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="w-full bg-poke-yellow text-dark-slate font-bold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-poke-yellow focus:ring-opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}