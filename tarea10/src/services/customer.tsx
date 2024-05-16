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

export const createCustomer = async (customer: Customer): Promise<void> => {
  const { error} = await supabase.from("clientes").insert(customer);
  if (error) throw error;
}