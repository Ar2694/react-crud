import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginService from 'api/services/LoginService/LoginService';
import PageProvider, { usePageContext } from "contexts/PageContext";
import FindUsername from "pages/ForgotPasswordPage/components/FindUsername";
import { compareValues, validateAllFields, validateField } from "shared/hooks/useForm";
import ResetPassword from "pages/ForgotPasswordPage/components/ResetPassword";
import ResetConfirmDialog from "shared/dialogs/ResetConfirmDialog";

import "./styles.css";


export default function ForgotPasswordPage() {

    const functions = (page: any, setPage: any) => ({
        onResetPassword: async (form: any) => {
            const { field } = form;
            let isFormValid = validateAllFields(field, form);

            if (!isFormValid) {
                const isMatch = compareValues({ password: field.password, confirmPassword: field.confirmPassword })

                if (isMatch) {

                    const result = await LoginService.init().resetPassword({ username: page.username, password: field.confirmPassword })

                    if (result.data && result.isOk) {

                        setPage({ username: field.username, isError: false, children: <ResetPassword />, dialog: <ResetConfirmDialog /> })

                    } else {
                        setPage((prev: any) => ({ ...prev, isError: true, error: "Sorry! Something went wrong..." }))
                    }

                } else {
                    setPage((prev: any) => ({ ...prev, isError: !isMatch, error: "*Password does not match!" }))
                }

            } else {
                setPage((prev: any) => ({ ...prev, isError: isFormValid, error: "*Please enter the required fields." }))
            }
        },
        onSearchUsername: async (form: any) => {
            const { field } = form;
            let isFormValid = validateAllFields(field, form);

            if (!isFormValid) {
                const result = await LoginService.init().findByUsername(field.username)

                if (result.data && result.isOk) {
                    setPage({ username: field.username, isError: false, children: <ResetPassword /> })

                } else {
                    setPage((prev: any) => ({ ...prev, isError: true, error: "Username does not exist." }))
                }
            } else {
                setPage((prev: any) => ({ ...prev, isError: isFormValid, error: "*Please enter the required fields." }))
            }
        },
        onChange: (evt: any, form: any) => {
            const field = evt.target
            validateField(field, form)
            setPage((prev: any) => ({ ...prev, isError: false }))
        }
    })
    return (
        <PageProvider functions={functions} >
            <ForgotPasswordContent />
        </PageProvider>
    )
}

export function ForgotPasswordContent() {
    const { page, setPage } = usePageContext();

    useEffect(() => {
        setPage({ children: <FindUsername /> })
    }, [])

    return (
        <Container component="main">
            <CssBaseline />
            <Box
                sx={{
                    paddingTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Forgot password?
                </Typography>

                {page.children}
                {page.dialog}

            </Box>
        </Container>
    );
}



