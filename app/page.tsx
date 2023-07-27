import { CreateNewStudent } from '@/components/create-new-student'
import { CreateNewCoach } from '@/components/create-new-coach'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { prisma } from '@/lib/prisma'
import { CreateNewClass } from '@/components/create-new-class'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default async function Home() {
  const students = await prisma.students.findMany()
  const coaches = await prisma.coachs.findMany()
  const classes = await prisma.classes.findMany({
    select: {
      id: true,
      date: true,
      time: true,
      coach: true,
    },
  })

  return (
    <main className="container my-10 grid grid-cols-3 gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Agrega un estudiante</CardTitle>
          <CardDescription>
            Llena los campos para agregar un nuevo estudiante.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewStudent />
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Ultimos estudiantes</CardTitle>
          <CardDescription>
            En total hay {students.length} estudiantes registrados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {students.map((student) => (
            <div className="flex items-center" key={student.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://ui.shadcn.com/avatars/02.png"
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {student.name} {student.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{student.email}</p>
              </div>
              <div className="ml-auto font-medium">10 clases</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Ultimos profesores</CardTitle>
          <CardDescription>
            En total hay {coaches.length} profesores registrados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {coaches.map((coach) => (
            <div className="flex items-center" key={coach.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://ui.shadcn.com/avatars/02.png"
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {coach.name} {coach.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{coach.email}</p>
              </div>
              <div className="ml-auto font-medium">10 clases</div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agrega un profesor</CardTitle>
          <CardDescription>
            Llena los campos para agregar un nuevo profesor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewCoach />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Agrega una clase</CardTitle>
          <CardDescription>
            Llena los campos para agregar una nueva clase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateNewClass coaches={coaches} />
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Ultimas clases</CardTitle>
          <CardDescription>
            En total hay {classes.length} clases registrados
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {classes.map((classItem) => (
            <div className="flex items-center" key={classItem.id}>
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://ui.shadcn.com/avatars/05.png"
                  alt="Avatar"
                />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {format(classItem.date, 'PPP', { locale: es })}
                </p>
                <p className="text-sm text-muted-foreground">
                  {classItem.time}
                </p>
              </div>
              <div className="ml-auto text-sm font-medium">
                {classItem.coach.name} {classItem.coach.lastName}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  )
}
