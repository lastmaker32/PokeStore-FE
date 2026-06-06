"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem } = useCartStore();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8 bg-off-white min-h-screen">
      <h1 className="text-4xl font-bold text-dark-slate mb-8 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/catalog" className="bg-poke-blue text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-poke-blue-dark focus:outline-none focus:ring-2 focus:ring-poke-blue focus:ring-opacity-50">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-pure-white rounded-2xl shadow-soft p-6">
            <h2 className="text-2xl font-semibold text-dark-slate mb-6">Items</h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4 border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="relative w-24 h-24 flex-shrink-0 bg-off-white rounded-xl overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-dark-slate text-lg">{item.name}</h3>
                    <p className="text-poke-blue font-bold">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="bg-gray-200 text-dark-slate p-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="text-dark-slate font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="bg-gray-200 text-dark-slate p-2 rounded-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="ml-4 text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 bg-pure-white rounded-2xl shadow-soft p-6 h-fit">
            <h2 className="text-2xl font-semibold text-dark-slate mb-6">Order Summary</h2>
            <div className="space-y-3 text-dark-slate">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (8%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between text-xl font-bold">
                <span>Order Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout"
              className="mt-8 w-full bg-poke-yellow text-dark-slate font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-yellow-400 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-poke-yellow focus:ring-opacity-50"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}