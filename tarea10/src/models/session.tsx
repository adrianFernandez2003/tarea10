export interface Session {
  idsesion?: number;
  fechasesion?: Date | null;
  horasesion?: Date | null;
  fk_cliente?: number;
  fechaventa?: Date | null;
  fechacreacion ?: Date | null;
  fechaactualizacion?: Date | null;
  fk_creadopor?: number;
  fk_actualizadopor?: number;
  fechaeliminacion?: Date | null;
  fk_eliminadopor?: number;

  }