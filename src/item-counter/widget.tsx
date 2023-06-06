'use client';

import { useCartStore } from '@/shared/cart-store';
import { Clothing } from '@/shared/domain';
import React, { useMemo } from 'react'

export default function ItemCounter ({ item }: { item: Clothing }) {
  const { dec, inc, items } = useCartStore()
  console.log(item, items);
    const count = items.find(el => el.clothing.clothingId === item.clothingId)?.count ?? 0;

  return (
    <div className='flex flex-row bg-white justify-between'>
      <button className='flex justify-center basis-full' onClick={() => inc(item)}>+</button>
      <div className='mx-1'>{count}</div>
      <button className='flex justify-center basis-full' onClick={() => dec(item)}>-</button>
    </div>
  )
}
