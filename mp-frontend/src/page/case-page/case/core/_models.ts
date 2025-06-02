import * as yup from "yup";

export interface Case{
    name: string
    description:string
}

export const ypuCase = yup.object().shape({
    name: yup.string().required('Campo obligatorio'),
    description: yup.string().required('Campo obligatorio'),
})