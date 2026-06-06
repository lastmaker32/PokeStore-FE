'use client';

import Image from 'next/image';
import { Product } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({ ...product, quantity: 1 });
    // Optionally add a toast notification here
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col transform hover:-translate-y-1">
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center">
        {/* Placeholder image for now */}
        <Image
          src={product.imageUrl || '/placeholder-pokemon.png'} // Use a placeholder image if not provided
          alt={product.name}
          layout="fill"
          objectFit="contain"
          className="rounded-t-2xl"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-poke-blue font-bold text-xl mb-4">${product.price.toFixed(2)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-poke-red text-white py-2 px-4 rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;