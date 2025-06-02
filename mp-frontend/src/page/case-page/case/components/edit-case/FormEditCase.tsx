import {useSelector} from "react-redux";
import type {RootState} from "../../../../../store/store.ts";
import {type SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../../../../../_util/components/Input/Input.tsx";
import Button from "../../../../../_util/components/Button/Button.tsx";
import {yupCaseEdit, type CaseEdit} from "../../core/_models.ts";
import {useGetCaseStatusQuery} from "../../../../../store/service/service/statusCase.service.ts";
import {useUpdateCaseMutation} from "../../../../../store/service/service/case.service.ts";

export const FormEditCase = () => {
    const session = useSelector((state: RootState) => state.sessionSlice.user);
    const currentCase = useSelector((state: RootState) => state.caseInfoSlice.currentCase);
    const caseStatus = useGetCaseStatusQuery();
    const [updateCaseApi, updateCaseApiStatus] = useUpdateCaseMutation();

    const form = useForm({
        resolver: yupResolver(yupCaseEdit),
        defaultValues: {
            description: currentCase!.descripcion,
            name: currentCase!.titulo,
            status: currentCase!.id_estado.toString()!,

        }
    });


    const onClick: SubmitHandler<CaseEdit> = (value) => {
        updateCaseApi({
            id_caso: currentCase!.id_caso,
            descripcion: value.description,
            id_estado: Number( value.status),
            id_fiscal: session.id_fiscal,
            titulo: value.name,
            id_fiscalia: session.id_fiscalia,
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
                    <Input placeholder={currentCase!.nombre_fiscalia} disabled={true}/>
                </div>

                <Button type="submit" disabled={!form.formState.isValid || updateCaseApiStatus.isLoading}>
                    Editar
                </Button>
            </div>
        </form>
    )
};