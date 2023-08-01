import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function StudentsPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  const student = await prisma.students.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      assistances: {
        include: {
          class: {
            include: {
              coach: true,
            },
          },
        },
      },
    },
  })

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl font-bold">
        {student?.name} {student?.lastName}
      </h1>

      <hr className="my-5" />

      <p>
        <strong>Telefono:</strong> {student?.phone}
      </p>

      <p>
        <strong>Email:</strong> {student?.email}
      </p>

      <p>
        <strong>Clases:</strong> {student?.assistances.length}
      </p>

      <hr className="my-5" />

      <h2 className="my-3 text-2xl font-bold">Clases</h2>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 xl:grid-cols-4">
        {student?.assistances.map((assistance) => (
          <li key={assistance.id}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {format(assistance.class.date, 'PPP', { locale: es })}
                </CardTitle>
                <CardDescription>{assistance.class.time}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Coach:</strong> {assistance.class.coach.name}{' '}
                  {assistance.class.coach.lastName}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </main>
  )
}
