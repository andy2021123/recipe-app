import { Button as MuiButton, Grid } from '@mui/material'

export default function Button({ children, ...rest }) {
  return (
    <Grid item xs={12}>
      <MuiButton {...rest}>{children}</MuiButton>
    </Grid>
  )
}