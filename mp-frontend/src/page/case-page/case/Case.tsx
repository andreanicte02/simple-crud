import {useListCasesQuery} from "../../../store/service/service/case.service.ts";
import {Table} from "../../../_util/components/Table/Table.tsx";
import {caseColumns} from "./components/list-cases/_column.tsx";
import Button from "../../../_util/components/Button/Button.tsx";
import './case.style.css'
import {useDispatch} from "react-redux";
import {setCaseModal} from "../../../store/slice/caseInfo.slice.ts";
import {ModalCreateCase} from "./components/create-case/ModalCreateCase.tsx";

export const Case = () => {

    const caseApi = useListCasesQuery(undefined, {refetchOnMountOrArgChange: true});
    const dispatch = useDispatch();


    return (
        <div>
            <h3>
                Listado de casos
            </h3>

            <div className={'case-button'}>
                <Button onClick={() => dispatch(setCaseModal('create'))}>
                    Crear caso
                </Button>
            </div>


            <Table columns={caseColumns} data={caseApi?.data || []} isLoading={caseApi.isLoading}/>

            <ModalCreateCase/>
        </div>
    );
};