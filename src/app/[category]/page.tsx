'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ImageOff } from 'lucide-react'
import OrderDropdown from '@/components/OrderButton'

import { Product, Order } from '@/types/payload-types'
import { convertToCurrencyFormat } from '@/lib/utils'
import { getProductsByCategoryId } from '@/actions/product/get-products-by-category-id'
import { getCategoryNameById } from '@/actions/product/get-category-name-by-id'

const CategoryProductPage = ({ params }: { params: { category: string } }) => {
  const [categoryName, setCategoryName] = useState<string>('-')
  const [products, setProducts] = useState<Product[]>([])
  const [order, setOrder] = useState<Order>('NEW')

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const data: any = await getProductsByCategoryId({
        id: parseInt(params.category, 10),
        order: order,
      })
      if (data?.error) {
        alert(data?.error)
      } else if (data?.length > 0) {
        setProducts(data)
      }
    }
    const fetchAndSetCategoryName = async () => {
      const data = await getCategoryNameById({
        id: parseInt(params.category, 10),
      })
      if (data) {
        setCategoryName(data)
      }
    }

    fetchAndSetCategoryName()
    fetchAndSetProducts()
  }, [params.category, order])

  return (
    <div className="mx-auto px-1 lg:max-w-7xl lg:px-11 bg-white">
      <div className="flex flex-col">
        <div className="flex items-center justify-center mt-8 mb-4 lg:mt-16 lg:mb-8">
          <h2 className="text-2xl font-normal tracking-tight text-gray-900">
            {categoryName}
          </h2>
        </div>
        <div className="flex items-center justify-end">
          <OrderDropdown sort={order} setSort={setOrder} />
        </div>
      </div>

      <div className="my-2 grid grid-cols-2 gap-x-1 gap-y-5 lg:grid-cols-3 lg:gap-x-4 lg:my-6 xl:gap-x-8">
        {products.length === 0
          ? 'No Products Found'
          : products.map((product) => (
              <div key={product.id} className="group relative">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square w-full overflow-hidden bg-gray-200 group-hover:opacity-50">
                    {product.images.length ? (
                      <>
                        <Image
                          src={product.images?.[0]?.imageUrl}
                          alt="Product"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover object-center"
                        />
                      </>
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <ImageOff className="text-gray-400 w-1/2 h-1/2 object-cover object-center" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col pt-4 pb-10">
                    <h3 className="text-base text-gray-900">{product.name}</h3>
                    <p className="text-base font-medium text-gray-900 mt-2">
                      {convertToCurrencyFormat(product.price)}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </div>
  )
}

export default CategoryProductPage
