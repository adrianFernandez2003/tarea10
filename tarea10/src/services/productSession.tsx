import { ProductSession } from "../models/productSession";
import supabase from "../utils/supabase";


export const getProductSessions = async (): Promise<ProductSession[]> => {
  const { data, error } = await supabase.from("sesiones_productos").select();
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("sesiones_productos:", data); // Agrega esta línea para imprimir los datos
  }
  return data || []; 
}


export const createSesionProducto = async (sesionProducto: ProductSession): Promise<void> => {
  const { error} = await supabase.from("sesiones_productos").insert(sesionProducto);
  if (error) throw error;
}