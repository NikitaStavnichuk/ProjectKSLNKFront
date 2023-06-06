'use client';
import { serverUrl } from '@/shared/config';
import { CartItem } from '@/shared/domain'
import React, { useState } from 'react'

export const ProfileOrder = ({ cart, created, id, status, time }: { 
  id: string, 
  created: string, 
  status: number, 
  time: string, 
  cart: CartItem[] 
}) => {
  const [open, setOpen] = useState(false)
  console.log(status === 2 ? 'dark-yellow' : 'dark-green')
  return (
    <div className='flex flex-col gap-4 w-full '>
      <div className='flex gap-3 flex-col w-full bg-pink-200 px-2 py-4' onClick={() => setOpen(e => !e)}>
        <div>{ id } от { new Date(created).toLocaleString() }</div>
        <div>Статус: <span style={{ color: status === 2 ? 'yellow' : 'green' }}>{ status === 2 ? 'На обработке/в процессе' : 'Готово' }</span></div>
      </div>
      <div>
        {open && 
        cart.map(el => (
          <div key={el.clothing.clothingId + id} className='flex gap-3 p-3'>
            <img alt="Clothing" src={serverUrl + 'static/' + el.clothing.productPicture} width={80} height={80} />
            <div>{el.clothing.name}</div>
            <div>{el.count} шт.</div>
          </div>
        ))}
      </div>
    </div>
  )
}
