import {
  Outlet,
  Link
} from "react-router-dom"
import { Drawer, List, ListItem, useMediaQuery, useTheme } from '@mui/material'
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
import { Fragment, useState } from "react"
import CloseIcon from '@mui/icons-material/Close'

function MobileToolbar() {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  return (
    <Toolbar disableGutters sx={{ px: 2 }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
        <Box sx={{ width: 'auto', p: 3 }} role="presentation">
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <List disablePadding>
            <ListItem onClick={toggleDrawer(false)} to="/" component={Link}>Home</ListItem>
            <ListItem onClick={toggleDrawer(false)} to="/add-recipe" component={Link}>Add Recipe</ListItem>
            <ListItem onClick={toggleDrawer(false)} to="/add-domain" component={Link}>Add Domain</ListItem>
            <ListItem onClick={toggleDrawer(false)} to="/recipes" component={Link}>All Recipes</ListItem>
          </List>
        </Box>
      </Drawer>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} />
      <AppLogo isMobile={true} />
      <Typography pl={4} variant="h4" component="div" sx={{ flexGrow: 1 }} />
    </Toolbar>
  )
}

function DesktopToolbar() {
  const routeMatch = useRouteMatch(["/", "/add-recipe", "/add-domain", "/recipes"])
  const currentTab = routeMatch?.pattern?.path || "/recipes"

  return (
    <Toolbar disableGutters sx={{ px: 2 }}>
      <AppLogo />
      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} />
      <Tabs value={currentTab} textColor='inherit'>
        <Tab label="Home" value="/" to="/" component={Link} />
        <Tab label="Add Recipe" value="/add-recipe" to="/add-recipe" component={Link} />
        <Tab label="Add Domain" value="/add-domain" to="/add-domain" component={Link} />
        <Tab label="All Recipes" value="/recipes" to="/recipes" component={Link} />
      </Tabs>
    </Toolbar>
  )
}


export default function Layout() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    defaultMatches: true
  })

  return (
    <Fragment>

      {/* Toolbar */}
      <Box sx={{ display: 'flex' }}>
        <AppBar componenet="nav">
          <Container disableGutters maxWidth="lg">
            {isMobile ? <MobileToolbar /> : <DesktopToolbar />}
          </Container>
        </AppBar>

        {/* Main Container */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
          }}
        >
          <Toolbar />
          <Container
            disableGutters
            maxWidth="lg"
            sx={{
              p: isMobile ? 1 : 2,
              pb: isMobile ? 3 : 4
            }}
          >
            <Outlet />
          </Container>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: theme.palette.secondary.main
        }}
      >
        <Container
          disableGutters
          maxWidth="lg"
          sx={{
            px: 2,
            height: 16,
            color: theme.palette.common.white
          }}
        >
        </Container>
      </Box>
    </Fragment>
  )
}
