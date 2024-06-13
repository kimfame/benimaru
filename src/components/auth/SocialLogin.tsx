import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'

import { DEFAULT_REDIRECT } from '@/routes'
import { Button } from '@/components/ui/button'

export const SocialLogin = () => {
  const onClick = (provider: 'google' | 'naver' | 'kakao') => {
    signIn(provider, {
      callbackUrl: DEFAULT_REDIRECT,
    })
  }

  return (
    <div className="flex flex-col items-center w-full gap-3">
      <Button
        type="button"
        size="lg"
        className="flex items-center justify-center w-full rounded-full"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <div className="flex-none">
          <FcGoogle className="h-5 w-5" />
        </div>
        <span className="flex-1">Google</span>
      </Button>
    </div>
  )
}
