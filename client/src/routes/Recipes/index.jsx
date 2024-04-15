import { Box, Paper, Grid, useTheme, Skeleton, CardActionArea } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios from 'hooks/useAxios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Search from 'components/Search'


function TitleBlock() {
  const theme = useTheme()

  return (
    <Paper
      sx={{
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        p: 2
      }}
    >
      <Typography variant='h5' fontWeight='bold' sx={{ pb: 1 }}>All Recipes</Typography>
      <Search />
    </Paper>
  )
}

function RecipeItem(props) {
  const { id, name, image, category } = props.children

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Card>
        <CardActionArea>
          {image ? (
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              src={`data:image/png;base64,${image}`}
            />
          ) : (
            <Skeleton animation={false} variant="rectangular" height={200} />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {category}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

function RecipeList(props) {
  const { recipes } = props

  return (
    <Grid container spacing={2} pt={2}>
      {recipes && recipes.map((recipe) => (
        <RecipeItem key={recipe.id}>{recipe}</RecipeItem>
      )
      )}
    </Grid>
  )
}

export default function Recipes() {
  const { data, loading, error } = useAxios('/recipes', 'get')

  return (
    <Box>
      <TitleBlock />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && <RecipeList recipes={data} />}
    </Box>
  )
}