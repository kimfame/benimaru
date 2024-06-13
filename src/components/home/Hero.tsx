'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import Circle from '@/components/Icons/Circle'
import slide1 from '/public/demo/hero/hero1.jpg'
import slide2 from '/public/demo/hero/hero2.jpg'
import slide3 from '/public/demo/hero/hero3.jpg'
import slide4 from '/public/demo/hero/hero4.jpg'
import slide5 from '/public/demo/hero/hero5.jpg'

const slideImages = [
  {
    imageUrl: slide1,
  },
  {
    imageUrl: slide2,
  },
  {
    imageUrl: slide3,
  },
  {
    imageUrl: slide4,
  },
  {
    imageUrl: slide5,
  },
]

const Hero = () => {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setImageIndex((prevImage) =>
        prevImage === slideImages.length - 1 ? 0 : prevImage + 1,
      )
    }, 4000)

    return () => clearInterval(timer)
  }, [])

  const showNextImage = () => {
    setImageIndex((index) => {
      if (index === slideImages.length - 1) return 0
      return index + 1
    })
  }

  const showPrevImage = () => {
    setImageIndex((index) => {
      if (index === 0) return slideImages.length - 1
      return index - 1
    })
  }

  return (
    <section className="relative group">
      <div className="h-[600px]">
        {slideImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === imageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.imageUrl}
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={showPrevImage}
        className="block absolute top-0 bottom-0 left-0 p-8 text-2xl group-hover:bg-black/20 text-white cursor-pointer transition-colors ease-in-out duration-500"
      >
        <ChevronLeft className="block opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-1000" />
      </button>
      <button
        type="button"
        onClick={showNextImage}
        className="block absolute top-0 bottom-0 right-0 p-8 text-2xl group-hover:bg-black/20 text-white cursor-pointer transition-colors ease-in-out duration-500"
      >
        <ChevronRight className="block opacity-0 group-hover:opacity-100 transition-opacity ease-in-out duration-1000" />
      </button>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 grid grid-cols-5 gap-x-1">
        {slideImages.map((_, index) => (
          <button key={index} onClick={() => setImageIndex(index)} className="">
            {index === imageIndex ? (
              <Circle className="w-3 h-3" fill="black" />
            ) : (
              <Circle className="w-3 h-3" fill="none" />
            )}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Hero
