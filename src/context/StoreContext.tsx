"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartItem, Category, Order, Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { fetchCategoriesCall } from '@/utils/ProductService';

interface StoreContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
  cart: CartItem[];
  cartLen: number;
  orders: Order[];
  addToCart: (product: Product) => void;
  increaseCount: (productId: number) => void;
  decreaseCount: (productId: number) => void;
  placeOrder: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

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
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window !== 'undefined') {
      const savedOrders = localStorage.getItem('orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    }
    return [];
  });

  useEffect(() => {
    setCartLen(cart.length);
  }, [cart.length]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchCategoriesCall();
        const filteredCategories = response.filter(
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

  const updateLocalStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
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
      updateLocalStorage('cart', updatedCart);
      return updatedCart;
    });
  };

  const increaseCount = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.product.id === productId ? { ...item, count: item.count + 1 } : item
      );
      updateLocalStorage('cart', updatedCart);
      return updatedCart;
    });
  };

  const decreaseCount = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.product.id === productId ? { ...item, count: Math.max(item.count - 1, 0) } : item
      ).filter(item => item.count > 0);
      updateLocalStorage('cart', updatedCart);
      return updatedCart;
    });
  };

  const placeOrder = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: cart,
      total: cart.reduce((acc, item) => acc + item.product.price * item.count, 0),
      createdAt: new Date().toISOString()
    };
    setOrders((prevOrders) => {
      const updatedOrders = [...prevOrders, newOrder];
      updateLocalStorage('orders', updatedOrders);
      return updatedOrders;
    });
    setCart([]);
    updateLocalStorage('cart', []);
    router.push('/my-orders');
  };

  return (
    <StoreContext.Provider value={{ categories, loading, error, cart, addToCart, increaseCount, decreaseCount, cartLen, orders, placeOrder }}>
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