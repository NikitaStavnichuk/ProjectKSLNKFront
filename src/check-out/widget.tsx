'use client';
import { useCartStore } from '@/shared/cart-store'
import { serverUrl } from '@/shared/config'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const sendOrder = async (data: { cart: { clothingId: number, count: number }[], vk: string }) => {
  return await axios.post('/api/order', data)
}

export default function CheckOutForm () {
  const { items, reset } = useCartStore()
  const [ feedback, setFeedback ] = useState('')
  const client = useQueryClient()
  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: sendOrder,
    onSuccess: () => {
      reset()
      setFeedback('')
      router.push('/profile')
    }
  }) 

  const click = () => {
    mutate({
      vk: feedback,
      cart: items.map(el => ({ clothingId: el.clothing.clothingId, count: el.count }))
    })
  }

  return (
    <div className='flex flex-col gap-3'>
      <p className='mb-2 text-3xl text-center'>ur order:</p>
      <div className='flex flex-col gap-3'>
        { items.map(el => (
          <div key={el.clothing.clothingId} className='flex gap-3'>
            <img src={serverUrl + 'static/' + el.clothing.productPicture} 
                  alt="clothingPic" 
                  className="h-[150px] w-[150px] block" 
            />
            <div>count: {el.count}</div>
          </div>
        )) }
      </div>
      <p className='my-3 text-2xl'>total: {items.reduce((acc, cur) => acc + cur.count * cur.clothing.price, 0)}₽</p>
      <div className='text-center'>
        <p>Please leave a link to your VK. </p>
        <input className='p-2 w-full text-center' value={feedback} onChange={e => setFeedback(e.target.value)} type='url' />
        <p>Our manager will contact you to confirm the details of the order, delivery, etc.</p>
      </div>
      <button onClick={click} className='bg-pink-400 py-4 px-2 text-lg' disabled={!feedback}>create an order</button>
    </div>
  )
}
