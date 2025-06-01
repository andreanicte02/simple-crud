import {useListCasesQuery} from "../../../store/service/service/case.service.ts";
import {Table} from "../../../_util/components/Table/Table.tsx";
import {caseColumns} from "./components/list-cases/_column.tsx";

export const Case = () => {

    const caseApi = useListCasesQuery();

    return (
        <div>
            <h3>
                Listado de casos
            </h3>


                <Table columns={caseColumns} data={caseApi?.data || []} isLoading={caseApi.isLoading}/>


        </div>
    );
};