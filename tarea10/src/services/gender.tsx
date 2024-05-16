import { Gender } from "../models/gender";
import supabase from "../utils/supabase";


export const getGenders = async (): Promise<Gender[]> => {
  const { data, error } = await supabase.from("genero").select();
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("generos:", data); // Agrega esta línea para imprimir los datos
  }
  return data || []; 
}
export const createGender = async (gender: Gender): Promise<void> => {
  const { error} = await supabase.from("genero").insert(gender);
  if (error) throw error;
}

