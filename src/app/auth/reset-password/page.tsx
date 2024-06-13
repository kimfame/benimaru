'use client'

import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { passwordReset } from '@/actions/auth/password-reset'
import { PasswordResetSchema } from '@/schemas/auth'
import AuthBase from '@/components/auth/AuthBase'
import { FormError } from '@/components/FormError'
import { FormSuccess } from '@/components/FormSuccess'

const PasswordResetForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof PasswordResetSchema>>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof PasswordResetSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      passwordReset(values, token).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <AuthBase
      title="Reset your password"
      description="Enter a new password"
      footerLinkHref="/auth/login"
      footerLinkLabel="Back to Login Page"
    >
      <Form {...form}>
        <FormError message={error} />
        <FormSuccess message={success} />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            disabled={isPending}
            type="submit"
            className="w-full rounded-full"
          >
            Reset password
          </Button>
        </form>
      </Form>
    </AuthBase>
  )
}

export default PasswordResetForm
