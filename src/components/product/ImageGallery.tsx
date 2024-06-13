'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { ImageOff } from 'lucide-react'

interface ProductImage {
  imageUrl: string
}

interface ImageGalleryProps {
  images: ProductImage[] | undefined
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [bigImage, setBigImage] = useState<ProductImage>()

  useEffect(() => {
    if (images && images.length > 0) {
      setBigImage(images[0])
    }
  }, [images])

  const handleSmallImageClick = (image: any) => {
    setBigImage(image)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5 lg:max-h-[700px]">
      <div className="flex gap-4 order-last overflow-y-auto lg:flex-col lg:order-none">
        {images && images.length > 0 ? (
          images.map((image: any, idx: any) => (
            <div key={idx} className="flex-no w-20 h-20">
              <Image
                src={image.imageUrl}
                width={80}
                height={80}
                alt="small photo"
                className="h-full w-full object-cover object-center cursor-pointer"
                onClick={() => handleSmallImageClick(image)}
              />
            </div>
          ))
        ) : (
          <div className="flex-none">
            <div className="flex items-center justify-center w-20 h-20 bg-gray-50">
              <ImageOff className="h-1/2 w-1/2 object-cover object-center cursor-pointer text-gray-400" />
            </div>
          </div>
        )}
      </div>

      <div className="overflow-hidden h-[700px] lg:h-auto bg-gray-50 lg:col-span-4">
        {bigImage ? (
          <Image
            src={bigImage.imageUrl}
            alt="big photo"
            width={700}
            height={700}
            className="w-full h-full object-contain object-center"
          />
        ) : (
          <ImageOff className="mx-auto translate-y-1/2 h-1/2 w-1/2 text-gray-400" />
        )}
      </div>
    </div>
  )
}

export default ImageGallery
