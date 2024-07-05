/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/context/StoreContext';
import { Product } from '@/types/product';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CategoryProducts = ({ products }: { products: Product[] }) => {
    const { addToCart, cart, increaseCount, decreaseCount } = useStore();
    const router = useRouter();

    const getProductCount = (productId: number) => {
        const cartItem = cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.count : 0;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
            {products.map((product) => (
                <Card
                    className="w-full max-w-xs cursor-pointer hover:shadow-lg flex flex-col justify-between"
                    key={product.id}
                >
                    <img
                        src={product.images[0].toString()}
                        width="400"
                        height="250"
                        alt={product.category.name}
                        className="aspect-[1.6] object-cover"
                        onClick={() => router.push(`/product/${product.id}`)}
                    />
                    <CardHeader className="p-4">
                        <CardTitle className="text-lg">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>₹ {product.price} /-</p>
                    </CardContent>
                    <CardFooter className='w-full justify-center'>
                        {getProductCount(product.id) === 0 ? (
                            <Button className='w-full' onClick={() => addToCart(product)}>
                                Add to Cart
                            </Button>
                        ) : (
                            <div className="p-4 pb-0 w-full">
                                <div className="w-full flex items-center justify-between space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 shrink-0 "
                                        onClick={() => decreaseCount(product.id)}
                                    >
                                        <MinusIcon className="h-4 w-4" />
                                        <span className="sr-only">Decrease</span>
                                    </Button>
                                    <div className="flex-1 text-center">
                                        <div className="text-xl font-bold tracking-tighter">
                                            {getProductCount(product.id)}
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-10 w-10 shrink-0"
                                        onClick={() => increaseCount(product.id)}
                                    >
                                        <PlusIcon className="h-4 w-4" />
                                        <span className="sr-only">Increase</span>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default CategoryProducts;