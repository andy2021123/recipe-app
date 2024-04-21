import { useParams } from 'react-router-dom'
import { Box, Divider, Grid, Link, List, ListItem, Paper, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios, { useAxiosImage } from 'hooks/useAxios'
import { Fragment } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Title from 'components/Title'

function TitleBlock({ id, recipe: { name, description, category } }) {
	const theme = useTheme()

	const { image, loading } = useAxiosImage(`/recipe/${id}/image`)

	return (
		<Paper
			sx={{
				bgcolor: theme.palette.secondary.light,
				color: theme.palette.common.white,
				p: 2
			}}
		>
			<Grid container spacing={1} justifyContent='center'>
				<Grid item xs={12} sm={9} md={10}>
					<Box sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					>
						<Link href='/' color='inherit'>Home</Link>
						<Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
						<Link href='/recipes' color='inherit'>All Recipes</Link>
						<Divider sx={{ mx: 1 }} orientation="vertical" flexItem color={theme.palette.common.white} />
						<Link href={`/recipes/${category.toLowerCase()}`} color='inherit'>{category}</Link>
					</Box>
					<Typography variant='h3' fontWeight='bold' sx={{ py: 1 }}>{name}</Typography>
					<Typography>{description}</Typography>
				</Grid>
				<Grid item xs={12} sm={3} md={2}>
					{image && (
						<img
							src={image}
							width={'100%'}
						/>
					)}
				</Grid>
			</Grid>
		</Paper>
	)
}

function SectionTitle(props) {
	const theme = useTheme()

	return (
		<Grid container spacing={1} alignItems='center' py={1}>
			<Grid item xs="auto">
				<Typography variant="h5">
					{props.children}
				</Typography>
			</Grid>
			<Grid item xs>
				<Divider color={theme.palette.primary.light} />
			</Grid>
		</Grid>
	)
}

function Ingredients({ ingredients }) {
	return (
		<List sx={{ listStyle: 'circle', pl: 4 }}>
			{ingredients && ingredients.map((ingredient, index) => (
				<ListItem key={index} sx={{ display: 'list-item' }}>
					{ingredient}
				</ListItem>
			))}
		</List>
	)
}

function Instructions({ instructions }) {
	return (
		<List sx={{ listStyle: 'decimal', pl: 4 }}>
			{instructions && instructions.map((instruction, index) => (
				<ListItem key={index} sx={{ display: 'list-item' }}>
					{instruction}
				</ListItem>
			))}
		</List>
	)
}

function MainBlock({ recipe: { ingredients, instructions, cook_time, prep_time, notes, keywords } }) {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
		defaultMatches: true
	})

	return (
		<Paper sx={{ p: 2, mt: isMobile ? 1 : 2 }}>
			<Box display='flex' pb={1}>
				<AccessTimeIcon />
				<Typography sx={{ pl: 1 }}>Cook Time: {cook_time} minutes</Typography>
				<Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
				<Typography>Prep Time: {prep_time} minutes</Typography>
				<Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
				<Typography>Total Time: {cook_time + prep_time} minutes</Typography>
			</Box>

			<Divider />

			<SectionTitle>Ingredients</SectionTitle>
			<Ingredients ingredients={ingredients} />

			<SectionTitle>Instructions</SectionTitle>
			<Instructions instructions={instructions} />

			{notes && (
				<Fragment>
					<SectionTitle>Notes</SectionTitle>
					<Typography>{notes}</Typography>
				</Fragment>
			)}

			{keywords && (
				<Fragment>
					<SectionTitle>Keywords</SectionTitle>
					<Typography>{keywords}</Typography>
				</Fragment>
			)}

		</Paper>
	)
}


export default function Recipe() {
	const { id } = useParams()
	const { data, loading, error } = useAxios(`/recipe/${id}`, 'get')

	return (
		<Box>
			{loading && <Typography>Loading...</Typography>}
			{error && <Typography>{error}</Typography>}
			{data && (
				<Fragment>
					<TitleBlock id={data.name_url} recipe={data} />
					<MainBlock recipe={data} />
				</Fragment>
			)}
		</Box>
	)
}