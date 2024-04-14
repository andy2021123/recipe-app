import {
  Fragment,
  // useEffect,
  // useState
} from 'react'
import { 
  Link, 
  Outlet, 
  useLocation,
  matchPath
} from "react-router-dom"
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'


function useRouteMatch(patterns) {
  const { pathname } = useLocation()

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i]
    const possibleMatch = matchPath(pattern, pathname)
    if (possibleMatch !== null) {
      return possibleMatch
    }
  }

  return null
}

function NavTabs() {
  const routeMatch = useRouteMatch(["/", "/recipes/add", "/recipes"])
  const currentTab = routeMatch?.pattern?.path || "/recipes"

  return (
    <Tabs value={currentTab} textColor='inherit'>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Add Recipe" value="/recipes/add" to="/recipes/add" component={Link} />
      <Tab label="All Recipes" value="/recipes" to="/recipes" component={Link} />
    </Tabs>
  )
}

function TopBar({ children }) {
  return (
    <Box sx={{ flexGrow: 1, pb: 2 }}>
      <AppBar componenet="nav">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Recipe App
          </Typography>
          <NavTabs />
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        {children}
      </Container>
    </Box>
  )
}


export default function Layout() {
  return (
    <Fragment>
      <TopBar>
        <Outlet />
      </TopBar>
    </Fragment >
  )
}
