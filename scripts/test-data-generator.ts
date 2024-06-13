import bcrypt from 'bcrypt'
import { LoremIpsum } from 'lorem-ipsum'
import { PrismaClient } from '@prisma/client'

import { getRandomNumber, getRandomPrice } from '@/lib/utils'

const db = new PrismaClient()

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 16,
    min: 8,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function createTestData() {
  try {
    await db.user.create({
      data: {
        name: 'Test',
        email: 'test@example.com',
        emailVerified: new Date(),
        password: await bcrypt.hash('test@example.com', 10),
      },
    })

    const categoryLevel1Names = [...Array(3)].map((_, i) =>
      capitalizeFirstLetter(lorem.generateWords(1)),
    )

    // Level 1 Category
    await Promise.all(
      categoryLevel1Names.map(async (level1Name) => {
        const categoryLevel1 = await db.category.create({
          data: {
            name: level1Name,
          },
        })

        const categoryLevel2Names = [...Array(3)].map((_, i) =>
          capitalizeFirstLetter(lorem.generateWords(1)),
        )

        // Level 2 Category
        await Promise.all(
          categoryLevel2Names.map(async (level2Name) => {
            const categoryLevel2 = await db.category.create({
              data: {
                name: level2Name,
              },
            })

            const categoryLevel3Names = [...Array(getRandomNumber(7, 12))].map(
              (_, i) =>
                `${capitalizeFirstLetter(lorem.generateWords(getRandomNumber(1, 3)))}`,
            )

            // Level 3 Category
            await Promise.all(
              categoryLevel3Names.map(async (level3Name) => {
                const categoryLevel3 = await db.category.create({
                  data: {
                    name: level3Name,
                  },
                })

                const categoryLevel = await db.categoryLevel.create({
                  data: {
                    level1Id: categoryLevel1.id,
                    level2Id: categoryLevel2.id,
                    level3Id: categoryLevel3.id,
                  },
                })

                console.log('Category Level Id : ', categoryLevel.id)

                await Promise.all(
                  [...Array(getRandomNumber(1, 10))].map(async () => {
                    // Product
                    const product = await db.product.create({
                      data: {
                        name: capitalizeFirstLetter(
                          lorem.generateWords(getRandomNumber(1, 3)),
                        ),
                        price: getRandomPrice().toString(),
                        description: lorem.generateParagraphs(1),
                      },
                    })
                    console.log('Product Id : ', product.id)

                    // Product Image
                    await Promise.all(
                      [...Array(getRandomNumber(1, 3))].map(async () => {
                        const ProductImage = await db.productImage.create({
                          data: {
                            productId: product.id,
                            imageUrl: `/demo/product/product${getRandomNumber(1, 5)}.jpg`,
                          },
                        })
                        console.log('ProductImage Id : ', ProductImage.id)
                      }),
                    )

                    // Category Product Mapping
                    const categoryProduct = await db.categoryProduct.create({
                      data: {
                        productId: product.id,
                        categoryId: categoryLevel3.id,
                      },
                    })
                    console.log('CategoryProduct Id : ', categoryProduct.id)
                  }),
                )
              }), // level 3
            )
          }), // level 2
        )
      }), // level 1
    )

    console.log('Test data created successfully!')
  } catch (error) {
    console.error('Error : ', error)
  } finally {
    await db.$disconnect()
  }
}

createTestData()
