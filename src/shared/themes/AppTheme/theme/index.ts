import { createTheme } from "@mui/material";
import components from "shared/themes/AppTheme/theme/options/components";
import typography from "shared/themes/AppTheme/theme/options/typography";
import { light, dark } from "shared/themes/AppTheme/theme/options/palette";

const theme = (mode: boolean) => {
    const palette = mode ? dark : light;

    return createTheme({
        ...components,
        ...typography,
        ...palette
    })
};

export default theme;