import { FormContainer, MinutesInput, TaskInput } from './styles'

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="tak">Vou trabalhar em</label>
      <TaskInput
        list="task-suggestions"
        type="text"
        id="task"
        disabled={!!activeCycle}
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('time', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
