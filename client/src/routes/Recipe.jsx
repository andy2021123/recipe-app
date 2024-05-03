import { useNavigate, useParams } from 'react-router-dom'
import { Box, Divider, Grid, IconButton, Link, List, ListItem, Paper, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import useAxios, { useAxiosImage } from 'hooks/useAxios'
import { Fragment, useState } from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import api from 'hooks/useAxios/api'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

function AlertDialog({ open, onClose, onEdit, onDelete }) {
	const theme = useTheme()

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				Recipe Options
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Would you like to delete or edit the recipe?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button sx={{ color: theme.palette.grey[800] }} onClick={onClose}>Cancel</Button>
				<Button variant='contained' color='secondary' onClick={onEdit}>Edit</Button>
				<Button variant='contained' color='error' onClick={onDelete} autoFocus>Delete</Button>
			</DialogActions>
		</Dialog>
	)
}

function TitleBlock({ id, recipe: { name, description, category, url } }) {
	const theme = useTheme()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)

	const { image, loading } = useAxiosImage(`/recipe/${id}/image`)

	const editRecipe = () => {
		navigate(`/edit-recipe/${id}`)
	}

	const removeRecipe = () => {
		api.delete(`/recipe/${id}`)
			.then(() => {
				setOpen(false)
				navigate('/recipes')
			})
	}

	return (
		<Paper
			sx={{
				bgcolor: theme.palette.secondary.light,
				color: theme.palette.common.white,
				p: 2
			}}
		>
			<Grid container spacing={1} justifyContent='center' columns={48} alignItems='center'>
				<Grid item xs={48} sm={image ? 32 : 48} md={image ? 41 : 48}>
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
					<Typography pt={1} variant='h3' fontWeight='bold'>
						{name}
						<IconButton onClick={() => setOpen(true)}>
							<MoreVertIcon sx={{ color: theme.palette.common.white, fontSize: 40 }} />
						</IconButton>
						<AlertDialog open={open} onClose={() => setOpen(false)} onEdit={editRecipe} onDelete={removeRecipe} />
					</Typography>
					<Typography>{description}</Typography>
					{url && (
						<Typography>For more information, see: <Link href={url} color='inherit'>{url}</Link></Typography>
					)}
				</Grid>
				<Grid item xs>
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

export function MainBlock({ recipe: { ingredients, instructions, cook_time, prep_time, notes, keywords } }) {
	const theme = useTheme()

	return (
		<Paper sx={{ p: 2, mt: theme.getSpacing()}}>
			<Grid container spacing={2} alignItems='center' pb={1} justifyContent='center'>
				<Grid item xs='auto'>
					<AccessTimeIcon />
				</Grid>
				<Grid item xs display='flex'>
					<Typography gutterBottom>Cook Time: {cook_time ? `${cook_time} minutes` : 'N/A'}</Typography>
					<Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
					<Typography gutterBottom>Prep Time: {prep_time ? `${prep_time} minutes` : 'N/A'}</Typography>
					<Divider sx={{ mx: 1 }} orientation="vertical" flexItem />
					<Typography gutterBottom>Total Time: {cook_time && prep_time ? `${cook_time + prep_time} minutes` : 'N/A'} </Typography>
				</Grid>
			</Grid>


			<Divider />

			<SectionTitle>Ingredients</SectionTitle>
			<List sx={{ listStyle: 'circle', pl: 4 }}>
				{ingredients && ingredients.map((ingredient, index) => (
					<ListItem key={index} sx={{ display: 'list-item' }}>
						{ingredient}
					</ListItem>
				))}
			</List>

			<SectionTitle>Instructions</SectionTitle>
			<List sx={{ listStyle: 'decimal', pl: 4 }}>
				{instructions && instructions.map((instruction, index) => (
					<ListItem key={index} sx={{ display: 'list-item' }}>
						{instruction}
					</ListItem>
				))}
			</List>

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