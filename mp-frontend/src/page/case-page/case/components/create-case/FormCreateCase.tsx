import Input from "../../../../../_util/components/Input/Input.tsx";
import Button from "../../../../../_util/components/Button/Button.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../../store/store.ts";
import {useCreateCaseMutation} from "../../../../../store/service/service/case.service.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {type Case, ypuCase} from "../../core/_models.ts";
import Alert from "../../../../../_util/components/Alert/Alert.tsx";
import {getRTKError} from "../../../../../_util/functions.ts";

export const FormCreateCase = () => {
    const [createCaseApi, createCaseApiStatus] = useCreateCaseMutation();
    const session = useSelector((state: RootState) => state.sessionSlice.user);

    const form = useForm({
        resolver: yupResolver(ypuCase),
    });

    const onClick: SubmitHandler<Case> = (value) => {
        createCaseApi({
            descripcion: value.description,
            titulo: value.name,
            fecha_creacion: new Date(),
            id_estado:1,
            id_fiscal:  session.id_fiscal,
            id_fiscalia: session.id_fiscalia
        })
    }


    return (
        <form onSubmit={form.handleSubmit(onClick)}>
            <div className={'div-gap'}>

                <div className={'div-input'}>
                    <label>
                        Titulo
                    </label>
                    <Input
                        {...form.register("name")}
                    />
                </div>

                <div className={'div-input'}>
                    <label>
                        Descripcion
                    </label>
                    <Input
                        {...form.register("description")}
                    />
                </div>

                {createCaseApiStatus.isError && (
                    <Alert message={getRTKError(createCaseApiStatus.error)} type={'danger'}></Alert>
                )}

                <Button type="submit" disabled={!form.formState.isValid || createCaseApiStatus.isLoading}>
                    {createCaseApiStatus.isLoading ? "Cargando..." : "Crear"}
                </Button>
            </div>
        </form>
    );
};