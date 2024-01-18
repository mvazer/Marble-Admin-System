import supabase from "./supabase";

export async function createContainer(object) {
  const { data, error } = await supabase
    .from("container")
    .insert([object])
    .select();

  return { data, error };
}
