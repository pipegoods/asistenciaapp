import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstCharFromNameAndLastName({
  name,
  lastName,
}: {
  name: string
  lastName: string
}) {
  return name.charAt(0) + lastName.charAt(0)
}
