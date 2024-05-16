export interface Gender {
  idgenero?: number;
  genero?: string;
  fechacreacion?: Date | null;
  fechaactualizacion?: Date | null;
  fk_creadopor?: number;
  fk_actualizadopor?: number;
  fechaeliminacion?: Date | null;
  fk_eliminadopor?: number;
  }