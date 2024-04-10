import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues })
  const { handleSubmit } = methods

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                register: methods.register,
                key: child.props.name,
              },
            })
          : child
      })}
    </Box>
  )
}


export function Input({ register, name, ...rest }) {
  return <TextField {...register(name)} {...rest} />
}


// export function Select({ register, options, name, ...rest }) {
//   return (
//     <select {...register(name)} {...rest}>
//       {options.map((value) => (
//         <option key={value} value={value}>
//           {value}
//         </option>
//       ))}
//     </select>
//   )
// }