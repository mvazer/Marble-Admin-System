import supabase from "./supabase";

export async function getSale() {
  const { data: sale, error } = await supabase.from("sale").select("*");

  if (error) throw new Error(error);

  return { sale, error };
}

export async function getSaleId(key, value) {
  const { data: sale, error } = await supabase
    .from("sale")
    .select("*")
    .eq(key, value);

  if (error) throw new Error(error);

  return { sale, error };
}

export async function createSale(object) {
  const { data, error } = await supabase.from("sale").insert(object).select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteSale(id) {
  const { error } = await supabase
    .from("sale")
    .update({ isDeleted: true })
    .eq("id", id);

  if (error) throw new Error(error);
}
