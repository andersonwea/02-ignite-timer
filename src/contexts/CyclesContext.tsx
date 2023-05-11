import { ReactNode, createContext, useReducer, useState } from 'react'

interface CreateCycleData {
  task: string
  time: number
}

interface Cycle {
  id: string
  task: string
  time: number
  startAt: Date
  interruptedAt?: Date
  finishedAt?: Date
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
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    console.log(state)
    console.log(action)

    return state
  }, [])

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function markCurrentCycleAsFineshed() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedAt: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })

    setActiveCycleId(null)
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

    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedAt: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )

    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    setActiveCycleId(null)
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
