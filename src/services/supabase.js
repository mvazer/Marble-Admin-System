import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = "https://kkzbchxcysaatybwlvwo.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtremJjaHhjeXNhYXR5YndsdndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0ODQyOTMsImV4cCI6MjAyMTA2MDI5M30.GVkYaqvE96atihnmGlsW005oer5sOGsccM8QhBlijL8";
const supabaseUrl = "https://npyphljhmwpefshccxvo.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
