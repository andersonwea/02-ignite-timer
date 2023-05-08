import { differenceInSeconds } from 'date-fns'
import { useState, useEffect, useContext } from 'react'
import { TimerContainer, Separator } from './styles'
import { CycleContext } from '../..'

export function Countdown() {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const { activeCycle, markCurrentCycleAsFineshed } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.time * 60 : 0

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startAt,
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFineshed()

          clearInterval(interval)
          setAmountSecondsPassed(totalSeconds)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, markCurrentCycleAsFineshed])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) document.title = `${minutes}:${seconds}`
  }, [minutes, seconds, activeCycle])

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
