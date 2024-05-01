import { Grid, useTheme, useMediaQuery, Box, Divider, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios from 'hooks/useAxios'
import RecipeItem from 'components/Recipes/RecipeItem'
import TitleBlockContainer from 'components/Recipes/TitleBlockContainer'
import CategoryButton from 'components/CategoryButton'

function TitleBlock() {
  const theme = useTheme()

  return (
    <TitleBlockContainer>
      <Typography variant='h3' fontWeight='bold'>Home</Typography>
      <Typography>
        Welcome to our Cookbook App, your digital kitchen companion! Discover a world of culinary delights with our extensive collection of recipes from around the globe. From quick weekday dinners to indulgent weekend treats, find inspiration for every occasion. Explore mouthwatering dishes, curated by expert chefs and home cooks alike. Whether you're a seasoned chef or just starting out, our intuitive interface makes cooking a breeze. Join our community, share your own recipes, and embark on a delicious journey with us today!
      </Typography>
      <Box sx={{
        pt: 1,
        display: 'flex',
        alignItems: 'center',
      }}
      >
        <Link href='/add-recipe' color='inherit'>Add Recipe</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Link href='/add-domain' color='inherit'>Add Domain</Link>
        <Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
        <Link href='/recipes' color='inherit'>All Recipes</Link>
      </Box>
    </TitleBlockContainer>
  )
}

function CategoryList() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  })

  return (
    <Grid container spacing={isMobile ? 1 : 2} pt={isMobile ? 1 : 2} display={'flex'}>
      <Grid item xs={6} md={3}>
        <CategoryButton to='/recipes/entrees' img='/entrees.png' name='Entrees' />
      </Grid>
      <Grid item xs={6} md={3}>
        <CategoryButton to='/recipes/sides' img='/sides.png' name='Sides' />
      </Grid>
      <Grid item xs={6} md={3}>
        <CategoryButton to='/recipes/desserts' img='/desserts.png' name='Desserts' />
      </Grid>
      <Grid item xs={6} md={3}>
        <CategoryButton to='/recipes/drinks' img='/drinks.png' name='Drinks' />
      </Grid>
    </Grid>
  )
}

export default function Categories({ ...rest }) {
  return (
    <Box {...rest}>
      <TitleBlock />
      <CategoryList />
    </Box>
  )
}