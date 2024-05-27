
import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "shared/themes/AppTheme/theme";

export default function AppTheme(props: any) {
  const mode = useMediaQuery('(prefers-color-scheme: dark)');
  const appTheme = useMemo(() => theme(mode), [mode]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}