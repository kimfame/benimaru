'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { SyncLoader } from 'react-spinners'

import { TokenType } from '@prisma/client'
import { emailVerification } from '@/actions/auth/email-verification'
import AuthBase from '@/components/auth/AuthBase'
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'

const EmailVerificationFormPage = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const searchParams = useSearchParams()

  const token = searchParams.get('token')
  const type = searchParams.get('type')

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token || !type) {
      setError('Email verification failed')
      return
    }

    const existingType = type in TokenType
    if (!existingType) {
      setError('Email verification failed')
      return
    }

    emailVerification(token, type as TokenType)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Email verification failed')
      })
  }, [token, type, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <AuthBase
      title="Account confirmation"
      description="Confirming your verification"
      footerLinkHref="/auth/login"
      footerLinkLabel="Go to login page"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <SyncLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </AuthBase>
  )
}

export default EmailVerificationFormPage
