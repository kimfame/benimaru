'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { getCategories } from '@/actions/product/get-categories'
import CategorySidebar from '@/components/layout/header/CategorySidebar'
import { CategoryNav } from '@/components/layout/header/CategoryNav'
import { ProfileButton } from '@/components/layout/header/ProfileButton'
import ShoppingCartSidebar from '@/components/layout/ShoppingCartSidebar'

export interface CategoryProps {
  categories: {
    id: number
    name: string
    sub: {
      id: number
      name: string
      sub: { id: number; name: string }[]
    }[]
  }[]
}

const Header = () => {
  const { data: session } = useSession()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      const allCategories = await getCategories()

      const tempCategories: any = []
      allCategories.forEach((category) => {
        if (tempCategories.at(-1)?.id !== category.level1.id) {
          tempCategories.push({ ...category.level1, sub: [] })
        }

        const level1 = tempCategories.at(-1)
        if (level1.sub.at(-1)?.id !== category.level2.id) {
          level1.sub.push({ ...category.level2, sub: [] })
        }

        const level2 = level1.sub.at(-1)
        level2.sub.push(category.level3)
      })

      setCategories(tempCategories)
    }

    fetchAndSetCategories()
  }, [])

  return (
    <header>
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex items-center p-2 border-b md:p-4 lg:px-28 lg:mt-6 lg:mb-3 lg:border-b-0">
          <div className="flex items-center justify-start w-1/3">
            <CategorySidebar categories={categories} />
          </div>
          <div className="flex items-center justify-center w-1/3">
            <Link href="/">
              <h1 className="text-2xl lg:text-4xl font-semibold">BENIMARU</h1>
            </Link>
          </div>
          <div className="flex items-center justify-end w-1/3">
            {session ? (
              <ProfileButton />
            ) : (
              <Link href="/auth/login">
                <Button
                  variant={'ghost'}
                  className="flex flex-col h-9 w-9 rounded-full hover:text-primary"
                >
                  <UserRound />
                </Button>
              </Link>
            )}

            <ShoppingCartSidebar />
          </div>
        </div>

        <CategoryNav categories={categories} />
      </div>
    </header>
  )
}

export default Header
