import * as yup from "yup";

export interface Auth{
    username: string
    password_hash:string
}

export const yupAuth = yup.object().shape({
    username: yup.string().required('Campo obligatorio'),
    password_hash: yup.string().required('Campo obligatorio'),
})