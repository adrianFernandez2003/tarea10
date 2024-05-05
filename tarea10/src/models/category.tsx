export interface Category {
    idCategoria: number;
    nombre: string;
    fechaCreacion?: Date | null;    
    fechaActualizacion?: Date | null;
    fk_creadoPor: number;
    fk_actualizadoPor?: number;
    fechaEliminacion?: Date | null;
    fk_eliminadoPor: number;
    }