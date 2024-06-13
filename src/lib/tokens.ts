import { v4 as uuidv4 } from 'uuid'
import { TokenType } from '@prisma/client'

import db from '@/lib/db'
import { getVerificationTokenByEmail } from '@/data/token'

export const generateVerificationToken = async (
  email: string,
  type: TokenType,
) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 3600 * 1000)

  const existingToken = await getVerificationTokenByEmail(email, type)

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  }

  const newVerificationToken = await db.verificationToken.create({
    data: {
      type,
      email,
      token,
      expires,
    },
  })

  return newVerificationToken
}
