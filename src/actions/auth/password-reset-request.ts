'use server'

import * as z from 'zod'
import { TokenType } from '@prisma/client'

import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { PasswordResetRequestSchema } from '@/schemas/auth'
import { sendPasswordResetEmail } from '@/lib/email/email-sender'

export const passwordResetRequest = async (
  values: z.infer<typeof PasswordResetRequestSchema>,
) => {
  const validatedFields = PasswordResetRequestSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid email type' }
  }

  const { email } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { success: 'Reset email sent' }
  }

  const passwordResetToken = await generateVerificationToken(
    email,
    TokenType.PWRESET,
  )

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  )

  return { success: 'Reset email sent' }
}
