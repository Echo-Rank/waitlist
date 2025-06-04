import { createClient } from "@supabase/supabase-js";

// Define types for better TypeScript support
export type ProfileData = {
  id: string;
  imagesrc?: string;
  firstname?: string;
  lastname?: string;
  displayname: string;
  bio?: string;
  location?: string;
};

export type DiscussionData = {
  id: number;
  title?: string;
  content: string;
  created_at: string;
  user_id: number;
  tagged_albums?: number[];
  user?: {
    id: number;
    displayname: string;
    firstname?: string;
    lastname?: string;
    imagesrc?: string;
  };
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
      .select("id, imagesrc, firstname, lastname, displayname, bio, location")
      .eq("displayname", displayname)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching profile by displayname:", error);
    return { data: null, error };
  }
}

// Helper function to get discussion by feed item ID
export async function getDiscussionByFeedItemId(feedItemId: string): Promise<{
  data: DiscussionData | null;
  error: any;
}> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("feed_items")
      .select(
        `
        discussion_id,
        discussions!inner (
          id,
          title,
          content,
          created_at,
          user_id,
          tagged_albums,
          profiles (
            id,
            displayname,
            firstname,
            lastname,
            imagesrc
          )
        )
      `
      )
      .eq("id", feedItemId)
      .eq("type", "discussion")
      .single();

    if (error) throw error;

    // Transform the data to match our type
    const discussion = Array.isArray(data.discussions)
      ? data.discussions[0]
      : data.discussions;
    const transformedData: DiscussionData = {
      id: discussion.id,
      title: discussion.title,
      content: discussion.content,
      created_at: discussion.created_at,
      user_id: discussion.user_id,
      tagged_albums: discussion.tagged_albums,
      user: Array.isArray(discussion.profiles)
        ? discussion.profiles[0]
        : discussion.profiles,
    };

    return { data: transformedData, error: null };
  } catch (error) {
    console.error("Error fetching discussion by feed item ID:", error);
    return { data: null, error };
  }
}

// Helper function to get discussion by ID (keeping for backward compatibility)
export async function getDiscussionById(id: string): Promise<{
  data: DiscussionData | null;
  error: any;
}> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("discussions")
      .select(
        `
        id,
        title,
        content,
        created_at,
        user_id,
        tagged_albums,
        profiles (
          id,
          displayname,
          firstname,
          lastname,
          imagesrc
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    // Transform the data to match our type
    const transformedData: DiscussionData = {
      id: data.id,
      title: data.title,
      content: data.content,
      created_at: data.created_at,
      user_id: data.user_id,
      tagged_albums: data.tagged_albums,
      user: Array.isArray(data.profiles) ? data.profiles[0] : data.profiles,
    };

    return { data: transformedData, error: null };
  } catch (error) {
    console.error("Error fetching discussion by ID:", error);
    return { data: null, error };
  }
}
