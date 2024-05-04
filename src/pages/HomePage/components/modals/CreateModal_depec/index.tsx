import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useUsersContext } from '../../../../../contexts/UsersContext';

import "../styles.css";


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

const initUser = {
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    email: ""
}
const initValidation = {
    firstname: -1,
    lastname: -1,
    phoneNumber: -1,
    address: -1,
    email: -1
}

export default function CreateModal_depec(props: any) {
    const { createUser } = useUsersContext();
    const [newUser, setNewUser] = useState(initUser);
    const [validation, setValidation] = useState(initValidation);
    const show = props.createModal;
    const setCreateModal = props.setCreateModal;

    const handleForm = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        if (value.trim().length > 0) {
            setValidation((prev) => ({ ...prev, [name]: value ? 1 : -1 }));
        } else {
            setValidation((prev) => ({ ...prev, [name]: 0 }));
        }
        setNewUser((values: any) => ({ ...values, [name]: value }))
    }
    const handleCreate = () => {
        verifyAll();
    }

    const handleCancel = () => {
        setCreateModal(!show);
        setNewUser(initUser);
        setValidation(initValidation);
    }

    const verifyAll = () => {
        for (const [name, value] of Object.entries(validation)) {
            if (value === -1) {
                setValidation((prev) => ({ ...prev, [name]: value ? 0 : -1 }));
            }
        }
        if (Object.values(validation).some((value) => value !== 1)) {
            // TODO: if there is invalid value, do something here.

        } else {
            // if pass send data.
            createUser(newUser);
            setNewUser(initUser);
            setValidation(initValidation);
            setCreateModal(!show);
        }
    }

    return (
        <Modal className="modal delete-modal" open={show}>
            <Box sx={style} >
                <Typography id="id-id-title" variant='h5' gutterBottom={true}>
                    Create A User
                </Typography>
                <FormControl fullWidth={true} className="modal-form-control">

                    <TextField
                        className="modal-text-field"
                        label="First Name"
                        variant="standard"
                        name="firstname"
                        value={newUser.firstname}
                        onChange={handleForm}
                        error={validation["firstname"] === 0}
                        helperText={validation["firstname"] === 0 ? "First Name is required" : ""}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Last Name"
                        variant="standard"
                        name="lastname"
                        value={newUser.lastname}
                        error={validation["lastname"] === 0}
                        helperText={validation["lastname"] === 0 ? "Last Name is required" : ""}
                        onChange={handleForm}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Phone Number"
                        variant="standard"
                        name="phoneNumber"
                        error={validation["phoneNumber"] === 0}
                        helperText={validation["phoneNumber"] === 0 ? "Phone number is required" : ""}
                        value={newUser.phoneNumber}

                        onChange={handleForm}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Address" variant="standard"
                        name="address"
                        value={newUser.address}
                        error={validation["address"] === 0}
                        helperText={validation["address"] === 0 ? "Address is required" : ""}
                        onChange={handleForm}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Email"
                        variant="standard"
                        name="email"
                        value={newUser.email}
                        error={validation["email"] === 0}
                        helperText={validation["email"] === 0 ? "Email is required" : ""}
                        onChange={handleForm}
                    />
                </FormControl>
                <Grid className="modal-button-container" columnGap={3} container direction="row" justifyContent="flex-end">
                    <Button variant="text" color="secondary" onClick={handleCancel}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreate}>Create</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
