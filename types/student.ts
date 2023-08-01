import { assistances, students } from '@prisma/client'

export type StudentWithAssistances = students & {
  assistances: assistances[]
}
