import hasLength from "shared/hooks/useForm/validators/hasLength"

const loginForm: Object = {
    field: {
        username: "",
        password: "",
    },
    validate: {
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
        }
    },

}

export default loginForm;