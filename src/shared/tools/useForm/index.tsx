import { useState, useEffect } from "react";

export default function useForm(init: any) {
    const [form, setForm] = useState({ ...init });

useEffect(()=>{
    validateForm(form)

},[form])
    return {...form, setForm};

};


// const hasLength =()=>({ min: 2, max: 10 }, 'Name must be 2-10 characters long'),
interface HasLengthOptions {
    max?: number | any;
    min?: number | any;
}
function validateForm(form:any){
    console.log(form.validate.firstname.options,form.validate.firstname.message,form.name.firstname, "usefrom")
    console.log(form.validate.firstname.error(form.validate.firstname.options,form.validate.firstname.message,form.name.firstname), "usefrom")
}
export function hasLength(options: HasLengthOptions, _error: string, _value?:any) {
    const { max, min } = options
    let isError = false;
    const error = _error ?? null;
    let value = _value ?? "";

    if (value.length > max) {
        isError = true;
    }
    if (value.length < min) {
        isError = true;
    }


    return {
        isError: isError,
        error: error
    };

}
