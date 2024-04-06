import { Link, Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'
import useAxios from 'hooks/useAxios'

export default function Home() {
	const { data, loading, error } = useAxios('/hello', 'get')

	return (
      <Paper
				sx={{
					p: 2,
					my: 2
				}}
			>
        <Title>Home</Title>
				<Typography>{data ? data.message : (loading ? 'Loading...' : (error && error))}</Typography>
				<Typography>Click <Link href="/data">here</Link> to see example data from the database.</Typography>
      </Paper>
	)
}