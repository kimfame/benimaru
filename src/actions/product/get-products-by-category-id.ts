'use server'

import * as z from 'zod'

import db from '@/lib/db'
import { GetProductListParamSchema } from '@/schemas/product'

export const getProductsByCategoryId = async (
  values: z.infer<typeof GetProductListParamSchema>,
) => {
  const validatedFields = GetProductListParamSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Category Id' }
  }

  const { order, id } = validatedFields.data

  try {
    let orderBy: any = {}
    if (order === 'NEW') {
      orderBy['id'] = 'desc'
    } else if (order === 'LOP') {
      orderBy['price'] = 'asc'
    } else if (order === 'HIP') {
      orderBy['price'] = 'desc'
    } else {
      orderBy['id'] = 'desc'
    }

    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        images: {
          take: 1,
          select: {
            imageUrl: true,
          },
          where: {
            OR: [{ main: true }, { id: { gte: 0 } }],
          },
        },
      },
      where: {
        categories: {
          some: {
            categoryId: id,
          },
        },
      },
      orderBy: orderBy,
    })
    return products || []
  } catch {
    return []
  }
}
