import { useCurrentUser } from '@/hooks/use-current-user'
import { IoExitOutline } from 'react-icons/io5'
import { UserRound } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { LogoutButton } from '@/components/auth/LogoutButton'

export const ProfileButton = () => {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-5 w-5">
          <AvatarImage src={user?.image || ''} />
          <AvatarFallback className="bg-transparent">
            <UserRound className="hover:text-primary" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <IoExitOutline className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
