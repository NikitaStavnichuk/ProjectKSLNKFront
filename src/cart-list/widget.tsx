'use client';
import ItemCounter from '@/item-counter/widget';
import { useCartStore } from '@/shared/cart-store';
import { serverUrl } from '@/shared/config';
import Link from 'next/link';
import React from 'react'

export default function CartList () {
  const { items } = useCartStore()

  return (
    <div className='flex flex-col gap-4'>
      { items.length ?
        <>
        <p className='text-3xl text-center'>cart</p>
        <div className='bg-pink-400 px-2 py-4'>
          { items.map(item => (
            <div className='flex justify-between min-w-[75vw]' key={item.clothing.clothingId}>
              <div className='flex gap-3'>
                <img 
                  src={serverUrl + 'static/' + item.clothing.productPicture} 
                  alt="clothingPic" 
                  className="h-[150px] w-[150px] block" 
                />
                <div className='flex flex-col gap-2'>
                  <p>{item.clothing.name}</p>
                  <p>{item.clothing.price}₽/шт.</p>
                </div>
              </div>
              <div className='basis-1/4 flex flex-col gap-2'>
                <ItemCounter item={item.clothing} />
                <p className='text-xl'>{item.clothing.price * item.count}₽</p>
              </div>
            </div>
          )) }
        </div>
        <div className='text-2xl'>
          total: {items.reduce((acc, cur) => acc + cur.count * cur.clothing.price, 0)}₽
        </div>
        <Link href='/check-out' className='w-full '>
          <button className='bg-pink-500 py-2 text-2xl w-full'>check out</button>
        </Link>
      </>
      : <p>cart is empty</p> }
    </div>
  )
}
