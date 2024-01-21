import supabase from "./supabase";

export async function getProducts() {
  const { data: product, error } = await supabase.from("product").select("*");

  if (error) throw new Error(error);

  return { product, error };
}

export async function getLossProducts() {
  const { data: product, error } = await supabase
    .from("product")
    .select("*")
    .gt("loss", 0);

  if (error) throw new Error(error);

  return { product, error };
}

export async function getFilteredProducts({ key, value }) {
  const { data: product, error } = await supabase
    .from("product")
    .select("*")
    .eq(key, value);

  if (error) throw new Error(error);

  return { product, error };
}

export async function updateProduct({ id, object }) {
  const { data, error } = await supabase
    .from("product")
    .update(object)
    .eq("id", id)
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function createProduct(object) {
  const { data, error } = await supabase
    .from("product")
    .insert(object)
    .select();

  if (error) throw new Error(error);

  return { data, error };
}

export async function deleteProducts(value) {
  const { error } = await supabase
    .from("product")
    .delete()
    .eq("container_id", value);

  if (error) throw new Error(error);

  return { error };
}
