import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal, blueGrey } from '@mui/material/colors';
import { HomePage } from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import RegisterPage from "./pages/RegisterPage";

import "./App.css";


const theme = createTheme({
  palette: {
    primary: teal,
    secondary: blueGrey,
  },
});

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={
            <RequireAuth fallbackPath={'/login'}>
              <HomePage />
            </RequireAuth>
          }
          />
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>


  )
}


