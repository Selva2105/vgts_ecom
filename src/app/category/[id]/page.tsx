import React from 'react';
import CategoryDetails from './CategoryDetails';
import { StoreProvider } from '@/context/StoreContext';

const CategoryPage = ({ params }: { params: { id: string } }) => {
debugger;
  const { id } = params;

  return (
      <CategoryDetails categoryId={id} />
  );
};

export default CategoryPage;