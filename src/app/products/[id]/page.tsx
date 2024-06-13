'use client'

import { useEffect, useState } from 'react'

import { Product } from '@/types/payload-types'
import { getProductById } from '@/actions/product/get-product-by-id'
import { convertToCurrencyFormat } from '@/lib/utils'
import AddToCart from '@/components/AddToCart'
import ImageGallery from '@/components/product/ImageGallery'

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [productDetail, setProductDetail] = useState<Product | null>(null)

  useEffect(() => {
    const fetchAndSetProductDetail = async () => {
      const data: any = await getProductById({ id: parseInt(params.id, 10) })

      if (data?.error) {
        alert(data?.error)
      } else {
        setProductDetail(data)
      }
    }

    fetchAndSetProductDetail()
  }, [params])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 md:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ImageGallery images={productDetail?.images} />

          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 lg:text-3xl">
                {productDetail?.name}
              </h2>
            </div>

            <div className="mb-10">
              <span className="text-xl font-normal text-gray-800">
                {convertToCurrencyFormat(productDetail?.price)}
              </span>
            </div>

            <AddToCart productId={productDetail?.id} />

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {productDetail?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
