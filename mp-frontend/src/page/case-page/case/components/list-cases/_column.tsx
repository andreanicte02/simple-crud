import type {CaseResponse} from "../../../../../store/service/model/case.model.ts";
import type {column} from "../../../../../_util/components/Table/column.ts";
import Button from "../../../../../_util/components/Button/Button.tsx";


export const caseColumns: ReadonlyArray<column<CaseResponse>> = [
    {
        id: 'id_caso',
        dataField: 'id_caso',
        label: 'ID CASO',
        format: (row) => <div>{row.id_caso}</div>,
    },
    {
        id: 'descripcion',
        dataField: 'descripcion',
        label: 'DESCRIPCIÓN',
        format: (row) => <div>{row.descripcion}</div>,
    },
    {
        id: 'fecha_creacion',
        dataField: 'fecha_creacion',
        label: 'FECHA DE CREACIÓN',
        format: (row) => (
            <div>
                {new Date(row.fecha_creacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                })}
            </div>
        ),
    },
    {
        id: 'id_estado',
        dataField: 'id_estado',
        label: 'ESTADO',
        format: (row) => <div>{row.id_estado}</div>,
    },
    {
        id: 'id_fiscal',
        dataField: 'id_fiscal',
        label: 'FISCAL',
        format: (row) => <div>{row.id_fiscal}</div>,
    },
    {
        id: 'actions',
        label: 'ACCIONES',
        format: () => (
            <Button>
              Detalle
            </Button>
        ),
    },
];