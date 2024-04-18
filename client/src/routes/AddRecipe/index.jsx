import {
  Fragment,
  useState
} from 'react'
// import { useNavigate } from "react-router-dom"
// import api from 'hooks/useAxios/api'
import { Alert, Box, CircularProgress, Grid, Modal, Paper, Typography } from '@mui/material'
import { Form, Input, DynamicFields, Button, Select, useFormMethods } from 'components/Form'
import Title from 'components/Title'
import api from 'hooks/useAxios/api'
import axios from 'axios'
import ImageCropper from 'features/ImageCropper'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
}

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

function ImageInput({ setImageFile }) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)

  const onSelectFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    } else {
      const objectUrl = URL.createObjectURL(event.target.files[0])
      setImage(objectUrl)
      setOpen(true)
    }
  }

  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Image</Typography>
      </Grid>
      <Grid item xs={12}>
        <input type="file" name="image" accept="image/*" label="Image" onChange={onSelectFile} />
      </Grid>
      <Modal open={open}>
        <Box sx={style}>
          <ImageCropper name="image" image={image} setOpen={setOpen} setImageFile={setImageFile}/>
        </Box>
      </Modal>
    </Fragment>
  )
}

function RecipeForm() {
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (data) => {
    console.log(data)
    setSuccess(false)
    setError(false)

    setLoading(true)
    api.post('/recipe', data)
      .then((res) => {
        submitImage(res.data)
      })
      .catch(() => setError({ message: 'no data was successfully uploaded' }))
      .finally(() => setLoading(false))
  }

  const submitImage = (id) => {
    axios.post(`/api/recipe/image?id=${id}`, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data;',
      }
    })
      .then(() => setSuccess(true))
      .catch(() => setError({ message: 'image was not successfully uploaded, but data was' }))
      .finally(() => setLoading(false))
  } 

  return (
    <Form
      spacing={2}
      onSubmit={handleSubmit}
      defaultValues={{ ingredients: [""], instructions: [""] }}
    >
      {success && <Alert severity="success">Data Successfully Submitted</Alert>}
      {error && <Alert severity="error">{error.message}</Alert>}
      {loading && <CircularProgress/>}
      <UrlForm />
      <ImageInput setImageFile={setImageFile}/>
      <Grid item xs={12}>
        <Typography variant='h5' color='primary'>Description</Typography>
      </Grid>
      <Input name="name" label="Name" required xs={12} md={6} />
      <Select
        options={["Entree", "Side", "Drink", "Dessert"]}
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

      <Button type="submit">Submit</Button>
    </Form>
  )
}


export default function AddRecipe() {

  return (
    <Paper sx={{ px: 3, pt: 2, pb: 1 }}>
      <Title>Add New Recipe</Title>
      <RecipeForm />
    </Paper>
  )
}