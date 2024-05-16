export interface Customer {
    idclientes?: number;
    nombre?: string;
    apellido?: string;
    fechanac?: Date | null;
    fk_genero?: number;
    telefono?: string;
    correo?: string;
    fk_direccion?: number;
    fechacreacion?: Date | null;    
    fechaactualizacion?: Date | null;
    fk_creadorpor?: number;
    fk_actualizadopor?: number;
    fechaeliminado?: Date | null;
    fk_eliminadopor?: number;
    }