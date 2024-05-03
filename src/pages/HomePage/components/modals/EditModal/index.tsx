import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid, TextField } from '@mui/material';
import ModalProvider, { useModalContext } from '../../../../../contexts/ModalContext';
import useForm, { validateField, validateForm } from '../../../../../shared/tools/useForm';
import editModalForm from '../../../../../shared/tools/useForm/validations/editModalForm';


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditModal(props: any) {
    const button = props.button ?? <Button variant="text" color="secondary">Edit</Button>;

    const functions = (_state: any, _setState: any) => ({
        onSubmit: (form: any) => {
            const isFormValid = validateForm(form);
            console.log(isFormValid)
            if (!isFormValid) {
                console.log("Form Submitted!")
            } else {
                console.log("Form is not valid!")
            }
        },
        onChange: (evt: any, form: any) => {
            const field = evt.target
            validateField(field, form)
        },
        users: props
    })
    return (
        <ModalProvider functions={functions} button={button}>
            <EditModalContent />
        </ModalProvider>
    )
}

export function EditModalContent() {
    const { modal, functions, toggle } = useModalContext();
    const { onChange, users, onSubmit } = functions;
    const form = useForm(editModalForm(users));
    const { field, validate } = form;

    return (
        <Modal className="modal delete-modal" open={modal}>
            <Box sx={style} >
                <Typography id="id-id-title" variant='h5' gutterBottom={true}>
                    Edit User
                </Typography>
                <FormControl fullWidth={true} className="modal-form-control">
                    <TextField
                        className="modal-text-field"
                        label="First Name"
                        variant="standard"
                        name="firstname"
                        value={field.firstname}
                        onChange={(e) => onChange(e, form)}
                        error={validate.firstname.isError}
                        helperText={validate.firstname.isError && validate.firstname.message}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Last Name"
                        variant="standard"
                        name="lastname"
                        value={field.lastname}
                        error={validate.lastname.isError}
                        helperText={validate.lastname.isError && validate.lastname.message}
                        onChange={(e) => onChange(e, form)}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Phone Number"
                        variant="standard"
                        name="phoneNumber"
                        error={validate.phoneNumber.isError}
                        helperText={validate.phoneNumber.isError && validate.phoneNumber.message}
                        value={field.phoneNumber}
                        onChange={(e) => onChange(e, form)}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Address" variant="standard"
                        name="address"
                        value={field.address}
                        error={validate.address.isError}
                        helperText={validate.address.isError && validate.address.message}
                        onChange={(e) => onChange(e, form)}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Email"
                        variant="standard"
                        name="email"
                        value={field.email}
                        error={validate.email.isError}
                        helperText={validate.email.isError && validate.email.message}
                        onChange={(e) => onChange(e, form)}
                    />
                </FormControl>
                <Grid className="modal-button-container" columnGap={3} container direction="row" justifyContent="flex-end">
                    <Button variant="text" color="secondary" onClick={toggle}>Cancel</Button>
                    <Button variant="contained" onClick={() => onSubmit(form)}>Edit</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
