'use server'

import * as z from 'zod'

import db from '@/lib/db'
import { ProductIdParamSchema } from '@/schemas/product'
import { auth } from '@/lib/auth'

export const addProduct = async (
  values: z.infer<typeof ProductIdParamSchema>,
) => {
  const validatedFields = ProductIdParamSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Product Id' }
  }
  const { id: productId } = validatedFields.data
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'You must login in first' }
  }

  try {
    const existItem = await db.shoppingCart.findFirst({
      where: {
        userId,
        productId,
      },
    })

    if (existItem) {
      await db.shoppingCart.update({
        where: {
          id: existItem.id,
        },
        data: {
          quantity: existItem.quantity + 1,
        },
      })
    } else {
      await db.shoppingCart.create({
        data: {
          userId,
          productId,
          quantity: 1,
        },
      })
    }

    return { success: 'Product added to cart' }
  } catch {
    return { error: 'Shopping cart is currently unavailable' }
  }
}
