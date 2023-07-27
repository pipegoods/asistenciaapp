'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

type AddNewStudentParams = {
  name: string
  lastName: string
  email: string
  phone: string
}

export async function addNewStudent(values: AddNewStudentParams) {
  await prisma.students.create({
    data: {
      ...values,
    },
  })

  revalidatePath('/')
}
