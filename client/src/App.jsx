import { ThemeProvider } from '@mui/material/styles'
import AppRoutes from './routes'
import { CssBaseline } from "@mui/material"
import theme from './style/theme'

function App() {
  return (
    <ThemeProvider theme={theme()}>
      <CssBaseline/>
        <AppRoutes/>
    </ThemeProvider>
  )
}

export default App
