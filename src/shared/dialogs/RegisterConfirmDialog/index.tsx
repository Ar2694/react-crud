import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Dialog, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import DialogProvider, { useDialogContext } from '../../../contexts/DialogContext';

import "./styles.css";

const style = {
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function RegisterConfirmDialog() {
    const navigate = useNavigate();

    const functions = (_state: any, _setState: any) => ({
        onLogin: () => {
            navigate("/login")
        }
    })

    return (
        <DialogProvider functions={functions} >
            <RegisterConfirmContent />
        </DialogProvider>
    );
}

function RegisterConfirmContent() {
    const { dialog, functions } = useDialogContext();
    const { onLogin } = functions;

    return (
        <Dialog className="register-confirm-dialog" open={dialog}>
            <Box sx={style}>
                <Grid className="icon-container" container justifyContent="center">
                    <CheckCircleIcon />
                </Grid>
                <Typography className="title" gutterBottom={true}>
                    User created successfully!
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    columnGap={3}
                >
                    <Button variant="contained" onClick={onLogin}>Go to login</Button>
                </Grid>
            </Box>
        </Dialog>

    );
}
