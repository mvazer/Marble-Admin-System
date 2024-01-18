import supabase from "./supabase";

export async function getCosts() {
  const { data: costs, error } = await supabase.from("costs").select("*");

  if (error) throw new Error(error);

  return { costs, error };
}

export async function addCost(object) {
  const { data, error } = await supabase
    .from("costs")
    .insert([object])
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function updateCost({ id, object }) {
  const { data, error } = await supabase
    .from("costs")
    .update(object)
    .eq("id", id)
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteCost(id) {
  const { error } = await supabase.from("costs").delete().eq("id", id);

  if (error) throw new Error(error);
}
