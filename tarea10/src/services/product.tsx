import { Product } from "../models/product";
import supabase from "../utils/supabase";


export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("productos").select();
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("Products:", data); // Agrega esta línea para imprimir los datos
  }
  return data || []; 
}

export const createProduct = async (product: Product): Promise<void> => {
  const { error} = await supabase.from("productos").insert(product);
  if (error) throw error;
}
