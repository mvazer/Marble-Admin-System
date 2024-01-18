import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://kkzbchxcysaatybwlvwo.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtremJjaHhjeXNhYXR5YndsdndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0ODQyOTMsImV4cCI6MjAyMTA2MDI5M30.GVkYaqvE96atihnmGlsW005oer5sOGsccM8QhBlijL8";
// const supabaseUrl = "https://npyphljhmwpefshccxvo.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5weXBobGpobXdwZWZzaGNjeHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNDgxNzgsImV4cCI6MjAxODcyNDE3OH0.0Q_hEVcSFC2_gOAoBfujqMWRc754TdafpALg57UqVDE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
