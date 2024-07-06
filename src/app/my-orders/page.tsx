/* eslint-disable @next/next/no-img-element */
'use client'
import { useStore } from '@/context/StoreContext'
import { getFirstImageUrl } from '@/utils';
import React from 'react'

const Orders = () => {
  const { orders } = useStore();

  if (orders.length === 0) {
    return <div className='mx-10 mt-4'>
      <h1>No orders yet</h1>
    </div>
  }

  const getProductCount = (productId: number | string) => {
    const item = orders.find((order) => order.items.find((item) => item.product.id === productId));
    return item?.items.find((item) => item.product.id === productId)?.count || 0;
  };

  return (
    <div className='mx-10 mt-4'>
      <h1>Orders</h1>

      <div className='mt-4'>
        {
          orders.map((order) => (
            <div key={order.id} className='border border-gray-200 p-4 mb-4'>
              <div className='flex flex-row justify-between'>
                <span className='font-bold'>Order ID: {order.id}</span>
                <span className='font-bold'>Total: ₹ {order.total} /-</span>
              </div>
              <div>
                <div className="flex flex-col items-staet gap-4 mt-4">
                  {
                    order.items.map((item, index) => (
                      <>
                        <div key={item.product.id} className='flex flex-row items-center justify-between gap-4'>
                          <div className='flex flex-row items-center gap-4 w-2/4'>
                            <img src={getFirstImageUrl(item.product.images)} alt={item.product.title} className='w-20 h-20' />
                            <span className='flex flex-col gap-2'>
                              <h3 className='text-base'>{order.items[0].product.title}</h3>
                              <p className='text-base '>₹ {order.items[0].product.price} /-</p>
                            </span>
                          </div>
                          <div key={item.product.id} className='flex flex-row justify-end items-center w-2/4'>
                            <p>{item.product.price} x {getProductCount(item.product.id)} = {item.product.price * getProductCount(item.product.id)}</p>
                          </div>
                        </div>
                        {index < order.items.length - 1 && <hr />}
                      </>
                    ))
                  }
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders