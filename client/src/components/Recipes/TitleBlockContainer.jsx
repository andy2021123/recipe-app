import { Paper, useTheme } from "@mui/material"

export default function TitleBlockContainer({ children }) {
  const theme = useTheme()
  
  return (
    <Paper
      sx={{
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        p: 2
      }}
    >
      {children}
    </Paper>
  )
}