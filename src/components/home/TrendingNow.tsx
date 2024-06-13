'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ImageOff } from 'lucide-react'

import { Product } from '@/types/payload-types'
import { getNewestProducts } from '@/actions/product/get-newest-products'

const TrendingNow = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const data = await getNewestProducts()
      setProducts(data)
    }

    fetchAndSetProducts()
  }, [])

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="flex justify-start px-8 pb-7 pt-10">
        <h1 className="text-2xl font-semibold">Trending Now</h1>
      </div>

      <ul className="flex overflow-x-auto px-8 pb-8 gap-3">
        {products.length === 0 && <p>No Newest Products Found</p>}
        {products.map((product, index) => (
          <li key={index} className="flex grow-0 shrink-0 md:basis-4/12">
            <Link href={`/products/${product.id}`}>
              <div className="flex flex-col min-w-72 min-h-72">
                <div className="aspect-square h-[300px] w-[300px] md:w-[500px] md:h-[500px] bg-gray-200">
                  {product?.images.length > 0 ? (
                    <Image
                      src={product.images[0].imageUrl}
                      alt="New product"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <ImageOff className="w-full h-full text-gray-400" />
                  )}
                </div>

                <div className="flex flex-col mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category?.name}
                  </p>
                  <div className="flex justify-between">
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                    <p className="text-sm font-medium text-gray-900">
                      $ {product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrendingNow
