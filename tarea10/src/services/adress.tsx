import { Adress } from "../models/adress";
import supabase from "../utils/supabase";


export const getAdresses = async (): Promise<Adress[]> => {
  const { data, error } = await supabase.from("direccion").select();
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("direcciones:", data); // Agrega esta línea para imprimir los datos
  }
  return data || []; 
}

