import { Box, Button, FormHelperText, TextField } from "@mui/material";
import useForm from "shared/hooks/useForm";
import findUsernameForm from "shared/hooks/useForm/validations/findUsernameForm";
import { usePageContext } from "contexts/PageContext";

export default function FindUsername() {
    const form = useForm(findUsernameForm);
    const { field, validate } = form;
    const { functions, page } = usePageContext();
    const { onSearchUsername, onChange } = functions;

    return (
        <Box sx={{ mt: 1 }}>
            {page.isError && <FormHelperText error>{page.error}</FormHelperText>}
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Enter your username"
                name="username"
                autoComplete="username"
                value={field.username}
                onChange={(e) => onChange(e, form)}
                error={validate.username.isError}
                helperText={validate.username.isError && validate.username.message}
            />

            <Button
                fullWidth
                variant="contained"
                onClick={() => onSearchUsername(form)}
                sx={{ mt: 3, mb: 2 }}
            >
                Find Username
            </Button>
        </Box>

    )
}