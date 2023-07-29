import { classes, coachs, students } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { AddAssitanceStudent } from './add-assistance-student'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getFirstCharFromNameAndLastName } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { ButtonSubmitAddAssistance } from './button-submit-add-assistance'

interface ModalDetailsClassProps {
  students: students[]
  classObject: Pick<classes, 'id' | 'date' | 'time'> & {
    coach: Pick<coachs, 'name' | 'lastName'>
  }
}

export async function ModalDetailsClass({
  students,
  classObject,
}: ModalDetailsClassProps) {
  const assistances = await prisma.assistances.findMany({
    where: {
      classId: classObject.id,
    },
    include: {
      student: true,
    },
  })

  const handleOnSubmit = async (formData: FormData) => {
    'use server'

    const values = Object.fromEntries(formData.entries())

    await prisma.assistances.create({
      data: {
        studentId: +values.student,
        classId: classObject.id,
      },
    })

    revalidatePath('/')
  }

  const studentsLeft = students.filter(
    (student) =>
      !assistances.find((assistance) => assistance.studentId === student.id)
  )

  return (
    <Dialog>
      <DialogTrigger className="ml-auto" asChild>
        <Button variant="outline">Ver detalles</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Viendo detalles de la clase</DialogTitle>
          <DialogDescription>
            <p>
              {format(classObject.date, 'PPP', { locale: es })} a las{' '}
              {classObject.time}
            </p>
            <p>
              <b>Impartida por</b> {classObject.coach.name}{' '}
              {classObject.coach.lastName}
            </p>
          </DialogDescription>
        </DialogHeader>

        {studentsLeft.length > 0 ? (
          <form action={handleOnSubmit} className="w-full py-4">
            <AddAssitanceStudent students={studentsLeft} />

            <DialogFooter className="mt-5">
              <ButtonSubmitAddAssistance />
            </DialogFooter>
          </form>
        ) : (
          <p className="text-sm italic">
            Todos los estudiantes asistieron a esta clase.
          </p>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium">Estudiantes asistentes</h3>

          <ul className="mt-4 space-y-8">
            {assistances.map((assistance) => (
              <div className="flex items-center" key={assistance.id}>
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://ui.shadcn.com/avatars/02.png"
                    alt="Avatar"
                  />
                  <AvatarFallback>
                    {getFirstCharFromNameAndLastName({
                      name: assistance.student.name,
                      lastName: assistance.student.lastName,
                    })}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {assistance.student.name} {assistance.student.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {assistance.student.email}
                  </p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
