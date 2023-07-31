'use client'

import { X } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useTransition } from 'react'
import { deleteAssistanceStudentAction } from '@/app/actions/delete-assistance-student'

interface DeleteAssistanceStudentProps {
  assistanceId: number
}

export function DeleteAssistanceStudent({
  assistanceId,
}: DeleteAssistanceStudentProps) {
  const [pending, startTransition] = useTransition()

  function deleteAssistance() {
    startTransition(() => {
      deleteAssistanceStudentAction({ assistanceId })
    })
  }

  return (
    <>
      <div className="ml-auto h-6 w-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <X className="cursor-pointer hover:text-red-500" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro totalmente seguro?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Si borras la asistencia no podras tener un registro de la misma
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction disabled={pending} onClick={deleteAssistance}>
                Si
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}
