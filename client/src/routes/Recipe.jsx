import { useParams } from 'react-router-dom'
import { Container, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'
import useAxios from 'hooks/useAxios'

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