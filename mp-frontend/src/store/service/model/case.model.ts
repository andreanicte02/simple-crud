export type CaseInfoListRequest = void;

export interface CaseInfo {
    id_caso: number;
    titulo: string;
    descripcion: string;
    fecha_creacion: string; // ISO string
    id_estado: number;
    nombre_estado: string;
    id_fiscal: number;
    id_fiscalia: number;
    nombre_fiscalia: string;
    nombre_fiscal: string
}

export interface Case {
    id_caso: number;
    descripcion: string;
    fecha_creacion: Date;
    id_estado: number;
    id_fiscal: number;
}

export type CreateCaseRequest = {
    descripcion: string;
    fecha_creacion: Date;
    id_estado: number;
    id_fiscal: number;
    titulo: string;
    id_fiscalia: number
};

export interface UpdateCaseRequest {
    descripcion: string;
    fecha_creacion: Date;
    id_estado: number;
    id_fiscal: number;
    titulo: string;
    id_fiscalia: number;
    id_caso: number;
}

export type CaseInfoListResponse = CaseInfo[];

export interface CasesByState {
    id_estado: number;
    nombre_estado: string;
    cantidad: number;
}

export type GetCasesCountByStateForUserResponse = CasesByState[];