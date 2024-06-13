'use server'

import * as z from 'zod'

import db from '@/lib/db'
import { CategoryIdParamSchema } from '@/schemas/product'

export const getCategoryNameById = async (
  values: z.infer<typeof CategoryIdParamSchema>,
) => {
  const validatedFields = CategoryIdParamSchema.safeParse(values)

  if (!validatedFields.success) {
    return ''
  }

  const { id } = validatedFields.data

  try {
    const category = await db.category.findFirst({
      select: {
        name: true,
      },
      where: {
        id,
      },
    })
    return category?.name || ''
  } catch {
    return ''
  }
}
