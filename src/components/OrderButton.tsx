'use client'

import { Dispatch, SetStateAction } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const OrderDropdown = ({
  sort,
  setSort,
}: {
  sort: any
  setSort: Dispatch<SetStateAction<any>>
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Sort By</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
          <DropdownMenuRadioItem value="NEW">Newest</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="LOP">
            Lowest Price
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="HIP">
            Highest Price
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrderDropdown
