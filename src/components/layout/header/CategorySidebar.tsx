import { useState } from 'react'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { CategoryProps } from '@/components/layout/header/Header'
import CategorySubSidebar from '@/components/layout/header/CategorySubSidebar'

const CategorySidebar = ({ categories }: CategoryProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={'ghost'}
          className="flex flex-col h-9 w-9 lg:hidden rounded-full hover:text-primary hover:bg-transparent"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'}>
        <SheetHeader>
          <SheetTitle className="text-3xl py-5">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-4">
          {categories?.map((category: any, idx: any) => (
            <div key={idx}>
              <CategorySubSidebar category={category} />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default CategorySidebar
