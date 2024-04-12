import { useEffect } from 'react'
import { Grid } from '@mui/material'
import Button from './Button'
import Input from './Input'
import { useFormMethods } from '.'
import { useFieldArray } from 'react-hook-form'

export default function DynamicFields({ name, label, required, ...rest }) {
  const { control } = useFormMethods()
  const { fields, append } = useFieldArray({ control, name: name })

  useEffect(() => {
    !fields && append()
  }, [])

  return (
    <Grid container spacing={3}>
      {fields && fields.map((field, index) => (
        <Input
          variant={index > 0 ? 'compact' : 'normal'}
          key={field.id}
          name={(`${name}.${index}`)}
          placeholder={label?.slice(0, -1)}
          required={required}
          xs={12}
          {...rest}
        />
      ))}
      <Button
        type="button"
        onClick={() => append()}
      >
        append
      </Button>
    </Grid>
  )
}