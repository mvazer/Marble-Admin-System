import supabase from "./supabase";

export async function getCustomers() {
  const { data: customer, error } = await supabase.from("customer").select("*");

  if (error) throw new Error(error);

  return { customer, error };
}

export async function getCustomer(key, value) {
  const { data: customer, error } = await supabase
    .from("customer")
    .select("*")
    .eq(key, value);

  if (error) throw new Error(error);

  return { customer, error };
}

export async function addCustomer(object) {
  const { data, error } = await supabase
    .from("customer")
    .insert([object])
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function updateCustomer({ id, object }) {
  const { data, error } = await supabase
    .from("customer")
    .update(object)
    .eq("id", id)
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteCustomer(id) {
  const { error } = await supabase.from("customer").delete().eq("id", id);

  if (error) throw new Error(error);
}
