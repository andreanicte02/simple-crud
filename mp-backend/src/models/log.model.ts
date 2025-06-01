export interface Log {
    id_log: number;
    id_caso: number;
    id_fiscal_anterior: number;
    id_fiscal_nuevo: number;
    fecha_intento: Date;
    motivo: string;
}