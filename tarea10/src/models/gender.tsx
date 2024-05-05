export interface Gender {
  idGenero: number;
  genero: string;
  fechaCreacion?: Date | null;
  fechaActualizacion?: Date | null;
  fk_creadoPor: number;
  fk_actualizadoPor?: number;
  fechaEliminacion?: Date | null;
  fk_eliminadoPor: number;
  }