import { create } from "zustand";
import { persist } from 'zustand/middleware'
import { CartItem, Clothing } from "./domain";

type State = {
  items: CartItem[], 
  change: (it: CartItem) => void,
  inc: (clothing: Clothing) => void,
  dec: (clothing: Clothing) => void,
  reset: () => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      items: [] as CartItem[],
      change: (it: CartItem) => set({ 
        items: get().items.map(el => 
          el.clothing.clothingId === it.clothing.clothingId 
          ? {...it}
          : el
        ) 
      }),
      inc: (clothing: Clothing) => {
        let items = get().items
        let item = items.find(el => el.clothing.clothingId === clothing.clothingId)
        if (!item) {
          item = { clothing, count: 0 }
          items = items.concat(item)
        }

        set({
          items: items.map(
            el => el.clothing.clothingId === item?.clothing.clothingId
            ? {...el, clothing, count: el.count + 1}
            : el
          )
        })
      },
      dec: (clothing: Clothing) => {
        let items = get().items
        let item = items.find(el => el.clothing.clothingId === clothing.clothingId)
        if (!item) {
          return
        }
        if (item.count - 1 <= 0) {
          return set({
            items: items.filter(
              el => el.clothing.clothingId !== item?.clothing.clothingId
            )
          })
        }
        
        set({
          items: items.map(
            el => el.clothing.clothingId === item?.clothing.clothingId
            ? {...el, clothing, count: Math.max(el.count - 1, 0)}
            : el
          )
        })
      },
      reset: () => {
        set({
          items: []
        })
      }
    }),
    {
      name: 'cart-storage',
    }
  )
)
