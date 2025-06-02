import type {column} from "../../../_util/components/Table/column.ts";
import type { CasesByState } from "../../../store/service/model/case.model.ts";

export const caseReportColumns: ReadonlyArray<column<CasesByState>> = [
    {
        id: 'id_estado',
        dataField: 'id_estado',
        label: 'ID ESTADO',
        format: (row) => <div>{row.id_estado}</div>,
    },
    {
        id: 'nombre_estado',
        dataField: 'nombre_estado',
        label: 'ESTADO',
        format: (row) => <div>{row.nombre_estado}</div>,
    },
    {
        id: 'cantidad',
        dataField: 'cantidad',
        label: 'CANTIDAD DE CASOS',
        format: (row) => <div>{row.cantidad}</div>,
    },
];