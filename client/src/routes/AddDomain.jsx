import {
  Fragment,
  useEffect,
  useState
} from 'react'
import { Alert, Box, CircularProgress, Grid, Modal, Paper, Typography } from '@mui/material'
import { Form, Input, DynamicFields, Button, Select, useFormMethods } from 'components/Form'
import Title from 'components/Title'
import api from 'hooks/useAxios/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
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

function RecipeForm() {
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null)
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (data) => {
    setSuccess(false)
    setError(false)

    setPending(true)
    api.post('/recipe', data)
      .then((res) => {
        if (imageFile) {
          submitImage(res.data)
        } else {
          setSuccess(true)
          redirectToRecipe(res.data)
        }
      })
      .catch(() => setError({ message: 'no data was successfully uploaded' }))
      .finally(() => setPending(false))
  }

  const submitImage = (id) => {
    api.post(`/recipe/${id}/image`, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data;',
      }
    })
      .then(() => {
        setSuccess(true)
        setPending(false)
        redirectToRecipe(id)
      })
      .catch(() => setError({ message: 'image was not successfully uploaded, but data was' }))
      .finally(() => {
        setPending(false)
      })
  }

  const redirectToRecipe = (id) => {
    setTimeout(() => {
      navigate(`/recipe/${id}`)
    }, 500)
  }

  return (
    <Form
      spacing={2}
      onSubmit={handleSubmit}
      defaultValues={{ ingredients: [""], instructions: [""] }}
    >
      {success && <Alert severity="success">Data Successfully Submitted</Alert>}
      {error && <Alert severity="error">{error.message}</Alert>}
      {pending && <CircularProgress />}
      <UrlForm setError={setError} />
      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Description</Typography>
      </Grid>
      <Input name="name" label="Name" required xs={12} md={6} />
      <Select
        options={["Entrees", "Sides", "Drinks", "Desserts"]}
        name="category" label="Category" required xs={12} md={6}
      />
      <Input name="description" label="Description" required />
      <DynamicFields
        name="keywords"
        label="Keywords"
        xs={12}
      />

      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Recipe</Typography>
      </Grid>
      <Input type="number" name="prep_time" label="Preparation Time (minutes)" xs={12} md={6} />
      <Input type="number" name="cook_time" label="Cook Time (minutes)" xs={12} md={6} />
      <DynamicFields
        name="ingredients"
        label="Ingredients"
        xs={12}
        md={6}
        required
      />
      <DynamicFields
        name="instructions"
        label="Instructions"
        xs={12}
        md={6}
        required
      />
      <Input multiline rows={2} name="notes" label="Notes" />

      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Nutrition</Typography>
      </Grid>
      <Input name="nutrition.calories" label="Calories" xs={12} md={6} />
      <Input name="nutrition.protein" label="Protein" xs={12} md={6} />
      <Input name="nutrition.carbs" label="Carbohydrates" xs={12} md={6} />
      <Input name="nutrition.fat" label="Fat" xs={12} md={6} />

      <Button type="submit" disabled={pending}>Submit</Button>
    </Form>
  )
}

function SelectorsForm({ setRecipe }) {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = () => {

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
      <UrlForm setRecipe={setRecipe}/>
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
      <Button type="submit" disabled={false}>Submit Values to Database</Button>
    </Form>
  )
}

export default function AddDomain() {
  const [recipe, setRecipe] = useState(null)

  return (
    <Fragment>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Title>Add New Domain</Title>
        <SelectorsForm setRecipe={setRecipe}/>
      </Paper>
      {recipe && (
        <MainBlock recipe={recipe}/>
      )}
    </Fragment>
  )
}