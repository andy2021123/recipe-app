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
    <Toolbar disableGutters sx={{ px: 2 }}>
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
    <Toolbar disableGutters sx={{ px: 2 }}>
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
        <Container disableGutters maxWidth="lg">
          {isMobile ? <MobileToolbar /> : <DesktopToolbar />}
        </Container>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Container disableGutters maxWidth="lg" sx={{ p: 2, minHeight: 1200 }}>
          <Outlet />
        </Container>
        <Box
          sx={{
            bgcolor: theme.palette.secondary.main
          }}
        >
          <Container
            disableGutters
            maxWidth="lg"
            sx={{
              mt: 2,
              p: 2,
              height: 200,
              color: theme.palette.common.white
            }}
          >
            <Typography variant="h5" pt={2}>Contact Information</Typography>
          </Container>
        </Box>
      </Box>
    </Box>
  )
}
