import { createClient } from "@supabase/supabase-js";

// Define types for better TypeScript support
export type ProfileData = {
  id: string;
  imagesrc?: string;
};

// This creates a client for use in browser and server-side
export const createSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  return createClient(supabaseUrl, supabaseKey);
};

// Get a singleton instance for client-side usage
let browserClient: ReturnType<typeof createSupabaseClient> | null = null;

export const getSupabaseClient = () => {
  if (typeof window === "undefined") {
    // Server-side: always create a new client
    return createSupabaseClient();
  }

  // Client-side: reuse the client
  if (!browserClient) {
    browserClient = createSupabaseClient();
  }

  return browserClient;
};

// Helper function to get profile by display name
export async function getProfileByDisplayName(displayname: string): Promise<{
  data: ProfileData | null;
  error: any;
}> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("profiles")
      .select("id, imagesrc")
      .eq("displayname", displayname)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching profile by displayname:", error);
    return { data: null, error };
  }
}
