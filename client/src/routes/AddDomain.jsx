import {
  Fragment,
  useState
} from 'react'
import { Alert, CircularProgress, Grid, Paper, Typography, useTheme } from '@mui/material'
import { Form, Input, Button, useFormMethods } from 'components/Form'
import Title from 'components/Title'
import api from 'hooks/useAxios/api'
import { useNavigate } from 'react-router-dom'
import getDomainFromURL from 'utils/getDomainFromURL'
import { MainBlock } from './Recipe'

function UrlForm({ setRecipe }) {
  const { getValues, setValue } = useFormMethods()

  const handleTest = () => {
    setRecipe(null)
    const data = getValues()
    api.post(`/selectors/test`, data)
      .then((res) => {
        setRecipe(res.data)
      })
  }

  return (
    <Fragment>
      <Input name="url" label="Test Recipe URL" required onChange={(event) => setValue('domain', getDomainFromURL(event.target.value))} />
      <Button type="button" onClick={handleTest}>Test the Current Values</Button>
    </Fragment>
  )
}

function SelectorsForm({ setRecipe }) {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (data) => {
    setSuccess(false)
    setError(false)
    setPending(true)

    api.post('/selectors', data)
      .catch(() => setError({ message: 'no data was successfully uploaded' }))
      .finally(() => setPending(false))
  }

  return (
    <Form
      spacing={2}
      onSubmit={handleSubmit}
      defaultValues={{
        name: '.wprm-recipe-name',
        description: '.wprm-recipe-summary',
        ingredients: '.wprm-recipe-ingredient',
        instructions: '.wprm-recipe-instruction-text',
        cook_time: '.wprm-recipe-cook_time-minutes',
        prep_time: '.wprm-recipe-prep_time-minutes',
      }}
    >
      {/* Flash Messages */}
      {success && <Alert severity="success">Data Successfully Submitted</Alert>}
      {error && <Alert severity="error">{error.message}</Alert>}
      {pending && <CircularProgress />}

      {/* Test URL */}
      <UrlForm setRecipe={setRecipe}/>

      {/* Selectors */}
      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Selectors</Typography>
      </Grid>
      <Input name="domain" label="Domain" disabled required xs={12} md={6} />
      <Input name="name" label="Name" required xs={12} md={6} />
      <Input name="description" label="Description" xs={12} md={6} />
      <Input name="ingredients" label="Ingredients" required xs={12} md={6} />
      <Input name="instructions" label="Instructions" required xs={12} md={6} />
      <Input name="prep_time" label="Preparation Time" xs={12} md={6} />
      <Input name="cook_time" label="Cook Time" xs={12} md={6} />
      <Input name="notes" label="Notes" xs={12} md={6} />

      <Button type="submit" disabled={pending}>Save Values</Button>
    </Form>
  )
}

export default function AddDomain() {
  const theme = useTheme()
  const [recipe, setRecipe] = useState(null)

  return (
    <Fragment>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Title>Add New Domain</Title>
        <SelectorsForm setRecipe={setRecipe} />
      </Paper>
      {recipe && (
        <Fragment>
          <Paper
            sx={{
              bgcolor: theme.palette.secondary.light,
              color: theme.palette.common.white,
              p: 2
            }}
          >
            <Typography variant='h4' fontWeight='bold'>{recipe.name}</Typography>
            <Typography>{recipe.description}</Typography>
          </Paper>
          <MainBlock recipe={recipe} />
        </Fragment>
      )}
    </Fragment>
  )
}