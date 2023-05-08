import { HandPalm, Play } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { StartButton, StopButton, HomeContainer } from './styles'
import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

// objeto de validação com suas configurações
const newTaskFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  time: zod
    .number()
    .min(1, 'A tarefa precisa ser de no mínimo 5 minutos')
    .max(60, 'A tarefa precisa ser de no máximo de 60 minutos'),
})

// criando um tipagem do mesmo tipo do objeto de validação do zod
type NewTaskFormData = zod.infer<typeof newTaskFormValidationSchema>

interface Cycle {
  id: string
  task: string
  time: number
  startAt: Date
  interruptedAt?: Date
  finishedAt?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  secondsPassed: (seconds: number) => void
  markCurrentCycleAsFineshed: () => void
  setAmountSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CyclesContextType)

export function Home() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const newCycleForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCreateNewTask(data: NewTaskFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      time: data.time,
      startAt: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptTimer() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedAt: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFineshed() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedAt: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function secondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            amountSecondsPassed,
            markCurrentCycleAsFineshed,
            secondsPassed,
            setAmountSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>

          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopButton type="button" onClick={handleInterruptTimer}>
            <HandPalm size={24} />
            Interromper
          </StopButton>
        ) : (
          <StartButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  )
}
