import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginService from '../../api/services/LoginService';

const initUser = {
  firstname: "",
  lastname: "",
  username: "",
  password: ""
}

const initValidation = {

  firstname: -1,
  lastname: -1,
  username: -1,
  password: -1,

}

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RegisterPage() {
  const [newUser, setNewUser] = useState(initUser);
  const [validation, setValidation] = useState(initValidation);

  const handleForm = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (value.trim().length > 0) {
        setValidation((prev) => ({ ...prev, [name]: value ? 1 : -1 }));
    } else {
        setValidation((prev) => ({ ...prev, [name]: 0 }));
    }
    setNewUser((values: any) => ({ ...values, [name]: value }))
}

  const handleSubmit = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    e.preventDefault();

    if (value.trim().length > 0) {
        setValidation((prev) => ({ ...prev, [name]: value ? 1 : -1 }));
    } else {
        setValidation((prev) => ({ ...prev, [name]: 0 }));
    }
    setNewUser((values: any) => ({ ...values, [name]: value }))
}

const handleCreate = () => {
  verifyAll();
}



const verifyAll = async() => {
  for (const [name, value] of Object.entries(validation)) {
      if (value === -1) {
          setValidation((prev) => ({ ...prev, [name]: value ? 0 : -1 }));
      }
  }
  if (Object.values(validation).some((value) => value !== 1)) {
      // TODO: if there is invalid value, do something here.
      console.log("error");
  } else {
      // if pass send data.
      setNewUser(initUser);
      setValidation(initValidation);
      await LoginService.register(newUser);
      console.log(newUser);
  }
}



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={newUser.firstname}
                  onChange={handleForm}
                  error={validation["firstname"] === 0}
                  helperText={validation["firstname"] === 0 ? "First name is required." : ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleForm}
                  value={newUser.lastname}
                  error={validation["lastname"] === 0}
                  helperText={validation["lastname"] === 0 ? "Last name is required." : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  value={newUser.username}
                  autoComplete="username"
                  onChange={handleForm}
                  error={validation["username"] === 0}
                  helperText={validation["username"] === 0 ? "Username is required." : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={newUser.password}
                  autoComplete="new-password"
                  onChange={handleForm}
                  error={validation["password"] === 0}
                  helperText={validation["password"] === 0 ? "Password is required." : ""}
                />
              </Grid>
            </Grid>
            <Button
      
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleCreate}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}