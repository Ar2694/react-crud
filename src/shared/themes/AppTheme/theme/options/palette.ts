import { ThemeOptions } from "@mui/material/styles";

// Dark theme
const dark: ThemeOptions = {
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
};

// Light theme
const light: ThemeOptions = {
  palette: {
    mode: "light",
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
};


export {
  light,
  dark
}