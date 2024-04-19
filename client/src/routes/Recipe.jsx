import { useParams } from 'react-router-dom'
import { Container, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'
import useAxios from 'hooks/useAxios'

function TitleBlock({ name }) {
	const theme = useTheme()

	return (
		<Paper
			sx={{
				bgcolor: theme.palette.secondary.light,
				color: theme.palette.common.white,
				p: 2
			}}
		>
			<Typography variant='h5' fontWeight='bold' sx={{ pb: 1 }}>{name}</Typography>
		</Paper>
	)
}

// Title Block (name, category, description, picture)

// Two-Column (one-column if small screen) ingredients and instructions

// Notes, nutrition facts, keywords underneath in single column


export default function Recipe() {
	const { id } = useParams()
	const { data, loading, error } = useAxios(`/recipe/${id}`, 'get')

	return (
		<Container component={Paper} sx={{ p: 2 }}>
			<Title>Recipe</Title>
			{loading && <Typography>Loading...</Typography>}
			{error && <Typography>{error}</Typography>}
			{data && <pre>{JSON.stringify(data, null, 2)}</pre>}
		</Container>
	)
}