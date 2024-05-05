export interface Session {
  idSesion: number;
  fechaSesion?: Date | null;
  horaSesion: Date | null;
  fk_cliente: number;
  fechaVenta?: Date | null;
  fechaCreacion?: Date | null;
  fechaActualizacion?: Date | null;
  fk_creadoPor: number;
  fk_actualizadoPor?: number;
  fechaEliminacion?: Date | null;
  fk_eliminadoPor: number;

  }