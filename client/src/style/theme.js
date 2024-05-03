import { createTheme, useMediaQuery } from "@mui/material"
import { grey } from "@mui/material/colors"

const theme = () => {
  const defaultTheme = createTheme()
  const isMobile = () => useMediaQuery(defaultTheme.breakpoints.down('md'), { defaultMatches: true })
  const getSpacing = () => isMobile() ? 1 : 2

  return createTheme({
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
    },
    isMobile,
    getSpacing
  }) 
}

export default theme