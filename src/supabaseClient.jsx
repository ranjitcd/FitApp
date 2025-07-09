import { createClient } from "@supabase/supabase-js";

// You can move these to environment variables later (via Netlify/ENV support)
const supabaseUrl = "https://flndefkorrpmfcgcygvv.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbmRlZmtvcnJwbWZjZ2N5Z3Z2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzUyMDIsImV4cCI6MjA2NzM1MTIwMn0.Hq41b9I7M84W-Mr59i-vUbtilIKGvM0Wr8TABQ46N3s";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
