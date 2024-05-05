import { Customer } from "../models/customer";
import supabase from "../utils/supabase";


export const getCustomers = async (): Promise<Customer[]> => {
  const { data, error } = await supabase.from("clientes").select();
  if (error) {
    console.error("Error fetching products:", error);
  } else {
    console.log("clientes:", data); // Agrega esta línea para imprimir los datos
  }
  return data || []; 
}

