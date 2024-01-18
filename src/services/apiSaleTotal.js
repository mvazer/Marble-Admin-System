import supabase from "./supabase";

export async function getSaleTotal() {
  const { data: saleTotal, error } = await supabase
    .from("saleTotal")
    .select("*");

  if (error) throw new Error(error);

  return { saleTotal, error };
}

export async function getSaleTotalId(value) {
  const { data: saleTotal, error } = await supabase
    .from("saleTotal")
    .select("*")
    .eq("id", value);

  if (error) throw new Error(error);

  return { saleTotal, error };
}

export async function getSaleTotalCustomer(value) {
  const { data: saleTotal, error } = await supabase
    .from("saleTotal")
    .select("*")
    .eq("customer_id", value);

  if (error) throw new Error(error);

  return { saleTotal, error };
}

export async function updateSaleTotal(id, object) {
  const { data, error } = await supabase
    .from("saleTotal")
    .update(object)
    .eq("id", id)
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function createSaleTotal(object) {
  const { data, error } = await supabase
    .from("saleTotal")
    .insert([object])
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteSaleTotal(id) {
  const { error } = await supabase.from("saleTotal").delete().eq("id", id);

  if (error) throw new Error(error);
}
