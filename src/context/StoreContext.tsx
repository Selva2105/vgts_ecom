"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '@/types/product';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CartItem {
  product: Product;
  count: number;
}

interface StoreContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  cart: CartItem[];
  cartLen: number;
  addToCart: (product: Product) => void;
  increaseCount: (productId: number) => void;
  decreaseCount: (productId: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  const [cartLen, setCartLen] = useState(0);

  useEffect(() => {
      setCartLen(cart.length);
  }, [cart.length]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
        const filteredCategories = response.data.filter(
          (category: Category) => category.name !== 'Test' && category.name !== 'New Category'
        );
        setCategories(filteredCategories);
      } catch (err) {
        setError('Failed to fetch categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const updateLocalStorage = (cart: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map(item =>
          item.product.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { product, count: 1 }];
      }
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const increaseCount = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.product.id === productId ? { ...item, count: item.count + 1 } : item
      );
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const decreaseCount = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.product.id === productId ? { ...item, count: Math.max(item.count - 1, 0) } : item
      ).filter(item => item.count > 0);
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  return (
    <StoreContext.Provider value={{ categories, loading, error, cart, addToCart, increaseCount, decreaseCount, cartLen }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};