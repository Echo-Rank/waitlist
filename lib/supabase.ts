import { createClient } from "@supabase/supabase-js";

// Define types for better TypeScript support
export type ProfileData = {
  id: string;
  imagesrc?: string;
  displayname: string;
  follower_count?: number;
  following_count?: number;
  verified?: boolean;
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

    // First get the basic profile data
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, imagesrc, displayname, verified")
      .eq("displayname", displayname)
      .single();

    if (profileError) throw profileError;

    if (!profileData) {
      return { data: null, error: null };
    }

    // Get follower count
    const { count: followerCount, error: followerError } = await supabase
      .from("user_followers")
      .select("*", { count: "exact", head: true })
      .eq("following_id", profileData.id);

    if (followerError) throw followerError;

    // Get following count
    const { count: followingCount, error: followingError } = await supabase
      .from("user_followers")
      .select("*", { count: "exact", head: true })
      .eq("follower_id", profileData.id);

    if (followingError) throw followingError;

    return {
      data: {
        ...profileData,
        follower_count: followerCount || 0,
        following_count: followingCount || 0,
      },
      error: null,
    };
  } catch (error) {
    console.error("Error fetching profile by displayname:", error);
    return { data: null, error };
  }
}
