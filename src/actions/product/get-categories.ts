'use server'

import db from '@/lib/db'

export const getCategories = async () => {
  try {
    const categories = await db.categoryLevel.findMany({
      select: {
        level1: {
          select: {
            id: true,
            name: true,
          },
        },
        level2: {
          select: {
            id: true,
            name: true,
          },
        },
        level3: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        {
          level1Id: 'asc',
        },
        {
          level2Id: 'asc',
        },
        {
          level3Id: 'asc',
        },
      ],
    })
    return categories || []
  } catch {
    return []
  }
}
