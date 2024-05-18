import hasLength from "shared/hooks/useForm/validators/hasLength"

const createModalForm = {
    field: {
        firstname: "",
        lastname: "",
        phoneNumber: "",
        address: "",
        email: ""
    },
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
            message: "Address is required."
        },
        email: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Email is required."
        },
    },

}

export default createModalForm;