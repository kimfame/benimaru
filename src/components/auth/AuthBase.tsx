import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { SocialLogin } from '@/components/auth/SocialLogin'
import HorizontalLine from '@/components/auth/HorizontalLine'

interface AuthBaseProps {
  children: React.ReactNode
  title: string
  description: string
  socialLogin?: boolean
  footerLinkLabel?: string
  footerLinkHref?: string
}

const AuthBase = ({
  children,
  title,
  description,
  socialLogin,
  footerLinkLabel,
  footerLinkHref,
}: AuthBaseProps) => {
  return (
    <>
      <div className="mx-auto w-[400px] mt-10 bg-white">
        <div className="flex flex-col">
          <div className="flex flex-col space-y-1.5 p-6 justify-center items-center">
            <h1 className="text-3xl font-semibold leading-none tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div>{children}</div>

          <div>
            {socialLogin && (
              <>
                <HorizontalLine />
                <SocialLogin />
              </>
            )}
            {footerLinkHref && footerLinkLabel && (
              <Button
                variant="link"
                className="font-normal w-full"
                size="sm"
                asChild
              >
                <Link href={footerLinkHref}>{footerLinkLabel}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthBase
