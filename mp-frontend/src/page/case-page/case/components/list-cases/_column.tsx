import type { column } from "../../../../../_util/components/Table/column";
import type {CaseInfo} from "../../../../../store/service/model/case.model.ts";
import {CaseDetailButton} from "./CaseDetailButton.tsx";

export const caseColumns: ReadonlyArray<column<CaseInfo>> = [
    {
        id: 'id_caso',
        dataField: 'id_caso',
        label: 'ID CASO',
        format: (row) => <div>{row.id_caso}</div>,
    },
    {
        id: 'titulo',
        dataField: 'titulo',
        label: 'TÍTULO',
        format: (row) => <div>{row.titulo}</div>,
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
        id: 'nombre_estado',
        dataField: 'nombre_estado',
        label: 'ESTADO',
        format: (row) => <div>{row.nombre_estado}</div>,
    },
    {
        id: 'nombre_fiscalia',
        dataField: 'nombre_fiscalia',
        label: 'FISCALÍA',
        format: (row) => <div>{row.nombre_fiscalia}</div>,
    },
    {
        id: 'actions',
        label: 'ACCIONES',
        format: (row) => (
            <CaseDetailButton currentCase={row}/>
        ),
    },
];