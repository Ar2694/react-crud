import { Box, Button, FormHelperText, TextField } from "@mui/material";
import useForm from "shared/hooks/useForm";
import { usePageContext } from "contexts/PageContext";
import resetPasswordForm from "shared/hooks/useForm/forms/resetPasswordForm";

export default function ResetPassword() {
    const form = useForm(resetPasswordForm);
    const { field, validate } = form;
    const { functions, page } = usePageContext();
    const { onResetPassword, onChange } = functions;

    return (
        <Box sx={{ mt: 1 }}>
            {page.isError && <FormHelperText error>{page.error}</FormHelperText>}
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Enter new password"
                type="password"
                id="password"
                autoComplete="password"
                onChange={(e) => onChange(e, form)}
                value={field.password}
                error={validate.password.isError}
                helperText={validate.password.isError && validate.password.message}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm new password"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                onChange={(e) => onChange(e, form)}
                value={field.confirmPassword}
                error={validate.confirmPassword.isError}
                helperText={validate.confirmPassword.isError && validate.confirmPassword.message}
            />

            <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => onResetPassword(form)}
            >
                Confirm
            </Button>
  
        </Box>

    )
}