'use client'
import { Product } from '@/types/product';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { fetchProductById } from './ProductService';
import { useStore } from '@/context/StoreContext';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { getProductCount } from '@/utils';

const ProductDetails = React.memo(({ productId }: { productId: string }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, cart, increaseCount, decreaseCount } = useStore();

    const fetchProduct = useCallback(async () => {
        try {
            const response = await fetchProductById(productId);
            setProduct(response);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch product');
            setLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const productCount = useMemo(() => getProductCount(cart, product?.id ?? 0), [cart, product]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className='mx-10 mt-4'>
            <span>{product?.category.name}/{product?.title}</span>
            <div className='grid grid-cols-2 gap-20 mt-4'>
                <div>
                    <img src={product?.images[0]} alt={product?.title} className='h-[80%] w-full' />
                </div>
                <div className='space-y-4'>
                    <h1 className='text-xl font-semibold'>{product?.title}</h1>
                    <p className='text-lg font-normal'>{product?.description}</p>
                    <p className='text-lg font-semibold'>₹ {product?.price} /-</p>
                    {productCount === 0 ? (
                        <Button className='w-2/4' onClick={() => product && addToCart(product)}>
                            Add to Cart
                        </Button>
                    ) : (
                        <div className="p-4 pb-0 w-2/4">
                            <div className="w-full flex items-center justify-between space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 shrink-0"
                                    onClick={() => decreaseCount(product?.id ?? 0)}
                                >
                                    <MinusIcon className="h-4 w-4" />
                                    <span className="sr-only">Decrease</span>
                                </Button>
                                <div className="flex-1 text-center">
                                    <div className="text-xl font-bold tracking-tighter">
                                        {productCount}
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 shrink-0"
                                    onClick={() => increaseCount(product?.id ?? 0)}
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    <span className="sr-only">Increase</span>
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

ProductDetails.displayName = 'ProductDetails';

export default ProductDetails;