'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type AddNewCoachParams = {
  name: string
  lastName: string
  email: string
  phone: string
}

export async function addNewCoach(values: AddNewCoachParams) {
  await prisma.coachs.create({
    data: {
      ...values,
    },
  })

  revalidatePath('/')
}
