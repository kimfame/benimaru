'use client'

import { useState, useTransition } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { passwordResetRequest } from '@/actions/auth/password-reset-request'
import { PasswordResetRequestSchema } from '@/schemas/auth'
import AuthBase from '@/components/auth/AuthBase'
import { FormSuccess } from '@/components/FormSuccess'
import { FormError } from '@/components/FormError'

const PasswordResetRequestForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof PasswordResetRequestSchema>>({
    resolver: zodResolver(PasswordResetRequestSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof PasswordResetRequestSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      passwordResetRequest(values).then((data) => {
        setError(data?.error)
        setSuccess(data?.success)
      })
    })
  }

  return (
    <AuthBase
      title="Reset your password"
      description="Enter your email address and we’ll send you a link to reset your password"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="test@example.com"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
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

export default PasswordResetRequestForm
