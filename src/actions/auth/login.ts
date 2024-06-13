'use server'

import { AuthError } from 'next-auth'
import { TokenType } from '@prisma/client'
import * as z from 'zod'

import { DEFAULT_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { LoginSchema } from '@/schemas/auth'
import { sendVerificationEmail } from '@/lib/email/email-sender'
import { signIn } from '@/lib/auth'

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { email, password } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Account does not exist' }
  }

  if (!existingUser.emailVerified) {
    const newVerificationToken = await generateVerificationToken(
      existingUser.email,
      TokenType.SIGNUP,
    )

    await sendVerificationEmail(
      newVerificationToken.email,
      newVerificationToken.token,
    )

    return { success: 'Confirmation email sent' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'System error' }
      }
    }

    throw error
  }
}
