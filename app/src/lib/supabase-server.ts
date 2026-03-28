import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client with service role key for cache tables
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
