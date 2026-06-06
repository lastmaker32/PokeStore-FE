'use client';

import { useState } from 'react';
import { useCartStore } from '../../store/useCartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter
import { submitOrder, OrderPayload, ShippingInfo } from '../../services/checkoutService'; // Import submitOrder and types

const TAX_RATE = 0.08; // 8% tax

const CheckoutPage = () => {
  const router = useRouter(); // Initialize useRouter
  const { cartItems, getTotalPrice, clearCart } = useCartStore();
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    address: '',
    city: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const subtotal = getTotalPrice();
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when order is being placed

    const orderPayload: OrderPayload = {
      shippingInfo,
      cartItems: cartItems.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: subtotal,
      tax: tax,
      total: total,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await submitOrder(orderPayload);
      console.log('Order submitted successfully:', response);
      alert('Order placed successfully! Redirecting to success page.');
      router.push(`/checkout/success?orderId=${response.orderId}`); // Redirect to success page
    } catch (error) {
      console.error('Failed to place order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty!</h1>
        <p className="text-lg text-gray-600 mb-8">Please add items to your cart before checking out.</p>
        <Link href="/catalog" className="bg-poke-blue text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 text-lg font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-poke-red mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Information Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={shippingInfo.name}
                onChange={handleInputChange}
                className="shadow-sm appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-poke-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleInputChange}
                className="shadow-sm appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-poke-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={shippingInfo.city}
                onChange={handleInputChange}
                className="shadow-sm appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-poke-blue"
                required
              />
            </div>
            <div>
              <label htmlFor="zip" className="block text-gray-700 text-sm font-bold mb-2">
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={shippingInfo.zip}
                onChange={handleInputChange}
                className="shadow-sm appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-poke-blue"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-poke-red text-white py-3 px-6 rounded-xl hover:bg-red-700 transition-colors duration-200 text-lg font-medium shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center">
                <div className="relative w-16 h-16 mr-4 flex-shrink-0">
                  <Image
                    src={item.imageUrl || '/placeholder-pokemon.png'}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-lg border border-gray-100"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-900 font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 mt-6 pt-6 space-y-3 text-gray-700">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span>Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-poke-red pt-3">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
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