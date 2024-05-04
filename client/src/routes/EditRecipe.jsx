import {
  Fragment,
  useState
} from 'react'
import { Alert, CircularProgress, Grid, Paper, Typography } from '@mui/material'
import { Form, Input, DynamicFields, Button, Select } from 'components/Form'
import Title from 'components/Title'
import api from 'hooks/useAxios/api'
import { useNavigate, useParams } from 'react-router-dom'
import useAxios from 'hooks/useAxios'


function RecipeForm({ name_url: id, keywords, ...rest }) {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (data) => {
    setError(false)
    setPending(true)

    api.post(`/recipe/${id}`, data)
      .then(() => navigate(`/recipe/${id}`))
      .catch(() => setError({ message: 'no data was successfully uploaded' }))
      .finally(() => setPending(false))
  }

  return (
    <Form
      spacing={2}
      onSubmit={handleSubmit}
      defaultValues={{ keywords: keywords && keywords.split(', ') || null, ...rest}}
    >
      {/* Flash Messages */}
      {error && <Alert severity="error">{error.message}</Alert>}
      {pending && <CircularProgress />}

      {/* Description */}
      <Input name="name" label="Name" required disabled xs={12} md={6} />
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

      {/* Recipe Specifics */}
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

      <Button type="submit" disabled={pending}>Submit</Button>
    </Form>
  )
}


export default function EditRecipe() {
  const { id } = useParams()
  const { data, loading, error } = useAxios(`/recipe/${id}`, 'get')


  return (
    <Paper sx={{ p: 2 }}>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && (
      <Fragment>
        <Title>Edit Recipe: {data.name}</Title>
        <RecipeForm {...data}/>
      </Fragment>
    )}
    </Paper>
  )
}