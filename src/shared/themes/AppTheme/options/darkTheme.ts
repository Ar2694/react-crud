import { ThemeOptions } from "@mui/material/styles";

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#6388c2',
    },
    secondary: {
      main: '#C29E63',
    },
    background: {
      default: '#0f1214',
      paper: '#0f1214',
    },
    error: {
      main: '#e57373',
    },
    warning: {
      main: '#ffb74d',
    },
    info: {
      main: '#4fc3f7',
    },
    success: {
      main: '#81c784',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
};


export default darkTheme;