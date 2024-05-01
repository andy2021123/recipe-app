import { useTheme } from '@mui/material/styles'
import { SvgIcon, Typography } from "@mui/material"
import { Fragment } from 'react'

export default function AppLogo({ isMobile }) {
  const theme = useTheme()

  return (
    <Fragment>
      <SvgIcon fontSize='large'>
        <svg
          fill={theme.palette.grey[200]}
          stroke={theme.palette.grey[100]}
          width="800px"
          height="800px"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.011,5.743A3.106,3.106,0,0,1,5.155,3h8.69a3.106,3.106,0,0,1,3.144,2.743A2.989,2.989,0,0,1,15,8.816V19a2,2,0,0,1-2,2H6a2,2,0,0,1-2-2V8.816A2.989,2.989,0,0,1,2.011,5.743ZM20,19V8.816a2.989,2.989,0,0,0,1.989-3.073A3.106,3.106,0,0,0,18.845,3h-3a3.106,3.106,0,0,1,3.144,2.743A2.989,2.989,0,0,1,17,8.816V19a2,2,0,0,1-2,2h3A2,2,0,0,0,20,19Z" />
        </svg>
      </SvgIcon>
      {isMobile ? (
        <Typography variant='h6' color={theme.palette.grey[100]} fontWeight='bold' pl={1}>TWIZZ'S COOKBOOK</Typography>
      ) : (
        <Typography variant='h4' color={theme.palette.grey[100]} fontWeight='bold' pl={1}>TWIZZ'S COOKBOOK</Typography>
      )}
    </Fragment>
  )
}