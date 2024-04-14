import { 
  Fragment,
  // useEffect, 
  // useState 
} from 'react'
// import { useNavigate } from "react-router-dom"
// import api from 'hooks/useAxios/api'
import Container from '@mui/material/Container'
import { Grid, Paper, Typography } from '@mui/material'
import { Form, Input, DynamicFields, Button, Select, useFormMethods } from 'components/Form'
import Title from 'components/Title'

function UrlForm() {
  const { getValues, setValue } = useFormMethods()

  const onURL = (url) => {
    console.log(url)
    setValue('name', 'New Name', { shouldDirty: true })
    setValue('description', 'New Description', { shouldDirty: true })
    setValue('ingredients', ["SET New Ingredient"])
    setValue('instructions', ["SET New Instructions"])
  }

  return (
    <Fragment>
      <Input name="url" label="Recipe URL" />
      <Button type="button" onClick={() => {
        const url = getValues('url')
        onURL(url)
      }}>Autofill Recipe From URL</Button>
    </Fragment>
  )
}

function RecipeForm() {

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form
      spacing={2}
      onSubmit={onSubmit}
      defaultValues={{ingredients: [""], instructions: [""]}}
    >
      <UrlForm />

      <Input type="file" name="image" label="Image"/>

      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Description</Typography>
      </Grid>
      <Input name="name" label="Name" required xs={12} md={6}/>
      <Select 
        options={["Entree", "Side", "Drink", "Dessert"]}
        name="type" label="Type" required xs={12} md={6}
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
      <Input type="number" name="time.prep" label="Preparation Time (minutes)" xs={12} md={6}/>
      <Input type="number" name="time.cook" label="Cook Time (minutes)" xs={12} md={6}/>
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
      <Input multiline rows={2} name="notes" label="Notes"/>

      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Nutrition</Typography>
      </Grid>
      <Input name="nutrition.calories" label="Calories" xs={12} md={6}/>
      <Input name="nutrition.protein" label="Protein" xs={12} md={6}/>
      <Input name="nutrition.carbs" label="Carbohydrates" xs={12} md={6}/>
      <Input name="nutrition.fat" label="Fat" xs={12} md={6}/>

      <Button type="submit">Submit</Button>
    </Form>
  )
}


export default function AddRecipe() {

  return (
    <Container component={Paper} sx={{ p: 2 }}>
      <Title>Add New Recipe</Title>
      <RecipeForm />
    </Container>
  )
}