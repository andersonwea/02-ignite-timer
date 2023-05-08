import styled from 'styled-components'

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
