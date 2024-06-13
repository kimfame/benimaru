'use server'

import * as z from 'zod'
import bcrypt from 'bcrypt'
import { TokenType } from '@prisma/client'

import db from '@/lib/db'
import { getVerificationTokenByToken } from '@/data/token'
import { getUserByEmail } from '@/data/user'
import { PasswordResetSchema } from '@/schemas/auth'

export const passwordReset = async (
  values: z.infer<typeof PasswordResetSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: 'Missing token' }
  }

  const validatedFields = PasswordResetSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const existingToken = await getVerificationTokenByToken(
    token,
    TokenType.PWRESET,
  )

  if (!existingToken) {
    return { error: 'Invalid request' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'This form has expired' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'Account does not exist' }
  }

  const { password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  })

  return { success: 'Password updated' }
}
