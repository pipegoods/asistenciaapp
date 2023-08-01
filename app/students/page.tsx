import { prisma } from '@/lib/prisma'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function StudentsPage() {
  const students = await prisma.students.findMany({
    include: {
      assistances: true,
    },
  })

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl font-bold">Estudiantes</h1>

      <hr className="my-5" />

      <DataTable columns={columns} data={students} />
    </main>
  )
}
