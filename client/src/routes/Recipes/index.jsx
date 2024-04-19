import { Box, Paper, Grid, useTheme, Skeleton, CardActionArea } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios, { useAxiosImage } from 'hooks/useAxios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Search from 'components/Search'
import { useEffect, useState } from 'react'
import api from 'hooks/useAxios/api'
import { useNavigate } from 'react-router-dom'


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

function RecipeItem({ children: { id, name, category, description } }) {
  const { image, loading } = useAxiosImage(`/recipe/image/${id}`)
  const navigate = useNavigate()

  const openRecipe = () => {
    navigate(`/${id}`)
  }

  return (
    <Grid item xs={6} md={4} lg={3}>
      <Card>
        <CardActionArea onClick={openRecipe}>
          {image ? (
            <CardMedia
              component="img"
              sx={{ height: 200 }}
              src={image}
            />
          ) : loading ? (
            <Skeleton variant="rectangular" height={200} />
          ) : (
            <Skeleton animation={false} variant="rectangular" height={200} />
          )}
          <CardContent
            sx={{ height: 100 }}
          >
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {name}
            </Typography>
            <Typography paragraph color="text.secondary" noWrap>
              {description}
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
      {recipes && recipes.map((recipe, index) => (
        <RecipeItem key={recipe.id}>{recipe}</RecipeItem>
      )
      )}
    </Grid>
  )
}

export default function Recipes() {
  const { data, loading, error } = useAxios('/recipe/list', 'get')

  return (
    <Box>
      <TitleBlock />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && <RecipeList recipes={data} />}
    </Box>
  )
}