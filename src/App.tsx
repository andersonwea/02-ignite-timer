import { GlobalStyle } from './styles/global'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { CycleContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CycleContextProvider>
        <RouterProvider router={router} />
      </CycleContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
