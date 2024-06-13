import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const send = async (
  from: string,
  to: string,
  subject: string,
  content: React.ReactElement,
) => {
  await resend.emails.send({
    from: from,
    to: to,
    subject: subject,
    react: content,
  })
}
