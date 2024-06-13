'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import Decimal from 'decimal.js'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { CartProduct } from '@/types/payload-types'
import { convertToCurrencyFormat } from '@/lib/utils'
import { getCartProducts } from '@/actions/cart/get-cart-products'
import { removeCartProduct } from '@/actions/cart/remove-cart-product'

const ShoppingCartSidebar = () => {
  const [products, setProducts] = useState<CartProduct[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const movePaymentSuccess = () => {
    setOpen(false)
    router.push('/payment/success')
  }

  const handleRemoveProduct = async (id: string) => {
    const message = await removeCartProduct({ id })
    alert(message?.success || message?.error)

    if (message?.success) {
      setProducts((prevProduct) =>
        prevProduct.filter((product) => product.id !== id),
      )
    }
  }

  useEffect(() => {
    const fetchAndSetCartProducts = async () => {
      const cartProducts = await getCartProducts()
      setProducts(cartProducts)
    }

    if (open) {
      fetchAndSetCartProducts()
    }
  }, [open])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={'ghost'}
          className="flex flex-col h-9 w-9 rounded-full hover:text-primary hover:bg-transparent"
        >
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {products.length === 0 ? (
                <h1 className="py-6">{"You don't have any items"}</h1>
              ) : (
                <>
                  {products.map((product, idx) => (
                    <li key={idx} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={product.product.images[0]?.imageUrl as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{product.product.name}</h3>
                            <p className="ml-4">
                              {convertToCurrencyFormat(product.product.price)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            description part
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">
                            QTY : {product.quantity}
                          </p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => {
                                handleRemoveProduct(product.id)
                              }}
                              className="font-medium hover:text-primary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>
                {convertToCurrencyFormat(
                  products.reduce((sum, currentProduct) => {
                    return Decimal.sum(
                      Decimal.mul(
                        currentProduct.product.price,
                        currentProduct.quantity,
                      ),
                      sum,
                    ).toNumber()
                  }, 0),
                )}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes are calculated at checkout.
            </p>

            <div className="mt-6">
              <Button
                className="w-full rounded-full"
                onClick={movePaymentSuccess}
              >
                Checkout
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{' '}
                <button
                  onClick={() => setOpen(false)}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCartSidebar
