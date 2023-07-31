'use client'

import { Button } from '@/components/ui/button'

import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export function ButtonSubmitAddAssistance() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Agregando estudiante...' : 'Agregar estudiante'}
    </Button>
  )
}
