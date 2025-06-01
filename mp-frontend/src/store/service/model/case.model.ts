export interface CaseRequest {
    descripcion: string;
    fecha_creacion: string; // "2025-06-01T21:12:00.000Z"
    id_estado: number;
    id_fiscal: number;
}

export interface CaseResponse {
    id_caso: number;
    descripcion: string;
    fecha_creacion: string; // "2025-06-01T21:12:00.000Z"
    id_estado: number;
    id_fiscal: number;
}