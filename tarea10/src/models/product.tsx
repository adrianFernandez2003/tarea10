export interface Product {
  idproducto?: number;
  descripcion?: string;
  precio?: number;
  fk_categoria?: number;
  fechacreacion?: Date | null;
  fechaactualizacion?: Date | null;
  fk_creadopor?: number;
  fk_actualizadopor?: number;
  fechaeliminacion?: Date | null;
  fk_eliminadopor?: number;
  }