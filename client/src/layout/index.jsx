import {
  Link,
  Outlet
} from "react-router-dom"
import { useMediaQuery, useTheme } from '@mui/material'
import { Box, Container } from '@mui/material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AppLogo from 'assets/AppLogo'
import useRouteMatch from 'hooks/useRouteMatch'


function NavTabs() {
  const routeMatch = useRouteMatch(["/", "/add-recipe", "/recipes"])
  const currentTab = routeMatch?.pattern?.path || "/recipes"

  return (
    <Tabs value={currentTab} textColor='inherit'>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Add Recipe" value="/add-recipe" to="/add-recipe" component={Link} />
      <Tab label="All Recipes" value="/recipes" to="/recipes" component={Link} />
    </Tabs>
  )
}

function MobileToolbar() {
  return (
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
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} />
      <AppLogo />
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} />
    </Toolbar>
  )
}

function DesktopToolbar() {
  return (
    <Toolbar>
      <AppLogo />
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} />
      <NavTabs />
    </Toolbar>
  )
}


export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  })

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar componenet="nav">
        {isMobile ? <MobileToolbar /> : <DesktopToolbar />}
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  )
}
