import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 4.5rem auto;
  max-width: 41rem;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

export const FormContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;

  label {
    font-weight: bold;
  }

  span {
    font-weight: bold;
  }
`

const BaseInput = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  text-align: center;
  font-weight: bold;

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme['green-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesInput = styled(BaseInput)`
  width: 4.5rem;
  flex: initial;
`

export const TimerContainer = styled.div`
  display: flex;

  span {
    font-family: 'Roboto Mono', monospace;
    font-size: 10rem;
    padding: 2.5rem 1rem;
    background: ${(props) => props.theme['gray-700']};
    border-radius: 0.5rem;
    line-height: 0.8;
  }

  span + span {
    margin-left: 1rem;
  }
`

export const Separator = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  padding: 2.5rem 0;
  border-radius: 0.5rem;
  line-height: 0.8;
  color: ${(props) => props.theme['green-500']};
`

export const BaseButton = styled.button`
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 1.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`

export const StartButton = styled(BaseButton)`
  background: ${(props) => props.theme['green-500']};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export const StopButton = styled(BaseButton)`
  background: ${(props) => props.theme['red-500']};
`
