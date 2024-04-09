import supabase from "./supabase";

export async function getContainers() {
  const { data: container, error } = await supabase
    .from("container")
    .select("*")
    .eq("isDeleted", false);

  if (error) throw new Error(error);

  return { container, error };
}

export async function createContainer(object) {
  const { data, error } = await supabase
    .from("container")
    .insert([object])
    .select();

  return { data, error };
}

export async function deleteContainer(value) {
  const { error } = await supabase
    .from("container")
    .update({ isDeleted: true })
    .eq("id", value);

  if (error) throw new Error(error);

  return { error };
}
