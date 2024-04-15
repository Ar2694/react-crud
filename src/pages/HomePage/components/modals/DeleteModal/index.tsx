import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { useUsersContext } from '../../../../../contexts/UsersContext';

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

export default function DeleteModal(props: any) {
    const { deteteUser } = useUsersContext();
    const { id, show, setUpdate } = props.deleteModal;
    const setDeleteModal = props.setDeleteModal;

    const handleDelete = () => {
        deteteUser(id);
        setUpdate((prev:any) => !prev);
        setDeleteModal({
            show: !show
        });
    }
    const handleCancel = () => {
        setDeleteModal({
            show: !show
        });
    }
    
    return (
        <Modal className="delete-modal" open={show}>
            <Box sx={style}>
                <Typography id="id-id-title" gutterBottom={true}>
                    Are you sure you want to delete this user?
                </Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    columnGap={3}
                >
                    <Button variant="text" color="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handleDelete}>Yes</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
