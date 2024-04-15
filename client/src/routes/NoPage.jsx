import { Link, Paper, Container } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'

export default function Home() {
	return (
		<Container component={Paper} sx={{ p: 2 }}>
			<Title>Page Not Found</Title>
			<Typography>The page you are looking for does not exist. Proceed to <Link href="/">Home</Link>?</Typography>
		</Container>
	)
}