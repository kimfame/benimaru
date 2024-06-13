import { TokenType } from '@prisma/client'

import db from '@/lib/db'

export const getVerificationTokenByEmail = async (
  email: string,
  type: TokenType,
) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        email,
        type,
      },
    })

    return verificationToken
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (
  token: string,
  type: TokenType,
) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: {
        token,
        type,
      },
    })

    return verificationToken
  } catch {
    return null
  }
}
