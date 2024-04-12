import { createContext, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from './Button'
import DynamicFields from './DynamicFields'
import Input from './Input'

const FormMethodsContext = createContext()

const FormMethodsProvider = ({ children }) => {
  const contextValue = useForm()

  return (
    <FormMethodsContext.Provider value={contextValue}>
      {children}
    </FormMethodsContext.Provider>
  );
}

const useFormMethods = () => {
  return useContext(FormMethodsContext)
}

function FormBox({ children, onSubmit, ...rest }) {
  const { handleSubmit } = useFormMethods()

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      {...rest}
    >
      <Grid container spacing={3} alignContent={'center'} justifyContent={'center'} justifyItems={'center'}>
        {children}
      </Grid>
    </Box>
  )
}

function Form({ defaultValues, children, ...rest }) {
  return (
    <FormMethodsProvider>
      <FormBox {...rest}>{children}</FormBox>
    </FormMethodsProvider>
  )
}

export { useFormMethods, Form, Input, DynamicFields, Button }
