export interface Product {
  idProduct: number;
  descripcion: string;
  precio: number;
  fk_categoria: number;
  fechaCreacion?: Date | null;
  fechaActualizacion?: Date | null;
  fk_creadoPor: number;
  fk_actualizadoPor?: number;
  fechaEliminacion?: Date | null;
  fk_eliminadoPor: number;
  }