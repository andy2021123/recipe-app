import {
  Fragment,
  useEffect,
  useState
} from 'react'
import { Alert, Box, CircularProgress, Grid, Modal, Paper, Typography } from '@mui/material'
import { Form, Input, DynamicFields, Button, Select, useFormMethods } from 'components/Form'
import Title from 'components/Title'
import api from 'hooks/useAxios/api'
import ImageCropper from 'features/ImageCropper'
import { useNavigate, useSearchParams } from 'react-router-dom'


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

function UrlForm({}) {
  const { getValues, setValue } = useFormMethods()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const url = searchParams.get('url')

    if (url) {
      // reset url form value
      if (!getValues('url')) {
        setValue('url', url)
      }

      // make autofill request
      api.get(`/recipe/autofill?url=${url}`)
        .then(res => {
          const {
            name,
            description,
            ingredients,
            instructions,
            prep_time,
            cook_time,
          } = res.data

          setValue('name', name)
          setValue('description', description)
          setValue('ingredients', ingredients)
          setValue('instructions', instructions)
          setValue('prep_time', prep_time)
          setValue('cook_time', cook_time)
        })
        .catch(err => console.log('no recipe data found'))
    }
  }, [searchParams])



  const onURL = () => {
    const value = getValues('url')
    setSearchParams(value.length > 0 ? { url: value } : '')
  }

  return (
    <Fragment>
      <Input name="url" label="Recipe URL" />
      <Button type="button" onClick={onURL}>Autofill Recipe From URL</Button>
    </Fragment>
  )
}

function ImageInput({ onChange: setImageFile, resizeWidth }) {
  const [open, setOpen] = useState(false)
  const [image, setImage] = useState(null)

  const handleSelectFile = (event) => {
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
        <input type="file" name="image" accept="image/*" label="Image" onChange={handleSelectFile} />
      </Grid>
      <Modal open={open}>
        <Box sx={style}>
          <ImageCropper name="image" image={image} setOpen={setOpen} setImageFile={setImageFile} resizeWidth={resizeWidth} />
        </Box>
      </Modal>
    </Fragment>
  )
}

function RecipeForm() {
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (data) => {
    setError(false)
    setPending(true)
    
    api.post('/recipe', data)
      .then((res) => {
        if (imageFile) {
          submitImage(res.data)
        } else {
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
      .then(() => redirectToRecipe(id))
      .catch(() => setError({ message: 'image was not successfully uploaded, but data was' }))
      .finally(() => setPending(false))
  }

  const redirectToRecipe = (id) => {
    navigate(`/recipe/${id}`)
  }

  return (
    <Form
      spacing={2}
      onSubmit={handleSubmit}
      defaultValues={{ ingredients: [""], instructions: [""] }}
    >
      {/* Flash Messages */}
      {error && <Alert severity="error">{error.message}</Alert>}
      {pending && <CircularProgress />}

      {/* URL Autofill */}
      <UrlForm setError={setError} />

      {/* Image Input */}
      <ImageInput onChange={setImageFile} resizeWidth={600} />

      {/* Description */}
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


export default function AddRecipe() {

  return (
    <Paper sx={{ p: 2 }}>
      <Title>Add New Recipe</Title>
      <RecipeForm />
    </Paper>
  )
}