import supabase from "./supabase";

export async function getOptions() {
  const { data: options, error } = await supabase.from("option").select("*");

  if (error) throw new Error(error);

  return { options, error };
}

export async function createOption(object) {
  const { data, error } = await supabase
    .from("option")
    .insert([object])
    .select();

  if (error) throw new Error(error);

  return { data, error };
}
