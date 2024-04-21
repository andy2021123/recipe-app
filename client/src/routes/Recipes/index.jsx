import { Box, Paper, Grid, useTheme, Skeleton, CardActionArea, useMediaQuery, Link, Divider } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios, { useAxiosImage } from 'hooks/useAxios'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Search from 'components/Search'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import categories from './categories'
import { capitalCase } from 'utils/stringFormat'

function TitleBlock() {
  const theme = useTheme()
  const [_, setSearchParams] = useSearchParams()

  const handleChange = (event) => {
    const { value } = event.target
    setSearchParams(value.length > 0 ? { search: value } : '')
  }

  return (
    <Paper
      sx={{
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        p: 2
      }}
    >
      <Typography variant='h3' fontWeight='bold' sx={{ pb: 1 }}>All Recipes</Typography>
      <Search onChange={handleChange} />
      <Box sx={{
        pt: 2,
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Link href='/recipes/entrees' color='inherit'>Entrees</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Link href='/recipes/sides' color='inherit'>Sides</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Link href='/recipes/drinks' color='inherit'>Drinks</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Link href='/recipes/desserts' color='inherit'>Desserts</Link>
      </Box>
    </Paper>
  )
}

function CategoryTitleBlock({ category: { name, description } }) {
  const theme = useTheme()

  return (
    <Paper
      sx={{
        bgcolor: theme.palette.secondary.light,
        color: theme.palette.common.white,
        p: 2
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Link href='/' color='inherit'>Home</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Link href='/recipes' color='inherit'>All Recipes</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Typography color='inherit'>{name}</Typography>
      </Box>
      <Typography variant='h3' fontWeight='bold' sx={{ py: 1 }}>{name}</Typography>
      <Typography>{description}</Typography>
    </Paper>
  )
}

function RecipeItem({ children: { id, name, category, description } }) {
  const { image, loading } = useAxiosImage(`/recipe/${id}/image`)
  const navigate = useNavigate()

  const theme = useTheme()

  const openRecipe = () => {
    navigate(`/recipe/${id}`)
  }

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{
        [theme.breakpoints.only('md')]: {
          maxWidth: '24vw'
        },
        [theme.breakpoints.only('sm')]: {
          maxWidth: '32vw'
        },
        [theme.breakpoints.only('xs')]: {
          maxWidth: '48vw'
        }
      }}>
        <CardActionArea onClick={openRecipe}>
          {image ? (
            <CardMedia
              component="img"
              sx={{ width: 'inherit' }}
              src={image}
            />
          ) : loading ? (
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: '100%' }} />
            </Skeleton>
          ) : (
            <Skeleton animation={false} variant="rectangular" width="100%">
              <div style={{ paddingTop: '100%' }} />
            </Skeleton>
          )}
          <CardContent
            sx={{ height: 120 }}
          >
            <Typography gutterBottom variant="h6" component="div" style={{ lineHeight: '1.2em', maxHeight: '2.4em', overflow: 'hidden' }}>{name}</Typography>
            <Typography paragraph color="text.secondary" noWrap>{category}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

function RecipeList(props) {
  const { recipes } = props
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('search')

    if (search) {
      setFilteredRecipes(recipes.filter((item) => (
        item.name.toLowerCase().includes(search.toLowerCase())
      )))
    } else {
      setFilteredRecipes(recipes)
    }
  }, [searchParams])

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  })

  return (
    <Grid container spacing={isMobile ? 1 : 2} pt={isMobile ? 1 : 2} display={'flex'}>
      {filteredRecipes && filteredRecipes.map((recipe, index) => (
        <RecipeItem key={recipe.id}>{recipe}</RecipeItem>
      )
      )}
    </Grid>
  )
}

export function AllRecipes() {
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

export function CategorizedRecipes() {
  const { category } = useParams()
  const category_object = categories.find(item => item.name.toLowerCase() === category)

  const { data, loading, error } = useAxios(`/recipe/list/${capitalCase(category)}`, 'get')

  return (
    <Box>
      <CategoryTitleBlock category={category_object} />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && <RecipeList recipes={data} />}
    </Box>
  )
}