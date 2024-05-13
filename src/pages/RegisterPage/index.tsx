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
import { FormHelperText } from '@mui/material';
import PageProvider, { usePageContext } from '../../contexts/PageContext';
import useForm, { compareValues, validateAllFields, validateField } from '../../shared/hooks/useForm';
import registerForm from '../../shared/hooks/useForm/validations/registerForm';
import RegisterConfirmDialog from '../../shared/dialogs/RegisterConfirmDialog';

export default function RegisterPage() {

  const functions = (_page: any, _setPage: any) => ({
    onSubmit: async (form: any) => {
      const { field } = form;
      let isFormValid = validateAllFields(field, form);
      console.log(field, " fields")
      if (!isFormValid) {
        const isMatch = compareValues({password: field.password, confirmPassword: field.confirmPassword})
        console.log(isMatch, "isMatch passwords")
        if (isMatch) {
          const result = await LoginService.init().register(field);
          console.log(result, "result register")
          if (result.data === null && result.isOk) {

            _setPage({isError: false, dialog: <RegisterConfirmDialog /> })
          } else {
            _setPage({ isError: true, error: "Username is already taken." })
          }

      } else {
          _setPage((prev: any) => ({ ...prev, isError: !isMatch, error: "*Password does not match!" }))
      }

      } else {
        _setPage({ isError: isFormValid, error: "*Please enter the required fields." })
      }
    },
    onChange: (evt: any, form: any) => {
      const field = evt.target
      validateField(field, form);
      _setPage({ isError: false });
    }
  })

  return (
    <PageProvider functions={functions}>
      <RegisterContent />
    </PageProvider>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

function RegisterContent() {
  const { functions, page } = usePageContext();
  const form = useForm(registerForm);

  const { onSubmit, onChange } = functions;
  const { isError, error } = page;
  const { field, validate } = form;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {page.dialog}
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
          {isError && <FormHelperText error>{error}</FormHelperText>}
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
                  onChange={(e) => onChange(e, form)}
                  value={field.firstname}
                  helperText={validate.firstname.isError && validate.firstname.message}
                  error={validate.firstname.isError}
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
                  onChange={(e) => onChange(e, form)}
                  value={field.lastname}
                  helperText={validate.lastname.isError && validate.lastname.message}
                  error={validate.lastname.isError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={(e) => onChange(e, form)}
                  value={field.username}
                  helperText={validate.username.isError && validate.username.message}
                  error={validate.username.isError}
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
                  onChange={(e) => onChange(e, form)}
                  value={field.password}
                  helperText={validate.password.isError && validate.password.message}
                  error={validate.password.isError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Password"
                  type="password"
                  id="confirmPassword"
                  onChange={(e) => onChange(e, form)}
                  value={field.confirmPassword}
                  helperText={validate.confirmPassword.isError && validate.confirmPassword.message}
                  error={validate.confirmPassword.isError}
                />
              </Grid>
            </Grid>
            <Button

              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => onSubmit(form)}
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



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" >
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}