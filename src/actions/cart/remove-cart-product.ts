'use server'

import * as z from 'zod'

import { auth } from '@/lib/auth'
import db from '@/lib/db'
import { RemoveCartItemParamSchema } from '@/schemas/product'

export const removeCartProduct = async (
  values: z.infer<typeof RemoveCartItemParamSchema>,
) => {
  const validatedFields = RemoveCartItemParamSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid Cart Id' }
  }

  const { id } = validatedFields.data

  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return { error: 'You must login in first' }
  }

  try {
    await db.shoppingCart.delete({
      where: {
        id,
        userId,
      },
    })

    return { success: 'Product has been removed' }
  } catch {
    return { error: 'Shopping cart is currently unavailable' }
  }
}
