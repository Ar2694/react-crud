import { useState } from "react";

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


}


export const formValidation = (users:any) => {
    const setValidation =(user:any) => ({...user})
    const keysToInclude = Object.keys(users);
    const filteredUser = Object.keys(users || {}).reduce((result: any, key) => {
        if (keysToInclude.includes(key)) {
            result[key] = users[key];
        }
        return result;
    }, {});

    console.log(filteredUser, "filteredUser")
    for (const key of Object.keys(filteredUser)) {
        if (filteredUser[key].length > 0) {
            setValidation((prev: any) => ({ ...prev, [key]: filteredUser[key] ? 1 : -1 }));
        } else {
            setValidation((prev: any) => ({ ...prev, [key]: 0 }));
        }
    }

    console.log(setValidation, "setValidation")
}