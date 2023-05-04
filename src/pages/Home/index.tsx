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
            list="task-suggestions"
            type="text"
            id="task"
            placeholder="Dê um nome para seu projeto"
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

        <ButtonStart>
          <Play />
          Começar
        </ButtonStart>
      </form>
    </HomeContainer>
  )
}
