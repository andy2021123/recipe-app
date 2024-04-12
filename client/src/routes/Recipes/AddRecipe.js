// import { useState, useEffect } from 'react'
// import { useNavigate } from "react-router-dom"
// import api from 'hooks/useAxios/api'
import { Grid } from '@mui/material'
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'
import { Form, Input, DynamicFields, Button } from 'components/Form'


function URLForm(props) {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input name="url" label="URL" />
      <Button type="submit">Submit</Button>
    </Form>
  )
}

function RecipeForm(props) {
  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input name="name" label="Name" required />
      <Input name="description" label="Description" required />
      <Grid item xs={12} md={6}>
        <DynamicFields
          name="ingredients"
          label="Ingredients"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <DynamicFields
          name="instructions"
          label="Instructions"
        />
      </Grid>
      <Button type="submit">Submit</Button>
    </Form>
  )
}


export default function AddRecipe() {
  return (
    <Container component={Paper} sx={{ mt: 2, pt: 2 }}>
      <Grid container spacing={2} alignContent={'center'} justifyContent={'center'} justifyItems={'center'}>
        <Grid item xs={12}>
          <URLForm />
        </Grid>
        <Grid item xs={12}>
          <RecipeForm />
        </Grid>
      </Grid>
    </Container>
  )
}