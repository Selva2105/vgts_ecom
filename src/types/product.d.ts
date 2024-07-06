export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface CartItem {
  product: Product;
  count: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}
