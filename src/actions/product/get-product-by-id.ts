'use server'

import * as z from 'zod'

import db from '@/lib/db'
import { ProductIdParamSchema } from '@/schemas/product'

export const getProductById = async (
  values: z.infer<typeof ProductIdParamSchema>,
) => {
  const validatedFields = ProductIdParamSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Product Id' }
  }

  const { id } = validatedFields.data

  try {
    const product = await db.product.findUnique({
      where: {
        id,
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
        },
      },
    })
    return product
  } catch {
    return { error: 'The Product failed to load. Please reload' }
  }
}
