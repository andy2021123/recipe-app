import { useAxiosImage } from 'hooks/useAxios'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { useNavigate } from 'react-router-dom'
import { Box, CardActionArea, Grid, Paper, Skeleton, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'

export default function RecipeItem({ children: { id, name, category }, xs, sm, md }) {
  const { image, loading } = useAxiosImage(`/recipe/${id}/image`)
  const navigate = useNavigate()

  const theme = useTheme()

  const openRecipe = () => {
    navigate(`/recipe/${id}`)
  }

  return (
    <Grid item xs={xs || 6} sm={sm || 4} md={md || 3}>
      <Card sx={{
        [theme.breakpoints.only('md')]: {
          maxWidth: `${Math.floor(md/12*100)}vw`
        },
        [theme.breakpoints.only('sm')]: {
          maxWidth: `${Math.floor(sm/12*100)}vw`
        },
        [theme.breakpoints.only('xs')]: {
          maxWidth: `${Math.floor(xs/12*100)}vw`
        }
      }}>
        <CardActionArea onClick={openRecipe}>
          {image ? (
            <CardMedia
              component="img"
              sx={{ width: 'inherit' }}
              src={image}
            />
          ) : loading ? (
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: '100%' }} />
            </Skeleton>
          ) : (
            <Skeleton animation={false} variant="rectangular" width="100%">
              <div style={{ paddingTop: '100%' }} />
            </Skeleton>
          )}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              bgcolor: theme.palette.common.white,
              color: theme.palette.common.black,
              pb: 2,
              pt: 2.5,
              px: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6" style={{ lineHeight: '1.2em', height: '2.4em', overflow: 'hidden' }}>{name}</Typography>
          </Box>
          <Box
            component={Paper}
            sx={{
              position: 'relative',
              width: '50%',
              transform: 'translate(50%, -220%)',
              bgcolor: theme.palette.secondary.light,
              color: theme.palette.common.white,
              p: 0.5,
              textAlign: 'center'
            }}
          >
            <Typography noWrap>{category}</Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  )
}