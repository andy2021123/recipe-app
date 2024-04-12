import { Fragment } from 'react'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/system'
import { useFormMethods } from '.'

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

function InnerInput({ name, label, required, placeholder, ...rest }) {
  const { register } = useFormMethods()

  return (
    <TextField
      required={required}
      name={name}
      placeholder={placeholder || name}
      fullWidth
      {...register(name)}
      {...rest}
    />
  )
}

export default function Input({ variant, label, required, ...rest }) {
  return (
    <FormGrid item sx={12}>
      {variant !== 'compact' && label ? (
        <Fragment>
          <FormLabel required={required}>{label}</FormLabel>
          <InnerInput required={required} {...rest} />
        </Fragment>
      ) : (
        <InnerInput required={required} {...rest} />
      )}
    </FormGrid>
  )
}