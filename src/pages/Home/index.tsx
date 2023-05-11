import { HandPalm, Play } from '@phosphor-icons/react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { StartButton, StopButton, HomeContainer } from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'

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

export function Home() {
  const newCycleForm = useForm<NewTaskFormData>({
    resolver: zodResolver(newTaskFormValidationSchema),
    defaultValues: {
      task: '',
      time: 0,
    },
  })

  const { createNewCycle, activeCycle, interruptCurrentCycle } =
    useContext(CycleContext)

  const { handleSubmit, watch /* reset */ } = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopButton type="button" onClick={interruptCurrentCycle}>
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
