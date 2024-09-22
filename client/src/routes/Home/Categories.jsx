import { Grid, useTheme, useMediaQuery, Box, Divider, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import TitleBlockContainer from 'components/Recipes/TitleBlockContainer'
import CategoryButton from 'components/CategoryButton'

function TitleBlock() {
  const theme = useTheme()

  return (
    <TitleBlockContainer>
      <Typography variant='h3' fontWeight='bold'>Home</Typography>
      <Typography>
        {import.meta.env.VITE_APP_TITLE} is your go-to digital kitchen companion, offering a diverse range of global recipes for all occasions. Expertly curated dishes cater to every taste and skill level, ensuring a seamless cooking experience. Join the community, share recipes, and start your flavorful journey today!
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

  return (
    <Grid container spacing={theme.getSpacing()} pt={theme.getSpacing()} display={'flex'} justifyContent='center'>
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