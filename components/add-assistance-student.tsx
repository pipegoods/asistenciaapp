'use client'

import { cn } from '@/lib/utils'

import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import { students } from '@prisma/client'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

interface AddAssitanceStudentProps {
  students: students[]
}

export function AddAssitanceStudent({ students }: AddAssitanceStudentProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const { pending } = useFormStatus()

  useEffect(() => {
    if (pending) return

    setValue('')
  }, [pending])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? students.find((student) => student.id.toString() === value)
                ?.name +
              ' ' +
              students.find((student) => student.id.toString() === value)
                ?.lastName
            : 'Selecciona el estudiante'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Busca al estudiante..." />
          <CommandEmpty>No se encontró al estudiante.</CommandEmpty>
          <CommandGroup>
            {students.map((student) => (
              <CommandItem
                key={student.id}
                onSelect={(value) => {
                  const studentSelected = students.find((student) => {
                    const fullNameLowerCase = `${student.name.toLowerCase()} ${student.lastName.toLowerCase()}`

                    return fullNameLowerCase.trim() === value.trim()
                  })

                  if (!studentSelected) return

                  setValue(
                    studentSelected.id.toString() === value
                      ? ''
                      : studentSelected.id.toString()
                  )
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === student.id.toString()
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {student.name} {student.lastName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
      <input type="hidden" name="student" value={value} />
    </Popover>
  )
}
