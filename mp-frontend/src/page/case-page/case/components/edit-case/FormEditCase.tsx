import {useSelector} from "react-redux";
import type {RootState} from "../../../../../store/store.ts";
import {type SubmitHandler, useForm, useWatch} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../../../../../_util/components/Input/Input.tsx";
import Button from "../../../../../_util/components/Button/Button.tsx";
import {yupCaseEdit, type CaseEdit} from "../../core/_models.ts";
import {useGetCaseStatusQuery} from "../../../../../store/service/service/statusCase.service.ts";
import {useUpdateCaseMutation} from "../../../../../store/service/service/case.service.ts";
import {
    useListFiscalMutation,
    useListProsecutorOfficeQuery
} from "../../../../../store/service/service/prosecutorOffice.service.ts";
import {useEffect} from "react";
import Alert from "../../../../../_util/components/Alert/Alert.tsx";
import {getRTKError} from "../../../../../_util/functions.ts";

export const FormEditCase = () => {
    const currentCase = useSelector((state: RootState) => state.caseInfoSlice.currentCase);
    const caseStatus = useGetCaseStatusQuery();
    const prosectourOffice = useListProsecutorOfficeQuery(undefined, {refetchOnMountOrArgChange: true});
    const [updateCaseApi, updateCaseApiStatus] = useUpdateCaseMutation();
    const [fiscalApi, fiscalApiStatus] = useListFiscalMutation();

    const form = useForm({
        resolver: yupResolver(yupCaseEdit),
        defaultValues: {
            description: currentCase!.descripcion,
            name: currentCase!.titulo,
            status: currentCase!.id_estado.toString()!,
            id_fiscal: currentCase!.id_fiscal.toString(),
            id_fiscalia: currentCase!.id_fiscalia.toString(),
        }
    });


    const idProsecutorOffice = useWatch({
        control: form.control,
        name: "id_fiscalia",
        defaultValue: currentCase!.id_fiscalia.toString(),
    });

    useEffect(() => {
        fiscalApi(idProsecutorOffice)
    }, [idProsecutorOffice]);


    const onClick: SubmitHandler<CaseEdit> = (value) => {
        updateCaseApi({
            id_caso: currentCase!.id_caso,
            descripcion: value.description,
            id_estado: Number(value.status),
            id_fiscal: Number(value.id_fiscal),
            titulo: value.name,
            id_fiscalia: Number(value.id_fiscalia),
            fecha_creacion: new Date(currentCase!.fecha_creacion),
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

                <div className={'div-input'}>
                    <label>
                        Estado
                    </label>
                    <select
                        {...form.register("status")}
                        disabled={caseStatus.isLoading}
                        defaultValue=""
                        className={'material-select'}
                    >
                        <option value="" disabled>
                            Selecciona estado
                        </option>
                        {caseStatus.data?.map((status) => (
                            <option key={status.id_estado} value={status.id_estado}>
                                {status.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={'div-input'}>
                    <label>
                        Fecha creación
                    </label>
                    <Input placeholder={currentCase!.fecha_creacion} disabled={true}/>
                </div>


                <div className={'div-input'}>
                    <label>
                        Fiscalia
                    </label>
                    <select
                        {...form.register("id_fiscalia")}
                        disabled={prosectourOffice.isLoading}
                        defaultValue=""
                        className={'material-select'}
                    >
                        <option value="" disabled>
                            Selecciona una fiscalia
                        </option>
                        {prosectourOffice.data?.map((status) => (
                            <option key={status.id_fiscalia} value={status.id_fiscalia}>
                                {status.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={'div-input'}>
                    <label>
                        Fiscal
                    </label>
                    {(fiscalApiStatus.isLoading) ?
                        <>
                            <Input disabled={true}/>
                        </> :
                        <select
                            {...form.register("id_fiscal")}
                            disabled={fiscalApiStatus.isLoading}
                            defaultValue=""
                            className={'material-select'}
                        >
                            <option value="" disabled>
                                Selecciona un fiscal
                            </option>
                            {fiscalApiStatus?.data?.map((status) => (
                                <option key={status.id_fiscal} value={status.id_fiscal}>
                                    {status.nombre}
                                </option>
                            ))}
                        </select>
                    }
                </div>

                <div style={{ maxWidth:'280px' }}>
                    {updateCaseApiStatus.isError && (
                        <Alert message={getRTKError(updateCaseApiStatus.error)} type={'danger'}></Alert>
                    )}
                </div>

                <Button type="submit" disabled={!form.formState.isValid || updateCaseApiStatus.isLoading}>
                    Editar
                </Button>
            </div>
        </form>
    )
};