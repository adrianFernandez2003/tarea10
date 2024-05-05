export interface User {
  IdUsuario: number;
  nombre: string;
  fechaCreacion?: Date | null;
  fechaActualizacion: Date;
  fechaEliminacion?: Date | null;
  }
