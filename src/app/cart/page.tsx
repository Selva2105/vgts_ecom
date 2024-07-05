/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { MinusIcon, PlusIcon } from 'lucide-react';
import React from 'react'

const Cart = () => {
    const { cart, decreaseCount, increaseCount } = useStore();
    const getProductCount = (productId: number) => {
        const cartItem = cart.find(item => item.product.id === productId);
        return cartItem ? cartItem.count : 0;
    };


    return (
        <div className='mx-10 mt-4'>
            <h2 className='text-2xl font-semibold'>Cart items</h2>

            <div className="flex flex-row gap-4">
                <div className="w-[60%] flex flex-col gap-4 mt-4 ">
                    {cart.map((item) => (
                        <div className="bg-gray-50 flex flex-row items-center justify-between gap-4 p-4 border border-gray-200 rounded-md" key={item.product.id}>
                            <div className="flex flex-row items-center gap-4">
                                <img src={item.product.images[0]} alt={item.product.title} className='w-20 h-20' />
                                <span className='flex flex-col gap-2'>
                                    <h3 className='text-base font-semibold'>{item.product.title}</h3>
                                    <p className='text-base font-semibold'>{item.product.price}</p>
                                </span>
                            </div>
                            <div className="">
                                <div className="p-4 pb-0 w-full">
                                    <div className="w-full flex items-center justify-between space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10 shrink-0 "
                                            onClick={() => decreaseCount(item.product.id)}
                                        >
                                            <MinusIcon className="h-4 w-4" />
                                            <span className="sr-only">Decrease</span>
                                        </Button>
                                        <div className="flex-1 text-center">
                                            <div className="text-xl font-bold tracking-tighter">
                                                {getProductCount(item.product.id)}
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="h-10 w-10 shrink-0"
                                            onClick={() => increaseCount(item.product.id)}
                                        >
                                            <PlusIcon className="h-4 w-4" />
                                            <span className="sr-only">Increase</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-[40%] flex flex-col gap-4 mt-4 ">
                    <div className="bg-gray-50 p-4 border border-gray-200 rounded-md">
                        <h3 className='text-2xl font-semibold'>Summary</h3>
                        <ul className='space-y-4'>
                            {cart.map((item) => (
                                <li key={item.product.id} className='flex flex-row justify-between items-center w-full'>
                                    <p>{item.product.title}</p>
                                    <p>{item.product.price} x {getProductCount(item.product.id)} = {item.product.price * getProductCount(item.product.id)}</p>
                                </li>
                            ))}
                            <li className='flex flex-row justify-end items-end w-full mt-2'>
                                <p>Total = {cart.reduce((acc, item) => acc + item.product.price * getProductCount(item.product.id), 0)}</p>
                            </li>
                        </ul>
                    </div>

                    <Button className='w-full'>Place Order</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart