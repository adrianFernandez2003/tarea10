export interface Customer {
    idCliente: number;
    nombre: string;
    apellido: string;
    fechaNac?: Date | null;
    fk_genero: number;
    telefono: string;
    correo: string;
    fk_direccion: number;
    fechaCreacion?: Date | null;    
    fechaActualizacion?: Date | null;
    fk_creadoPor: number;
    fk_actualizadoPor?: number;
    fechaEliminacion?: Date | null;
    fk_eliminadoPor: number;
    }