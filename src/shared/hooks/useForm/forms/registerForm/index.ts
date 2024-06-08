import hasLength from "shared/hooks/useForm/validators/hasLength"

const registerForm: Object = {
    field: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: ""
    },
    validate: {
        firstname: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Please enter your first name."
        },
        lastname: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Please enter your last name."
        },
        username: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Please enter your username."
        },
        password: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Please enter your password."
        },
        confirmPassword: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Please confirm your password."
        }
    },

}

export default registerForm;