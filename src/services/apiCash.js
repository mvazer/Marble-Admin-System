import supabase from "./supabase";

export async function getCash() {
  const { data: cash, error } = await supabase
    .from("cash")
    .select("*")
    .eq("isDeleted", false);

  if (error) throw new Error(error);

  return { cash, error };
}

export async function addCash(object) {
  const { data, error } = await supabase.from("cash").insert([object]).select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteCash(id) {
  const { error } = await supabase
    .from("cash")
    .update({ isDeleted: true })
    .eq("container_id", id);

  if (error) throw new Error(error);
}
