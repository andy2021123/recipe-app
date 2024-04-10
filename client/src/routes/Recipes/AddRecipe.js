import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Button, Typography, Alert } from '@mui/material'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Paper } from '@mui/material'
import { useForm } from 'react-hook-form'
import api from 'hooks/useAxios/api'
import { Form, Input, Select } from 'components/Form'


function URLForm(props) {
  const onSubmit = (data) => {
    console.log(data)
  } 

  return (
    <Form onSubmit={onSubmit}>
      <Input name="url" label="URL"/>
      <Button type="submit" value="Submit" />
    </Form>
  )
}

function DynamicForm() { // TODO: update to mui components
  const { control, handleSubmit, append, fields } = useForm()

  const onSubmit = (data) => {
    console.log(data)
  }

  const addField = () => {
    append({ id: fields.length, value: '' })
  }

  return (
    <div>
      <h1>Dynamic Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Controller
              name={`fields[${index}].value`}
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} />}
            />
          </div>
        ))}
        <button type="button" onClick={addField}>Add Field</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function RecipeForm(props) {
  const navigate = useNavigate()
  const { register, handleSubmit, reset } = useForm()

  // const onSubmit = (data) => {
  //   api.post('/recipes/add', data)
  //     .then((res) => {
  //       const { id } = 
  //       console.log(id)
  //       // navigate(`/recipes/${id}`)
  //     }).catch((err) => {
  //       if (err.response) {

  //         setFlash(true)
  //         setTimeout(() => {
  //           setFlash(null)
  //         }, 5000)
  //       }
  //     })
  //   reset()
  // }

  const onSubmit = (data) => {
    console.log(data)
  } 

  return (
    <Form onSubmit={onSubmit}>
      <Input name="name" label="Name"/>
      <Input name="description" label="Description"/>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography>Ingredients</Typography>
          <DynamicForm name="ingredients"/>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Instructions</Typography>
          <DynamicForm name="instructions"/>
        </Grid>
      </Grid>

      <Button type="submit" value="Submit" />
    </Form>
  )
}

export default function AddRecipe() {
  return (
    <Container component={Paper}>
      <URLForm />
      <RecipeForm />
    </Container>
  )
}