import hasLength from "shared/hooks/useForm/validators/hasLength"

const resetPasswordForm = {
    field: {
        password: "",
        confirmPassword: ""
    },
    validate: {
        password: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Password is required."
        },
        confirmPassword: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Confirm password is required."
        },
    },
}

export default resetPasswordForm;