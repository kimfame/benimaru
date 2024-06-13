'use client'

import { addProduct } from '@/actions/cart/add-product'
import { Button } from '@/components/ui/button'

export interface ProductCart {
  productId: number | undefined
}

const AddToCart = ({ productId }: ProductCart) => {
  return (
    <Button
      className={`w-48 rounded-full`}
      onClick={async () => {
        if (productId) {
          const message = await addProduct({ id: productId })
          alert(message?.success || message?.error)
        }
      }}
    >
      Add To Cart
    </Button>
  )
}

export default AddToCart
