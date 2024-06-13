import { useState } from 'react'
import Link from 'next/link'

import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CategorySubSidebarProps {
  category: {
    id: number
    name: string
    sub: {
      id: number
      name: string
      sub: { id: number; name: string }[]
    }[]
  }
}

const CategorySubSidebar = ({ category }: CategorySubSidebarProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-2xl font-semibold text-gray-600 w-full"
      >
        <div className="flex flex-row">
          <div className="flex basis-4/5">{category.name}</div>
          <div className="flex basis-1/5 justify-end items-center">
            <ChevronRight />
          </div>
        </div>
      </button>

      <div
        className={`absolute top-0 left-0 bg-white h-full overflow-y-auto transition-max-width duration-500 ease-in-out w-full ${!open && '-translate-x-full'}`}
      >
        <div className="inline">
          <div className="block sticky top-0 border-b min-h-14 pt-1 bg-white">
            <div className="flex items-stretch my-2 mx-2">
              <div className="flex flex-1 justify-start">
                <button type="button" onClick={() => setOpen(!open)}>
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 justify-center">
                <span className="font-semibold">{category.name}</span>
              </div>
              <div className="flex flex-1 justify-end"></div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col space-y-4 mx-3">
              {category.sub.map((level2) => (
                <>
                  <div className="flex flex-col gap-2 my-3">
                    <p className="font-semibold text-xl">{level2.name}</p>
                    <ul className="flex flex-col gap-1 ml-3">
                      {level2.sub.map((level3) => (
                        <Link
                          href={`/${level3.id}`}
                          key={level3.id}
                          className="hover:text-gray-400"
                        >
                          <li className="my-1">{level3.name}</li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategorySubSidebar
