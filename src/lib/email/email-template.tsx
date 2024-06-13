import * as React from 'react'

interface LinkProps {
  link: string
}

export const ConfirmAccountTemplate: React.FC<Readonly<LinkProps>> = ({
  link: confirmLink,
}) => (
  <div>
    <h1>Confirm your account</h1>
    <p>
      Thank you for signing up for Benimaru. To confirm your account, please
      follow the button below.
    </p>
    <a href={confirmLink}>Confirm Account</a>
  </div>
)

export const PasswordResetTemplate: React.FC<Readonly<LinkProps>> = ({
  link: passwordResetLink,
}) => (
  <div>
    <h1>Reset your password</h1>
    <a href={passwordResetLink}>Click here to reset your password</a>
    <p>
      {
        "If you didn't request a reset, don't worry. You can safely ignore this email."
      }
    </p>
  </div>
)
