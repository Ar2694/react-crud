import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import "./App.css";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";


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

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={ <HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}


