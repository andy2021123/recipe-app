import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

const defaultTheme = createTheme({
  palette: {
    background: {
      default: grey[50]
    },
    primary: {
      main: "#733A00",
      light: "#985613",
      dark: "#2E1700"
    },
    secondary: {
      main: "#023948",
      light: "#0F4D5E",
      dark: "#00161C"
    }
  }
}) 

export default defaultTheme