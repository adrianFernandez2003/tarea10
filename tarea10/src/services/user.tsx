import { User } from "../models/user";
import supabase from "../utils/supabase";


export const getUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase.from("usuarios").select();
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("usuarios:", data); // Agrega esta línea para imprimir los datos
  }
  return data || []; 
}

export const createUser = async (user: User): Promise<void> => {
  const { error} = await supabase.from("usuarios").insert(user);
  if (error) throw error;
}

