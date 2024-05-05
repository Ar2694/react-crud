import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import LoginService from '../../api/services/LoginService';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import { FormHelperText } from '@mui/material';
import useForm, { validateAllFields, validateField } from '../../shared/hooks/useForm';
import loginForm from '../../shared/hooks/useForm/validations/loginForm';
import PageProvider, { usePageContext } from '../../contexts/PageContext';

import "./styles.css";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        Arlix Sorto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginPage() {
  const signIn = useSignIn()
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  const functions = (_page: any, _setPage: any) => ({
    onSubmit: async(form:any)=>{
      const { field } = form;
      let isFormValid = validateAllFields(field, form);

      if (!isFormValid) {
        const result =  await LoginService.login(field);

        if (result.data && result.isOk) {
          try{

            const isSignIn = signIn({
              auth: {
                token: result.token,
                type: 'Bearer'
              },
              userState: { username: result.data.username }
            })

            if (isSignIn) {
              navigate("/");
            }else{
              _setPage({ isError: true, error: "Sorry! Something went wrong..." })
            } 

          }catch(e){
            _setPage({ isError: true, error: "Sorry! Something went wrong..." })
            console.log(e);
          }
        } else {
          _setPage({ isError: true, error: "*Invalid username or password." })
        }
      } else {
        _setPage({ isError: isFormValid, error: "*Please enter the required fields." })
      }
    },
    onChange: (evt: any, form: any) => {
      const field = evt.target
      validateField(field, form)
      _setPage({ isError: false })
  }
  })

  useEffect(()=>{
    if(isAuthenticated){
      navigate("/");
    }
  },[])
  
  return (
   <PageProvider functions={functions}>
    <LoginContent />
   </PageProvider>
  );
}

function LoginContent(){
  const {functions,page} = usePageContext();
  const {onSubmit, onChange} = functions;
  const {isError, error} = page;
  const form = useForm(loginForm);
  const { field, validate } = form;

  return(
    <ThemeProvider theme={defaultTheme}>
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            {isError && <FormHelperText error>{error}</FormHelperText> }
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => onChange(e, form)}
              value={field.username}
              helperText={validate.username.isError && validate.username.message}
              error={validate.username.isError}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={field.password}
              onChange={(e) => onChange(e, form)}
              error={validate.password.isError}
              helperText={validate.password.isError && validate.password.message}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onSubmit(form)}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Create Account"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  </ThemeProvider>
  )
}