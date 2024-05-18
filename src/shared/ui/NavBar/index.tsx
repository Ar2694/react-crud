import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Login } from 'interfaces/LoginInterface';
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function Navbar() {
  const auth = useAuthUser<Login>();
  const username = auth?.username;
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const logout = () => {
    signOut();
    navigate('/login')
  }

  const login = () =>{
    navigate('/login');
  }
  return (
    <Box sx={{ flexGrow: 1 }} className="nav-bar">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React CRUD
          </Typography>
          {isAuthenticated
            ?
            <>
              <Typography className="welcome-message" sx={{ flexGrow: 1 }}>Welcome, {username}!</Typography>
              <Link component="button" underline="none" onClick={logout} color="inherit">Log Out</Link>
            </>
            :  <Link component="button" underline="none" onClick={login} color="inherit">Login</Link>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}