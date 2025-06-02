export interface Case {
    id_caso: number;
    descripcion: string;
    fecha_creacion: Date;
    id_estado: number;
    id_fiscalia: number;
    id_fiscal: number;
    titulo: string;
}

export interface ReportByUser {
    id_usuario: number;
    username: string;
    cantidad_casos: number;
}