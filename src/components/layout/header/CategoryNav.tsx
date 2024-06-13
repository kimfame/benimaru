'use client'

import Link from 'next/link'

import { CategoryProps } from '@/components/layout/header/Header'

export const CategoryNav = ({ categories }: CategoryProps) => {
  return (
    <div className="flex items-center justify-center mt-1">
      <nav>
        <ul className="hidden lg:flex">
          {categories.map((level1) => (
            <li className="group" key={level1.id}>
              <div className="text-base font-semibold text-gray-800 py-4 px-7 border-b-2 border-transparent group-hover:border-b-2 group-hover:border-black group-hover:cursor-pointer">
                {level1.name}
              </div>
              <div className="absolute left-0 w-full border-t bg-white z-10 flex items-center justify-center overflow-hidden transition-max-height duration-500 ease-in-out max-h-0 group-hover:max-h-screen">
                <div className="opacity-0 transition-opacity delay-500 duration-700 ease-in-out group-hover:opacity-100">
                  <div className="flex flex-row flex-wrap gap-36 mt-8 mb-8">
                    {level1.sub.map((level2) => (
                      <div className="flex flex-col gap-4" key={level2.id}>
                        <p className="font-semibold">{level2.name}</p>
                        <div className="flex flex-col gap-1">
                          {level2.sub.map((level3) => (
                            <Link
                              href={`/${level3.id}`}
                              key={level3.id}
                              className="hover:text-gray-400"
                            >
                              <div>{level3.name}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
