export interface Adress {
  iddireccion?: number;
  codigopostal: string;
  calle: string;
  colonia: string;
  numext: string;
  numint: string;
  ciudad: string;
  fechacreacion?: Date | null;
  fechaActualizacion?: Date | null;
  fk_creadoPor?: number;
  fk_actualizadoPor?: number;
  fechaEliminacion?: Date | null;
  fk_eliminadoSPor?: number;
  }