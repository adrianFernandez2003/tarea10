export interface Category {
    idcategoria?: number;
    nombre?: string;
    fechacreacion?: Date | null;    
    fechaactualizacion?: Date | null;
    fk_creadopor?: number;
    fk_actualizadopor?: number;
    fechaeliminacion?: Date | null;
    fk_eliminadopor?: number;
    }