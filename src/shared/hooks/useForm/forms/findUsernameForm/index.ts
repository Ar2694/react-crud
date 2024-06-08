import hasLength from "shared/hooks/useForm/validators/hasLength"

const findUsernameForm: Object = {
    field: {
        username: "",
    },
    validate: {
        username: {
            rule: hasLength,
            options: { min: 1 },
            isError: false,
            message: "Username is required."
        },
    },
}

export default findUsernameForm;