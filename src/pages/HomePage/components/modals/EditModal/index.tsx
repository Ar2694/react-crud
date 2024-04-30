import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, Grid, TextField } from '@mui/material';
import { useUsersContext } from '../../../../../contexts/UsersContext';
import { User } from '../../../../../interfaces/UserInterface';
import ModalProvider, { useModalContext } from '../../../../../contexts/ModalContext';
import { usePageContext } from '../../../../../contexts/PageContext';


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

const initUser: any = {
    _id: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    email: ""
}

const initValidation: any = {
    _id: -1,
    firstname: -1,
    lastname: -1,
    phoneNumber: -1,
    address: -1,
    email: -1
}

export default function EditModal(props: any) {
    const button = props.button ?? <Button variant="text" color="secondary">Edit</Button>;
    
    const functions = (state: any, setState: any) => ({
        editUser: () => {
            console.log(props)
        },
        getUser: () => {
            console.log("test me")
        }
    })
    return (
        <ModalProvider functions={functions} button={button}>
            <EditModalContent />
        </ModalProvider>
    )
}

export function EditModalContent(props: any) {
    const { modal, functions, toggle } = useModalContext();
    const { getUser, editUser } = functions;
    console.log(useModalContext(), "edit")
    const { page } = usePageContext();
    const { user } = page ?? {}
    const { updateUser } = useUsersContext();
    const setEditModal = props.setEditModal;
    const [validation, setValidation] = useState(initValidation);
    const [form, setForm] = useState(initUser);

    const initForm = () => {
        const keysToInclude = Object.keys(initUser);
        const filteredUser = Object.keys(user || {}).reduce((result: any, key) => {
            if (keysToInclude.includes(key)) {
                result[key] = user[key];
            }
            return result;
        }, {});

        for (const key of Object.keys(filteredUser)) {
            if (filteredUser[key].length > 0) {
                setValidation((prev: any) => ({ ...prev, [key]: filteredUser[key] ? 1 : -1 }));
            } else {
                setValidation((prev: any) => ({ ...prev, [key]: 0 }));
            }
        }
        setForm(filteredUser)
    }

    const handleForm = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;

        if (value.trim().length > 0) {
            setValidation((prev: any) => ({ ...prev, [name]: value ? 1 : -1 }));
        } else {
            setValidation((prev: any) => ({ ...prev, [name]: 0 }));
        }

        setForm((values: any) => ({ ...values, [name]: value }));
    }

    const handleEdit = () => {
        verifySubmitEdit();
    }

    const handleCancel = () => {
        setEditModal({

            user: "",

        });
        setForm(initUser);
        setValidation(initValidation);
    }

    const verifySubmitEdit = () => {

        for (const [name, value] of Object.entries(validation)) {
            if (value === -1) {
                setValidation((prev: any) => ({ ...prev, [name]: value ? 0 : -1 }));
            }
        }
        if (Object.values(validation).some((value) => value !== 1)) {
            // TODO: if there is invalid value, do something.

        } else {
            updateUser(form);
            setForm(initUser);
            setValidation(initValidation);

        }
    }

    useEffect(() => {
        initForm();
    }, [])
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
                        value={form.firstname || ""}
                        onChange={handleForm}
                        error={validation["firstname"] === 0}
                        helperText={validation["firstname"] === 0 ? "First Name is required" : ""}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Last Name"
                        variant="standard"
                        name="lastname"
                        value={form.lastname || ""}
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
                        value={form.phoneNumber || ""}
                        onChange={handleForm}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Address" variant="standard"
                        name="address"
                        value={form.address || ""}
                        error={validation["address"] === 0}
                        helperText={validation["address"] === 0 ? "Address is required" : ""}
                        onChange={handleForm}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Email"
                        variant="standard"
                        name="email"
                        value={form.email || ""}
                        error={validation["email"] === 0}
                        helperText={validation["email"] === 0 ? "Email is required" : ""}
                        onChange={handleForm}
                    />
                </FormControl>
                <Grid className="modal-button-container" columnGap={3} container direction="row" justifyContent="flex-end">
                    <Button variant="text" color="secondary" onClick={toggle}>Cancel</Button>
                    <Button variant="contained" onClick={editUser}>Edit</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
