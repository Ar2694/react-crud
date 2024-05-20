import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import darkTheme from "shared/themes/AppTheme/options/darkTheme";
import lightTheme from "shared/themes/AppTheme/options/lightTheme";

import "fonts.css";

export default function AppTheme(props:any){
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const appTheme = useMemo(()=> createTheme(prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

  return(
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}