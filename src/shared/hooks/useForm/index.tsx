import { useState } from "react";

export default function useForm(init: any) {
    const [form, setForm] = useState({ ...init });

    return { ...form, setForm };

};

export function validateForm(_form:any) {
    const {field, validate } = _form;
    let isValid = false;
    Object.keys(validate).forEach(vKey => {
        Object.keys(field).forEach(fKey => {
            if (vKey === fKey) {
                const { isError } = validate[vKey];
                if (isError) {
                    isValid = true;
                }
            }
        });
    });

    return isValid;
}


export function validateField(_field: any, _form: any) {
    const {validate, setForm } = _form;
    const { name, value } = _field;

    Object.keys(validate).forEach(vKey => {
        const { rule, options } = validate[vKey];
        if (name === vKey) {
            if (rule instanceof Function) {
                const _isError = rule(options, value)
                setForm((prev: any) => ({
                    ...prev,
                    field: { ...prev.field, [name]: value },
                    validate: { ...prev.validate, [vKey]: { ...prev.validate[vKey], isError: _isError} }
                }));
            }
        }
    });
}

export function validateAllFields(_fields: any, _form: any) {
    const {validate, setForm } = _form;
    const fields = _fields;
    let isFormValid = false;

    Object.keys(fields).forEach(fKey => {
        Object.keys(validate).forEach(vKey => {
            const { rule, options } = validate[vKey];
            if (fKey === vKey) {
                if (rule instanceof Function) {
                    const _isError = rule(options, fields[fKey])
                    if(_isError){
                        isFormValid = true;
                    }
                    setForm((prev: any) => ({
                        ...prev,
                        field: { ...prev.field, [fKey]: fields[fKey] },
                        validate: { ...prev.validate, [vKey]: { ...prev.validate[vKey], isError: _isError} }
                    }));
                }
            }
        });
  
    });


    return isFormValid;
}