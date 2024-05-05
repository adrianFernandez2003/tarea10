export interface Adress {
  idDireccion: number;
  codigoPostal: string;
  calle: string;
  colonia: string;
  numExt: string;
  numInt: string;
  ciudad: string;
  fechaCreacion?: Date | null;
  fechaActualizacion?: Date | null;
  fk_creadoPor: number;
  fk_actualizadoPor?: number;
  fechaEliminacion?: Date | null;
  fk_eliminadoPor: number;
  }