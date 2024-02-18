import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { teal, blueGrey } from '@mui/material/colors';
import { HomePage } from "./pages/HomePage";

import "./App.css";
import LoginPage from "./pages/LoginPage";

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
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>


  )
}


