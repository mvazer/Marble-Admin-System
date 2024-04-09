import supabase from "./supabase";

export async function getHistoryApi() {
  const { data: history, error } = await supabase.from("history").select("*");

  if (error) throw new Error(error);

  return { history, error };
}

export async function addHistoryApi(object) {
  const { data, error } = await supabase
    .from("history")
    .insert([object])
    .select();

  if (error) throw new Error(error);

  return { data, error };
}
