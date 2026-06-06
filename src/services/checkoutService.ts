import api from '../lib/api';
import { CartItem } from '../types';

export interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  zip: string;
}

export interface OrderPayload {
  shippingInfo: ShippingInfo;
  cartItems: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  orderDate: string;
}

export interface OrderResponse {
  orderId: string;
  status: 'Pending' | 'Processing' | 'Paid' | 'Failed';
  // Add other relevant order details from backend
}

export const submitOrder = async (payload: OrderPayload): Promise<OrderResponse> => {
  try {
    const response = await api.post<OrderResponse>('/orders', payload);
    return response.data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId: string): Promise<OrderResponse> => {
  try {
    const response = await api.get<OrderResponse>(`/orders/${orderId}/status`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order status for ${orderId}:`, error);
    throw error;
  }
};