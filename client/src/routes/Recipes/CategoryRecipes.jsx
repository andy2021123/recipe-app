import { Paper, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'
import useAxios from 'hooks/useAxios'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

function RecipeList(props) {
  const { recipes } = props

  return (
    <List>
      {recipes && recipes.map((recipe) => (
        <RecipeItem key={recipe.id}>{recipe}</RecipeItem>
      )
      )}
    </List>
  )
}

function RecipeItem(props) {
  const { id, name, image, description } = props.children
  const width = 100

  return (
    <ListItem>
      <ListItemButton href={`/recipes/${id}`}>
        <ListItemAvatar>
          {image ? (
            <Avatar
              variant='rounded'
              src={`data:image/png;base64,${image}`}
            />
          ) : (
            <Avatar variant='rounded'>
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={name} secondary={description} />
      </ListItemButton>
    </ListItem>
  )
}

export default function CategoryRecipes() {
  const { data, loading, error } = useAxios('/recipes', 'get')

  return (
    <Container component={Paper} sx={{ p: 2 }}>
      <Title>Recipes</Title>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && <RecipeList recipes={data} />}
    </Container>
  )
}