import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error);
}

export async function getUser() {
  const { data: user } = await supabase.auth.getUser();
  return user;
}

export async function signup({ email, password, username }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });

  if (error) throw new Error(error.message);

  return { data, error };
}

export async function updateUser({ email, password, username }) {
  console.log(email, password, username);
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
     data: { username } ,
  });

  if (error) throw new Error(error.message);

  return { data, error };
}
