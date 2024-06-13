'use server'

import db from '@/lib/db'

export const getNewestProducts = async () => {
  try {
    const newestProducts = await db.product.findMany({
      take: 4,
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        images: {
          select: {
            imageUrl: true,
          },
          orderBy: {
            main: 'desc',
          },
          take: 1,
        },
      },
    })

    return newestProducts || []
  } catch {
    return []
  }
}
