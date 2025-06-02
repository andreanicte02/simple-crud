import * as yup from "yup";

export interface Case{
    name: string
    description:string
}

export const ypuCase = yup.object().shape({
    name: yup.string().required('Campo obligatorio'),
    description: yup.string().required('Campo obligatorio'),
})

export interface CaseEdit{
    name: string
    description:string
    status: string
    id_fiscalia: string
    id_fiscal: string
}

export const yupCaseEdit = yup.object().shape({
    name: yup.string().required('Campo obligatorio'),
    description: yup.string().required('Campo obligatorio'),
    status: yup.string().required('Campo obligatorio'),
    id_fiscalia:  yup.string().required('Campo obligatorio'),
    id_fiscal:   yup.string().required('Campo obligatorio'),
})