export interface ProsecutionOffice {
    id_fiscalia: number;
    nombre: string;
    ubicacion: string;
}

export interface Fiscal {
    id_fiscal: number;
    nombre: string;
    correo: string;
    id_fiscalia: number;
}

export type ProsecutionOfficeResponse = ProsecutionOffice[];

export type FiscalResponse = Fiscal[];
