import { TokenType } from '@prisma/client'

import { send } from '@/lib/email/email-wrapper'
import {
  ConfirmAccountTemplate,
  PasswordResetTemplate,
} from '@/lib/email/email-template'

const appUrl = process.env.NEXT_PUBLIC_APP_URL
const emailDomain = process.env.NOTIFICATION_EMAIL_DOMAIN

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${appUrl}/auth/confirm-account?token=${token}&type=${TokenType.SIGNUP}`

  await send(
    `welcome@${emailDomain}`,
    email,
    'Confirm your account',
    ConfirmAccountTemplate({ link: confirmLink }) as React.ReactElement,
  )
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${appUrl}/auth/reset-password?token=${token}&type=${TokenType.PWRESET}`

  await send(
    `notify@${emailDomain}`,
    email,
    'Reset your password',
    PasswordResetTemplate({ link: resetLink }) as React.ReactElement,
  )
}
