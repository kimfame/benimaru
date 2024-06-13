import * as z from 'zod'

export interface CartProduct {
  id: string
  quantity: number
  product: {
    name: string
    price: string
    images: { imageUrl: string }[]
  }
}

export interface Product {
  id: number
  name: string
  price: string
  description?: string
  category?: {
    name: string
  }
  images: { imageUrl: string }[]
}

export interface ResponseMessage {
  success?: string
  error?: string
}

export const order = z.enum(['NEW', 'LOP', 'HIP'])
export type Order = z.infer<typeof order>
