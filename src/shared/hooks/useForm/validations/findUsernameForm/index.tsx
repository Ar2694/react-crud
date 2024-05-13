import hasLength from "../../validators/hasLength"

const findUsernameForm = {
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