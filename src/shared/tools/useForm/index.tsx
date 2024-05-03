import { useState } from "react";

export default function useForm(init: any) {
    const [form, setForm] = useState({ ...init });

    return { ...form, setForm };

};

export function validateOnSubmit(name: any, validate: any) {
    let isValid = false;

    Object.keys(validate).forEach(vKey => {
        Object.keys(name).forEach(nKey => {
            if (vKey === nKey) {
                const { isError } = validate[vKey];
                if (isError) {
                    isValid = true;
                }
            }

        });

    });


    return isValid;
}


export function validateField(_field: any, _validate: any, setForm: any) {
    const { name, value } = _field;
    const validate = _validate;

    Object.keys(validate).forEach(vKey => {
        const { rule, options, message } = validate[vKey];
        if (name === vKey) {
            if (rule instanceof Function) {
                const _isError = rule(options, value)
                setForm((prev: any) => ({
                    ...prev,
                    name: { ...prev.name, [name]: value },
                    validate: { ...prev.validate, [vKey]: { rule, options, isError: _isError, message: message } }
                }));
            }
        }
    });
}

export function hasLength(options: any, _value: any) {
    const { max, min } = options;
    let isError = false;
    let value = _value;

    if (typeof max === 'number' && value.length > max) {
        isError = true;
    }

    if (value.length < min) {
        isError = true;
    }

    return isError;

}
