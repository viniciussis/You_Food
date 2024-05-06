import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import { Link as RouterLink, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography flexGrow={1} variant="h6">
              You Food Admin
            </Typography>
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Link component={RouterLink} to="/admin/restaurantes/">
                <Button color="primary" variant="contained">
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo/">
                <Button color="primary" variant="contained">
                  Novo Restaurante
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="xl" sx={{ margin: '1rem 0' }}>
          <Outlet />
        </Container>
      </Box>
    </>
  )
}

export default AdminLayout
