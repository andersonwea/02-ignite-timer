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

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="tak">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto"
          />

          <label htmlFor="time">durante</label>
          <MinutesInput type="number" id="time" placeholder="- 00 +" />
          <span>minutos.</span>
        </FormContainer>

        <TimerContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </TimerContainer>

        <ButtonStart>
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
