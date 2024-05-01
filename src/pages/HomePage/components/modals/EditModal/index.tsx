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
import useForm, { hasLength } from '../../../../../shared/tools/useForm';


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

        onChange: (evt:any, form:any)=>{
            const name=evt.target.name;
            const value = evt.target.value;
    
            form.setForm((prev: any) => ({ ...prev, name:{...prev.name, [name]: value}}));

            console.log(evt.target.value)

            console.log(state, "test me")
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
    const { setUser, editUser, onChange, users } = functions;

    const editForm = useForm({
        name: {...users},
        validate: {
            firstname: {
                error:hasLength,
                options: { min: 2, max: 10 }, 
                message: 'Name must be 2-10 characters long'
            },
            lastname: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
            phoneNumber: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
            address: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
            email: hasLength({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
        },
      });

      const {name} = editForm;
      console.log(editForm, "name")
      


    // console.log(editForm, state,"edit")
    const { page } = usePageContext();


    const [validation, setValidation] = useState(initValidation);
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
                     
                        onChange={(e)=>{onChange(e,editForm)}}
                        error={validation["firstname"] === 0}
                        helperText={validation["firstname"] === 0 ? "First Name is required" : ""}
                    />
                    <TextField
                        className="modal-text-field"
                        label="Last Name"
                        variant="standard"
                        name="lastname"
                        value={name.lastname || ""}
                        error={validation["lastname"] === 0}
                        helperText={validation["lastname"] === 0 ? "Last Name is required" : ""}
                        onChange={(e)=>{onChange(e,editForm)}}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Phone Number"
                        variant="standard"
                        name="phoneNumber"
                        error={validation["phoneNumber"] === 0}
                        helperText={validation["phoneNumber"] === 0 ? "Phone number is required" : ""}
                        value={name.phoneNumber || ""}
                        onChange={(e)=>{onChange(e,editForm)}}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Address" variant="standard"
                        name="address"
                        value={name.address || ""}
                        error={validation["address"] === 0}
                        helperText={validation["address"] === 0 ? "Address is required" : ""}
                        onChange={(e)=>{onChange(e,editForm)}}
                    />
                    <TextField

                        className="modal-text-field"
                        label="Email"
                        variant="standard"
                        name="email"
                        value={name.email || ""}
                        error={validation["email"] === 0}
                        helperText={validation["email"] === 0 ? "Email is required" : ""}
                        onChange={(e)=>{onChange(e,editForm)}}
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
