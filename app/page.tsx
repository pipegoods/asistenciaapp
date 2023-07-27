import { CreateNewStudent } from '@/components/create-new-student'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const students = await prisma.students.findMany()

  return (
    <main className="container">
      <CreateNewStudent />

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} {student.lastName}
          </li>
        ))}
      </ul>
    </main>
  )
}
