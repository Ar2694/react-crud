import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import HomePage  from "pages/HomePage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import ForgotPasswordPage from "pages/ForgotPasswordPage";

import "App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: '#006064'
    },
    secondary: {
      main: blueGrey[500]
    },
  },
});


const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
});

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot" element={<ForgotPasswordPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </ThemeProvider>
  )
}


