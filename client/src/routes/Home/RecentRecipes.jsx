import { Paper, Grid, useTheme, useMediaQuery, Box, Link } from '@mui/material'
import Typography from '@mui/material/Typography'
import RecipeItem from 'components/Recipes/RecipeItem'
import TitleBlockContainer from 'components/Recipes/TitleBlockContainer'
import useAxios from 'hooks/useAxios'

function TitleBlock() {
  return (
    <TitleBlockContainer>
      <Typography variant='h4' fontWeight='bold'>Recently Added Recipes</Typography>
      <Typography>
        Check out the delicious new recipes just added to our app! From savory delights to sweet treats, there's something for every palate. Happy cooking!
      </Typography>
      <Typography>
        See the rest of the recipes <Link href='/recipes' color='inherit'>here</Link>.
      </Typography>
    </TitleBlockContainer>
  )
}

function RecipeList({ recipes }) {
	const theme = useTheme()

	return (
		<Grid container spacing={theme.getSpacing()} pt={theme.getSpacing()} display={'flex'}>
			{recipes && recipes.map((recipe, index) => (
				<RecipeItem key={recipe.id} xs={6} sm={6} md={3}>{recipe}</RecipeItem>
			)
			)}
		</Grid>
	)
}

export default function RecentRecipes({ ...rest }) {
  const { data, loading, error } = useAxios('/recipe/list?count=4', 'get')

  return (
    <Box {...rest}>
      <TitleBlock />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && <RecipeList recipes={data} />}
    </Box>
  )
}