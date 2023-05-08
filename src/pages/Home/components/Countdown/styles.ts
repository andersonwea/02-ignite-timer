import styled from 'styled-components'

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
