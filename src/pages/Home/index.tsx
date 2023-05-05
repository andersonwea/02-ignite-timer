import { Play } from '@phosphor-icons/react'
import {
  ButtonStart,
  FormContainer,
  HomeContainer,
  MinutesInput,
  Separator,
  TaskInput,
  TimerContainer,
} from './styles'
import { useForm } from 'react-hook-form'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewTask(data: any) {
    console.log(data)
  }

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
