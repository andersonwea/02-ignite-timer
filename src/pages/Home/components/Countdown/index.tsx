import { TimerContainer, Separator } from './styles'

export function Countdown() {
  return (
    <TimerContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </TimerContainer>
  )
}
