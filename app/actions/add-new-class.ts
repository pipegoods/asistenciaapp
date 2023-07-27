'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type AddNewClassParams = {
  date: Date
  time: string
  coachId: number
}

export async function addNewClass({ date, time, coachId }: AddNewClassParams) {
  await prisma.classes.create({
    data: {
      date,
      time,
      coachId,
    },
  })

  revalidatePath('/')
}
