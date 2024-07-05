/* eslint-disable @next/next/no-img-element */
'use client'
import { Product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { fetchProductById } from './ProductService';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MinusIcon, PlusIcon } from 'lucide-react';

const ProductDetails = ({ productId }: { productId: string }) => {

    const [products, setProducts] = useState<Product>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addToCart, cart, increaseCount, decreaseCount } = useStore();
    const router = useRouter();

    const getProductCount = (productId: number) => {
        const cartItem = cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.count : 0;
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchProductById(productId);
                setProducts(response);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [productId]);

    console.log('products', products);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div className='mx-10 mt-4'>
            <span>{products?.category.name}/{products?.title}</span>

            <div className='grid grid-cols-2 gap-20 mt-4'>
                <div>
                    <img src={products?.images[0]} alt={products?.title} className='h-[80%] w-full' />
                </div>
                <div className='space-y-4'>
                    <h1 className='text-xl font-semibold'>{products?.title}</h1>
                    <p className='text-lg font-normal'>{products?.description}</p>
                    <p className='text-lg font-semibold'>₹ {products?.price} /-</p>
                    {getProductCount(products?.id ?? 0) === 0 ? (
                            <Button className='w-2/4' onClick={() => products && addToCart(products)}>
                                Add to Cart
                            </Button>
                        ) : (
                            <div className="p-4 pb-0 w-2/4">
                                <div className="w-full flex items-center justify-between space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 shrink-0 "
                                        onClick={() => decreaseCount(products?.id ?? 0)}
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                        <span className="sr-only">Decrease</span>
                                    </Button>
                                    <div className="flex-1 text-center">
                                        <div className="text-xl font-bold tracking-tighter">
                                            {getProductCount(products?.id ?? 0)}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 shrink-0"
                                        onClick={() => increaseCount(products?.id ?? 0)}
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
};

export default ProductDetails;