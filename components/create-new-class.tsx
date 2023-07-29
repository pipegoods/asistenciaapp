'use client'
import { Button } from '@/components/ui/button'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useTransition } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { coachs } from '@prisma/client'
import { es } from 'date-fns/locale'
import { addNewClass } from '@/app/actions/add-new-class'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'

const formSchema = z.object({
  date: z.date({
    required_error: 'Por favor ingresa una fecha valida.',
  }),
  time: z.string(),
  coachId: z.string(),
})

const TIME_AVAILABILITY = [
  '6:00 AM',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
]

interface CreateNewClassProps {
  coaches: coachs[]
}

export function CreateNewClass({ coaches }: CreateNewClassProps) {
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    startTransition(() => {
      addNewClass({
        coachId: parseInt(values.coachId),
        date: values.date,
        time: values.time,
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: es })
                      ) : (
                        <span>Selecciona una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    locale={es}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horario</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el horario de la clase" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TIME_AVAILABILITY.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Cada clase dura 1 hora.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coachId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Profesor</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? coaches.find(
                            (coach) => coach.id.toString() === field.value
                          )?.name +
                          ' ' +
                          coaches.find(
                            (coach) => coach.id.toString() === field.value
                          )?.lastName
                        : 'Selecciona el profesor'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Busca el profesor..." />
                    <CommandEmpty>No se encontró el profesor.</CommandEmpty>
                    <CommandGroup>
                      {coaches.map((coach) => (
                        <CommandItem
                          key={coach.id}
                          onSelect={(value) => {
                            const coachSelected = coaches.find((coach) => {
                              const fullNameLowerCase = `${coach.name.toLowerCase()} ${coach.lastName.toLowerCase()}`
                              return fullNameLowerCase === value
                            })

                            if (!coachSelected) return

                            form.setValue(
                              'coachId',
                              coachSelected.id.toString()
                            )
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              coach.id.toString() === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {coach.name} {coach.lastName}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={pending}>
          {pending ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </Form>
  )
}
