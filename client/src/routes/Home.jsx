import { Link, Paper, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'
import useAxios from 'hooks/useAxios'

export default function Home() {
	const { data, loading, error } = useAxios('/hello', 'get')

	return (
    <Container component={Paper} sx={{ p: 2 }}>
			<Title>Home</Title>
			{loading && <Typography>Loading...</Typography>}
			{error && <Typography>{error}</Typography>}
			{data && <Typography>{data.message}</Typography>}
			<Typography>Click <Link href="/recipes">here</Link> to see recipe list.</Typography>
		</Container>
	)
}