/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from '@/components/ui/button';
import { useStore } from '@/context/StoreContext';
import { getFirstImageUrl } from '@/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';

const Orders = () => {
  const { orders } = useStore();
  const router = useRouter();

  const getProductCount = useMemo(() => (productId: number | string) => {
    const item = orders.find((order) => order.items.find((item) => item.product.id === productId));
    return item?.items.find((item) => item.product.id === productId)?.count || 0;
  }, [orders]);

  if (orders.length === 0) {
    return (
      <div className='mx-10 mt-4'>
        <h2 className='text-2xl font-semibold'>Orders</h2>
        <div className="w-full flex flex-col items-center justify-center">
          <Image src="/images/searching.svg" alt="Empty Cart" width={500} height={500} />
          <div className='flex flex-col items-center justify-center gap-4 mt-4'>
            <p className='text-gray-600'>No orders yet </p>
            <Button onClick={() => router.push('/')} className='w-52'>Go to home</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-10 mt-4'>
      <h1 className='text-2xl font-semibold'>Orders</h1>
      <div className='mt-4'>
        {orders.map((order) => (
          <div key={order.id} className='border border-gray-200 p-4 mb-4'>
            <div className='flex flex-row justify-between'>
              <span className='font-bold'>Order ID: {order.id}</span>
              <span className='font-bold'>Total: ₹ {order.total} /-</span>
            </div>
            <div>
              <div className="flex flex-col items-staet gap-4 mt-4">
                {order.items.map((item, index) => (
                  <React.Fragment key={item.product.id}>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
                      <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-[60%] lg:w-2/4'>
                        <img src={getFirstImageUrl(item.product.images)} alt={item.product.title} className='w-full md:w-20 md:h-20' />
                        <span className='w-full flex flex-col gap-2'>
                          <h3 className='text-base'>{order.items[0].product.title}</h3>
                          <p className='text-base '>₹ {order.items[0].product.price} /-</p>
                        </span>
                      </div>
                      <div className='flex flex-row justify-start md:justify-end items-center w-full md:w-[40%] lg:w-2/4'>
                        <p>{item.product.price} x {getProductCount(item.product.id)} = {item.product.price * getProductCount(item.product.id)}</p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <hr />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;