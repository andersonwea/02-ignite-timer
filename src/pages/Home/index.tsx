import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  ButtonStart,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
  TimerContainer,
} from './styles'
import { useState } from 'react'

// objeto de validação com suas configurações
const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  time: zod
    .number()
    .min(5, 'A tarefa precisa ser de no mínimo 5 minutos')
    .max(60, 'A tarefa precisa ser de no máximo de 60 minutos'),
})

// criando um tipagem do mesmo tipo do objeto de validação do zod
type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

interface Cycle {
  id: string
  task: string
  time: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  function handleCreateNewTask(data: NewTaskFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      time: data.time,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubimitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <FormContainer>
          <label htmlFor="tak">Vou trabalhar em</label>
          <TaskInput
            list="task-suggestions"
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="time">durante</label>
          <MinutesInput
            type="number"
            id="time"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('time')}
          />

          <span>minutos.</span>
        </FormContainer>

        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </TimerContainer>

        <ButtonStart disabled={isSubimitDisabled}>
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
