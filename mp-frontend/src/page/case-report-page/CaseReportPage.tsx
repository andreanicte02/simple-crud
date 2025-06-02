import {useGetCasesByUserQuery} from "../../store/service/service/case.service.ts";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../_util/components/Button/Button.tsx";
import {setCaseModal} from "../../store/slice/caseInfo.slice.ts";
import {Table} from "../../_util/components/Table/Table.tsx";
import type {RootState} from "../../store/store.ts";
import {caseReportColumns} from "./cases-report-list/_columns.tsx";

export const CaseReportPage = () => {
    const session = useSelector((state: RootState) => state.sessionSlice.user);
    const caseApi = useGetCasesByUserQuery(session.id_usuario.toString(), {refetchOnMountOrArgChange: true});
    const dispatch = useDispatch();


    return (
        <div>
            <h3>
                Listado de casos por usuario
            </h3>

            <div className={'case-button'}>
                <Button onClick={() => dispatch(setCaseModal('create'))}>
                    Crear caso
                </Button>
            </div>


            <Table columns={caseReportColumns} data={caseApi?.data || []} isLoading={caseApi.isLoading}/>
        </div>
    );
};