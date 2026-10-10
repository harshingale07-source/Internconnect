

const SUPABASE_URL = "https://qbukmwdpyxmpdlqnpxyt.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_JE4lOM6xO3jCP52czZTgsQ_94-7ILMu";

if (!window.supabase?.createClient) {
  console.error(
    "Supabase load nahi hua. Internet aur Supabase CDN script check karo."
  );
} else {
  window.supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

  console.log("InternConnect: Supabase connected!");
}




async function signUp(name, email, password, year = "junior") {
  const client = window.supabaseClient;

  if (!client) {
    throw new Error("Supabase connection nahi hai.");
  }

  if (!name.trim() || !email.trim() || !password) {
    throw new Error("Saari details fill karo.");
  }

  if (password.length < 8) {
    throw new Error("Password kam se kam 8 characters ka hona chahiye.");
  }

  const { data, error } = await client.auth.signUp({
    email: email.trim(),
    password: password,
    options: {
      data: {
        full_name: name.trim(),
        year: year
      }
    }
  });

  if (error) throw error;

  return data;
}




async function logIn(email, password) {
  const client = window.supabaseClient;

  if (!client) {
    throw new Error("Supabase connection nahi hai.");
  }

  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim(),
    password: password
  });

  if (error) throw error;

  return data;
}



async function logOut() {
  const client = window.supabaseClient;

  if (!client) {
    throw new Error("Supabase connection nahi hai.");
  }

  const { error } = await client.auth.signOut();

  if (error) throw error;
}



async function getCurrentUser() {
  const client = window.supabaseClient;

  if (!client) {
    throw new Error("Supabase connection nahi hai.");
  }

  const { data, error } = await client.auth.getUser();

  if (error) throw error;

  return data.user;
}



async function createExperience({
  name,
  role,
  rounds,
  quote,
  category,
  initials,
  color
}) {
  const client = window.supabaseClient;

  if (!client) {
    throw new Error("Supabase connection nahi hai.");
  }

  const { data, error } = await client
    .from("internconnect_experiences")
    .insert({
      name,
      role,
      rounds,
      quote,
      category,
      initials,
      color
    })
    .select()
    .single();

  if (error) {
    console.error("Experience save error:", error.message);
    throw error;
  }

  return data;
}





async function loadExperiences() {
  const client = window.supabaseClient;

  if (!client) {
    throw new Error("Supabase connection nahi hai.");
  }

  const { data, error } = await client
    .from("internconnect_experiences")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Experience load error:", error.message);
    throw error;
  }

  return data || [];
}