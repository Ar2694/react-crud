import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import "./styles.css";

import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute' as 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ResetConfirmModal(props: any) {
    const show = props.resetConfirmModal;
    const close = props.setResetConfirmModal;
    const navigate = useNavigate();

    const handleButton = () => {
        close(false);
        navigate("/login")
    }

    return (
        <Modal className="user-create-modal" open={show}>
            <Box sx={style}>
                <Grid className="icon-container" container justifyContent="center">
                    <CheckCircleIcon />
                </Grid>
                <Typography className="title" gutterBottom={true}>
                    Your password has reset successfully!
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    columnGap={3}
                >
                    <Button variant="contained" onClick={handleButton}>Go to login</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
