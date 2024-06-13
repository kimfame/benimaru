import * as z from 'zod'

import { order } from '@/types/payload-types'

export const ProductIdParamSchema = z.object({
  id: z
    .number({
      required_error: 'Product Id is required',
      invalid_type_error: 'Invalid Product Id',
    })
    .positive('Invalid Product Id'),
})

export const RemoveCartItemParamSchema = z.object({
  id: z
    .string({
      required_error: 'Cart Id is required',
      invalid_type_error: 'Invalid Cart Id',
    })
    .cuid('Invalid Cart Id'),
})

export const CategoryIdParamSchema = z.object({
  id: z
    .number({
      required_error: 'Category Id is required',
      invalid_type_error: 'Invalid Category Id',
    })
    .positive('Invalid Category Id'),
})

export const GetProductListParamSchema = z.object({
  id: z
    .number({
      required_error: 'Category Id is required',
      invalid_type_error: 'Invalid Category Id',
    })
    .positive('Invalid Category Id'),
  order: order,
})
