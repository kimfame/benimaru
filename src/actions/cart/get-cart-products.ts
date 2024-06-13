'use server'

import { auth } from '@/lib/auth'
import db from '@/lib/db'

export const getCartProducts = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return []
  }

  try {
    const items = await db.shoppingCart.findMany({
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            name: true,
            price: true,
            images: {
              select: {
                imageUrl: true,
              },
              take: 1,
            },
          },
        },
      },
      where: {
        userId,
      },
    })

    return items || []
  } catch {
    return []
  }
}
