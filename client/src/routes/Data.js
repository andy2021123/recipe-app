import { Paper } from '@mui/material'
import Typography from '@mui/material/Typography'
import Title from 'components/Title'
import useAxios from 'hooks/useAxios'

export default function Data() {
	const { data, loading, error } = useAxios('/users', 'get')

	return (
      <Paper
				sx={{
					p: 2,
					my: 2
				}}
			>
        <Title>Data</Title>
				<Typography>{data ? JSON.stringify(data) : (loading ? 'Loading...' : (error && error))}</Typography>
      </Paper>
	)
}