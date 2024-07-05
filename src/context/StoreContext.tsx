"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface StoreContextType {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <StoreContext.Provider value={{ categories, loading, error }}>
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