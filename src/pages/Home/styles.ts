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
