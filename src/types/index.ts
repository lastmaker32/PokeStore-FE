export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  // Add any other relevant product properties
}

export interface Category {
  id: string;
  name: string;
  // Add any other relevant category properties
}

export interface CartItem extends Product {
  quantity: number;
}