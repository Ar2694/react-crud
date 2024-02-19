import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { Login } from '../../interfaces/LoginInterface';
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const auth = useAuthUser<Login>();
  const username = auth?.username;
  const signOut = useSignOut();
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    navigate('/login')
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {username
            ?
            <Button
              component="a"
              onClick={logout}
              color="inherit"
            >
              Log Out
            </Button>
            : <Button
              component="a"
              href="/login"
              color="inherit"
            >
              Login
            </Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}