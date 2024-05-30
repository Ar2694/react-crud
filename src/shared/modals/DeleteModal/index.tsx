import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormHelperText, Grid } from '@mui/material';
import ModalProvider, { useModalContext } from 'contexts/ModalContext';
import UserService from 'api/services/UserService';
import { usePageContext } from 'contexts/PageContext';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteModal(props: any) {
    const button = props.button ?? <DeleteIcon color="secondary"/>;
    const { functions: pageFunc } = usePageContext();
    const { getUsers } = pageFunc;

    const functions = (_state: any, _setState: any) => ({
        onDelete: async () => {
            const result = await UserService.init().deleteUser(props.id);

            if (result && result.isOk && result.data.acknowledged) {
                _setState({ isError: false })
                getUsers();
                close();
            } else {
                _setState({ isError: true, error: "Sorry! Something went wrong..." })
            }
        }
    })

    return (
        <ModalProvider functions={functions} button={button}>
            <DeleteModalContent />
        </ModalProvider>
    );
}

function DeleteModalContent() {
    const { modal, close, functions, state } = useModalContext();
    const { onDelete } = functions;

    return (
        <Modal className="delete-modal" open={modal}>
            <Box>
                <Typography id="id-id-title" gutterBottom={true}>
                    Are you sure you want to delete this user?
                </Typography>
                {state.isError && <FormHelperText id="my-helper-text" error>{state.error}</FormHelperText>}
                <Grid container direction="row" justifyContent="flex-end" columnGap={3}>
                    <Button variant="text" color="secondary" onClick={close}>Cancel</Button>
                    <Button variant="contained" onClick={onDelete}>Yes</Button>
                </Grid>
            </Box>
        </Modal>
    )
}