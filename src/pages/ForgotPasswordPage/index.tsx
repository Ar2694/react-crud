import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginService from '../../api/services/LoginService';

import "./styles.css";
import { FormHelperText } from "@mui/material";
import ResetConfirmModal from "./components/ResetConfirmModal";


const defaultTheme = createTheme();

export default function ForgotPasswordPage() {
    const [user, setUser] = useState({ isFound: false, username: "" });
    const [usernameError, setUsernameError] = useState(false);


    const checkUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginInfo = {
            username: data.get('username') as string,
        }

        await LoginService.findByUsername(loginInfo.username).then((res) => {
            if (res) {
                setUsernameError(false);
                setUser({ isFound: true, username: res.username })
            } else {
                setUsernameError(true);
            }
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
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
                    {!user.isFound ? <FindUsername checkUser={checkUser} usernameError={usernameError} /> : null}
                    {user.isFound ? <EnterNewPassword user={user} /> : null}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

function FindUsername({ usernameError, checkUser }: any) {
    return (
        <Box component="form" className="find-username" onSubmit={checkUser} noValidate sx={{ mt: 1 }}>
            {usernameError ? <FormHelperText error>Invalid username</FormHelperText> : null}
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Enter your username"
                name="username"
                autoComplete="username"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Find Username
            </Button>
        </Box>

    )
}

function EnterNewPassword(props: any) {
    const initPass = {
        newPass: "",
        confirmPass: ""
    }

    const initValid = {
        newPass: -1,
        confirmPass: -1,

    }
    const [newPass, setNewPass] = useState(initPass);
    const [validation, setValidation] = useState(initValid);
    const [isMatch, setIsMatch] = useState(false);
    const [resetConfirmModal, setResetConfirmModal] = useState(false);

    const handleForm = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value.trim().length > 0) {
            setValidation((prev) => ({ ...prev, [name]: value ? 1 : -1 }));
        } else {
            setValidation((prev) => ({ ...prev, [name]: 0 }));
        }
        setNewPass((values: any) => ({ ...values, [name]: value }))
    }

    const handleReset = (e: any) => {
        e.preventDefault();
        verifyAll();
    }

    const verifyAll = async () => {

        for (const [name, value] of Object.entries(validation)) {
            if (value === -1) {
                setValidation((prev) => ({ ...prev, [name]: value ? 0 : -1 }));
            }
        }

        console.log(newPass.newPass === newPass.confirmPass)
        console.log(Object.values(validation).every((value) => value === 1))
        if (Object.values(validation).every((value) => value === 1)) {
          
            if (newPass.newPass === newPass.confirmPass) {
               
                const userInfo = {
                    username: props.user.username,
                    password: newPass.newPass
                }
                console.log("validatefdd",newPass)
               LoginService.resetPassword(userInfo);
       
                setIsMatch(false);
                setResetConfirmModal(true);
                console.log("validated here",newPass)

            } else {
                setIsMatch(true);
                console.log("not validated")
            }
        }else{
            console.log("broken")
        }
    }

    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            {isMatch ? <FormHelperText error>Password does not match!</FormHelperText> : null}
            <TextField
                margin="normal"
                required
                fullWidth
                name="newPass"
                label="Enter new password"
                type="password"
                id="newPass"
                autoComplete="new-password"
                onChange={handleForm}
                error={validation["newPass"] === 0}
                helperText={validation["newPass"] === 0 ? "Password required" : ""}
            />

            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPass"
                label="Confirm password"
                type="password"
                id="confirmPass"
                autoComplete="confirmPass"
                onChange={handleForm}
                error={validation["confirmPass"] === 0}
                helperText={validation["confirmPass"] === 0 ? "Confirm password required" : ""}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleReset}
            >
                Confirm
            </Button>
            <ResetConfirmModal resetConfirmModal={resetConfirmModal} setResetConfirmModal={setResetConfirmModal} />
        </Box>

    )
}