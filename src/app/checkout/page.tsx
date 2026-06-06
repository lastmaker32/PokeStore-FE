"use client";

import { useState, FormEvent } from 'react';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCartStore();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    const orderData = {
      shippingInfo,
      cartItems,
      subtotal,
      tax,
      total,
      orderDate: new Date().toISOString(),
    };
    console.log('Placing Order:', orderData);
    // TODO: Integrate with .NET OrderController and Payment Gateway in Phase 4
    alert('Order Placed! (Check console for details)');
    clearCart(); // Clear cart after placing order
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-off-white min-h-screen">
      <h1 className="text-4xl font-bold text-dark-slate mb-8 text-center">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="bg-pure-white rounded-2xl shadow-soft p-6">
          <h2 className="text-2xl font-semibold text-dark-slate mb-6">Shipping Information</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-dark-slate text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-poke-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-dark-slate text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-poke-blue"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-dark-slate text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-poke-blue"
                  required
                />
              </div>
              <div>
                <label htmlFor="zip" className="block text-dark-slate text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  value={shippingInfo.zip}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-poke-blue"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-pure-white rounded-2xl shadow-soft p-6 h-fit">
          <h2 className="text-2xl font-semibold text-dark-slate mb-6">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-center space-x-3">
                <div className="relative w-16 h-16 flex-shrink-0 bg-off-white rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="64px"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-dark-slate line-clamp-1">{item.name}</p>
                  <p className="text-sm text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <p className="font-bold text-dark-slate">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-dark-slate border-t border-gray-200 pt-6 mt-6">
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

          <button
            type="submit"
            className="mt-8 w-full bg-poke-yellow text-dark-slate font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-yellow-400 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-poke-yellow focus:ring-opacity-50"
            disabled={cartItems.length === 0}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}