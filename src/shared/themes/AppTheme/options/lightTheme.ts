import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0d46a1',
    },
    secondary: {
      main: '#a1680d',
    },
    background: {
      default: '#eeeeee',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
};

export default lightTheme;