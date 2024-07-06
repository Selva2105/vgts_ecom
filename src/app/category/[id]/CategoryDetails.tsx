'use client';

import React, { useEffect, useState, useCallback } from 'react';
import CategoryHeader from './CategoryHeader';
import CategoryProducts from './CategoryProducts';
import { useStore } from '@/context/StoreContext';
import { fetchCategoryProducts } from '../../../utils/ProductService';
import { Product } from '@/types/product';
import CardLoader from '@/components/ui/card-loader';

const CategoryDetails = ({ categoryId }: { categoryId: string | number }) => {
    const { categories } = useStore();
    const category = categories.find(cat => cat.id === Number(categoryId));

    const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetchCategoryProducts(categoryId);
            setCategoryProducts(response);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch products');
            setLoading(false);
        }
    }, [categoryId]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (loading) {
        return <CardLoader />;
    }
    if (error) return <p>{error}</p>;

    return (
        <div className='mx-10 mt-4'>
            <CategoryHeader categoryName={category?.name ?? 'Loading'} />
            <CategoryProducts products={categoryProducts} />
        </div>
    );
};

export default CategoryDetails;