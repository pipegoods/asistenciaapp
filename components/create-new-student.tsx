import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export function CreateNewStudent() {
  async function addStudent(formData: FormData) {
    'use server'

    const values = Object.fromEntries(formData.entries())

    const { name, lastName, phone, email } = values

    await prisma.students.create({
      data: {
        name: name as string,
        lastName: lastName as string,
        phone: phone as string,
        email: email as string,
      },
    })

    revalidatePath('/')
  }

  return (
    <form action={addStudent} className="flex flex-col">
      <label htmlFor="name">Nombre</label>
      <input type="text" name="name" id="name" />

      <label htmlFor="lastName">Apellidos</label>
      <input type="text" name="lastName" id="lastName" />

      <label htmlFor="phone">Telefono</label>
      <input type="phone" name="phone" id="phone" />

      <label htmlFor="email">Correo electronico</label>
      <input type="email" name="email" id="email" />

      <button type="submit">Guardar</button>
    </form>
  )
}
