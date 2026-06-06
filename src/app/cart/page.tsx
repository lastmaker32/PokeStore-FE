'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../../store/useCartStore';

const TAX_RATE = 0.08; // 8% tax

const CartPage = () => {
  const { cartItems, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-poke-red mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
          <Link href="/catalog" className="bg-poke-blue text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 text-lg font-medium">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Items in Cart</h2>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-200 pb-6">
                  <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                    <Image
                      src={item.imageUrl || '/placeholder-pokemon.png'}
                      alt={item.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-xl border border-gray-100"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="text-poke-blue font-bold text-xl mt-1">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity === 1}
                        className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="mx-3 text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 h-fit">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg border-b pb-3 border-gray-200">
                <span>Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-poke-red pt-3">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" className="mt-8 w-full block text-center bg-poke-yellow text-gray-800 py-3 px-6 rounded-xl hover:bg-yellow-400 transition-colors duration-200 text-lg font-medium shadow-md">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;