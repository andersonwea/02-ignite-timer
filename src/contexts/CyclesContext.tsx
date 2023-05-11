import { ReactNode, createContext, useReducer, useState } from 'react'

import { Cycle, cyclesReducer } from '../reducers/cycles'

interface CreateCycleData {
  task: string
  time: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  amountSecondsPassed: number
  secondsPassed: (seconds: number) => void
  markCurrentCycleAsFineshed: () => void
  setAmountSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CyclesContextType)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const [cycleState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const { cycles, activeCycleId } = cycleState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFineshed() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
  }

  function secondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      time: data.time,
      startAt: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        amountSecondsPassed,
        markCurrentCycleAsFineshed,
        secondsPassed,
        setAmountSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
