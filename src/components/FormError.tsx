import { TriangleAlert } from 'lucide-react'

interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null
  return (
    <div className="g-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive bg-red-100 my-2">
      <TriangleAlert />
      <p>{message}</p>
    </div>
  )
}
