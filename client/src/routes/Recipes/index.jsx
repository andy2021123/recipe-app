import { Box, Paper, Grid, useTheme, Skeleton, CardActionArea, useMediaQuery, Link, Divider, Stack, Pagination, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios from 'hooks/useAxios'
import Search from 'components/Search'
import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import categories from './categories'
import { capitalCase } from 'utils/stringFormat'
import RecipeItem from 'components/Recipes/RecipeItem'
import TitleBlockContainer from 'components/Recipes/TitleBlockContainer'
import NoPage from 'routes/NoPage'

function TitleBlock() {
  const theme = useTheme()
  const [_, setSearchParams] = useSearchParams()

  const handleChange = ({ target: { value } }) => {
    setSearchParams(value.length > 0 ? { search: value } : '')
  }

  return (
    <TitleBlockContainer>
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
    </TitleBlockContainer>
  )
}

function CategoryTitleBlock({ category: { name, description } }) {
  const theme = useTheme()

  return (
    <TitleBlockContainer>
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
    </TitleBlockContainer>
  )
}

function RecipeList({ recipes }) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)
  const [page, setPage] = useState(1)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setFilteredRecipes(recipes.filter((item) => (
        item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())
      )))
      setPage(1) // reset to first page
    } else {
      setFilteredRecipes(recipes)
    }
  }, [searchParams])

  const theme = useTheme()

  const itemsPerPage = 12

  return (
    <Stack spacing={theme.getSpacing()} alignItems='center' useFlexGap>
      <Grid container spacing={theme.getSpacing()} pt={theme.getSpacing()} display={'flex'}>
        {filteredRecipes && filteredRecipes.slice((page - 1) * itemsPerPage, page * itemsPerPage || -1).map((recipe, index) => (
          <RecipeItem key={recipe.id}>{recipe}</RecipeItem>
        )
        )}
      </Grid>
      {filteredRecipes.length > itemsPerPage && (
        <Pagination
          count={Math.ceil(filteredRecipes.length / itemsPerPage)}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      )}
    </Stack>
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

  if (category_object) {
    const { data, loading, error } = useAxios(`/recipe/list/${capitalCase(category)}`, 'get')

    return (
      <Box>
        <CategoryTitleBlock category={category_object} />
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography>{error}</Typography>}
        {data && <RecipeList recipes={data} />}
      </Box>
    )
  } else {
    return <NoPage />
  }
}