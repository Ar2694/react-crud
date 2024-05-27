import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

export default function UserCreatedModal(props: any) {
    const show = props.userCreatedModal;
    const close = props.setUserCreatedModal;
    const navigate = useNavigate();

    const handleButton = () => {
        close(false);
        navigate("/login")
    }

    return (
        <Modal className="user-create-modal" open={show}>
            <Box>
                <Grid className="icon-container" container justifyContent="center">
                    <CheckCircleIcon />
                </Grid>
                <Typography className="title" gutterBottom={true}>
                    Your account has been created successfully!
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
