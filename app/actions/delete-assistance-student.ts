'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type DeleteAssistanceStudentParams = {
  assistanceId: number
}

export async function deleteAssistanceStudentAction(
  values: DeleteAssistanceStudentParams
) {
  await prisma.assistances.delete({
    where: {
      id: values.assistanceId,
    },
  })

  revalidatePath('/')
}
