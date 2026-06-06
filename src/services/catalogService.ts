import api from '../lib/api';
import { Product, Category } from '../types';

export const catalogService = {
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products');
    return response.data;
  },

  getProductById: async (productId: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${productId}`);
    return response.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  },

  getCategoryById: async (categoryId: string): Promise<Category> => {
    const response = await api.get<Category>(`/categories/${categoryId}`);
    return response.data;
  },
};