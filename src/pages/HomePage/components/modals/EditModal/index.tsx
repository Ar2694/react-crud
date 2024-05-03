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
import useForm, { hasLength, validateField, validateOnSubmit } from '../../../../../shared/tools/useForm';


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


    const functions = (state: any, setState: any) => ({

        onSubmit:(e:any, editForm:any)=>{
            const {name, validate } = editForm;
            console.log(   validateOnSubmit(name, validate) , "onsubmut")
        },
        onChange: (evt: any, editForm: any) => {
            const field = evt.target
            const {validate, setForm } = editForm;

    
            validateField(field, validate, setForm)
            // console.log(editForm, "onchec")

   

            // console.log(state, "test me")
        },

        editUser: () => {
            console.log(props)
        },
        setUser: () => {
            setState(props);
        },
        users: props
    })
    return (
        <ModalProvider functions={functions} button={button}>
            <EditModalContent />
        </ModalProvider>
    )
}

export function EditModalContent(props: any) {
    const { modal, state, functions, toggle } = useModalContext();
    const {onChange, users, onSubmit } = functions;

    const editForm = useForm({
        name: { ...users },
        validate: {
            firstname: {
                rule: hasLength,
                options: { min: 1 },
                isError: false,
                message: "First name is required."
            },
            lastname: {
                rule: hasLength,
                options: { min: 1 },
                isError: false,
                message: "Last name is required."
            },
            phoneNumber: {
                rule: hasLength,
                options: { min: 1 },
                isError: false,
                message: "Phone number is required."
            },
            address: {
                rule: hasLength,
                options: { min: 1 },
                isError: false,
                message: "Address is required"
            },
            email: {
                rule: hasLength,
                options: { min: 1 },
                isError: false,
                message: "Email is required"
            },
        },
    });

    const { name, validate } = editForm;

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
                        value={name.firstname}

                        onChange={(e) => { onChange(e, editForm) }}
                        error={validate.firstname.isError}
                        helperText={validate.firstname.isError && validate.firstname.message}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Last Name"
                        variant="standard"
                        name="lastname"
                        value={name.lastname}
                        error={validate.lastname.isError}
                        helperText={validate.lastname.isError&& validate.lastname.message}
                        onChange={(e) => { onChange(e, editForm) }}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Phone Number"
                        variant="standard"
                        name="phoneNumber"
                        error={validate.phoneNumber.isError}
                        helperText={validate.phoneNumber.isError && validate.phoneNumber.message}
                        value={name.phoneNumber}
                        onChange={(e) => { onChange(e, editForm) }}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Address" variant="standard"
                        name="address"
                        value={name.address}
                        error={validate.address.isError}
                        helperText={validate.address.isError && validate.address.message}
                        onChange={(e) => { onChange(e, editForm) }}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Email"
                        variant="standard"
                        name="email"
                        value={name.email}
                        error={validate.email.isError}
                        helperText={validate.email.isError && validate.email.message}
                        onChange={(e) => { onChange(e, editForm) }}
                    />
                </FormControl>
                <Grid className="modal-button-container" columnGap={3} container direction="row" justifyContent="flex-end">
                    <Button variant="text" color="secondary" onClick={toggle}>Cancel</Button>
                    <Button variant="contained" onClick={(e) => { onSubmit(e, editForm) }}>Edit</Button>
                </Grid>
            </Box>
        </Modal>

    );
}
