export type Category = {
  id: string,
  name: string
}

export type Clothing = {
  clothingId: number,
  name: string,
  description: string,
  category?: Category,
  price: number,
  productPicture: string,
  inStock: string
}

export type CategoryItems = {
  category: Category,
  clothings: Clothing[]
}

export type CartItem = {
  clothing: Clothing,
  count: number
}
