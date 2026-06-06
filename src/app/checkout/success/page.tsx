'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '../../../store/useCartStore';
import { getOrderStatus, OrderResponse } from '../../../services/checkoutService';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'; // Lucide icons for status

const POLLING_INTERVAL = 3000; // Poll every 3 seconds

const CheckoutSuccessPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const { clearCart } = useCartStore();

  const [orderStatus, setOrderStatus] = useState<OrderResponse['status'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError('Order ID not found in URL.');
      setLoading(false);
      return;
    }

    let interval: NodeJS.Timeout;

    const pollStatus = async () => {
      try {
        const response = await getOrderStatus(orderId);
        setOrderStatus(response.status);

        if (response.status === 'Paid') {
          clearCart(); // Clear cart once payment is successful
          clearInterval(interval); // Stop polling
          setLoading(false);
        } else if (response.status === 'Failed') {
          clearInterval(interval);
          setLoading(false);
          setError('Order payment failed. Please try again.');
        }
      } catch (err) {
        console.error('Error polling order status:', err);
        setError('Failed to fetch order status. Please check your internet connection.');
        clearInterval(interval); // Stop polling on error
        setLoading(false);
      }
    };

    // Start polling
    interval = setInterval(pollStatus, POLLING_INTERVAL);

    // Initial check immediately
    pollStatus();

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [orderId, clearCart]);

  const getStatusIcon = () => {
    switch (orderStatus) {
      case 'Paid':
        return <CheckCircle2 size={64} className="text-green-500" />;
      case 'Pending':
      case 'Processing':
        return <Loader2 size={64} className="text-poke-blue animate-spin" />;
      case 'Failed':
        return <XCircle size={64} className="text-red-500" />;
      default:
        return <Loader2 size={64} className="text-gray-400 animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (orderStatus) {
      case 'Paid':
        return 'Gotcha! Your order was successfully caught!';
      case 'Pending':
      case 'Processing':
        return 'Processing your order... Please wait.';
      case 'Failed':
        return 'Oh no! Your order payment failed.';
      default:
        return 'Checking order status...';
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-lg w-full">
        {error ? (
          <>
            <XCircle size={64} className="text-red-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
            <p className="text-lg text-gray-700 mb-6">{error}</p>
            <Link href="/catalog" className="bg-poke-blue text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 text-lg font-medium shadow-md">
              Return to Catalog
            </Link>
          </>
        ) : (
          <>
            <div className="mb-6">{getStatusIcon()}</div>
            <h1 className="text-3xl font-bold text-poke-red mb-4">{getStatusMessage()}</h1>
            {orderId && <p className="text-gray-600 mb-2">Order ID: <span className="font-mono text-poke-blue">{orderId}</span></p>}
            {orderStatus !== 'Paid' && orderStatus !== 'Failed' && (
              <p className="text-gray-700 mb-6">We are confirming your payment. This page will update automatically.</p>
            )}
            {(orderStatus === 'Paid' || orderStatus === 'Failed') && (
              <Link href="/catalog" className="mt-6 bg-poke-blue text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors duration-200 text-lg font-medium shadow-md">
                Continue Shopping
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;