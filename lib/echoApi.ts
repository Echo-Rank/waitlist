// Server-side fetchers for the Echo core API (apps/api in the core repo).
// Used by the public web profile page; all endpoints are public reads.
import type { CanvasContent, ProfileCanvasJson } from "./canvas";

const API_BASE =
  process.env.NEXT_PUBLIC_ECHO_API_URL ||
  "https://echo-api-829173140548.us-east1.run.app";

// Trimmed view of GET /api/users/:id — only what the web page renders.
export interface EchoFullProfile {
  id: number;
  displayname: string;
  firstname?: string | null;
  lastname?: string | null;
  imagesrc?: string | null;
  bio?: string | null;
  location?: string | null;
  verified?: boolean;
  is_plus?: boolean;
  echo_plus_expires_at?: string | null;
  profile_canvas?: ProfileCanvasJson | null;
  followersCount: number;
  followingCount: number;
  pinnedAlbum?: any;
  pinnedTrack?: any;
  topAlbums?: any[];
  rankingsCount: number;
}

export interface EchoProfileLink {
  id: number;
  link_type: string;
  label: string | null;
  url: string;
  display_order: number;
}

async function apiGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Echo API request failed: ${path}`, error);
    return null;
  }
}

export async function getUserIdByDisplayname(
  displayname: string
): Promise<number | null> {
  const raw = await apiGet<{ id?: number }>(
    `/api/users/by-username/${encodeURIComponent(displayname)}`
  );
  return typeof raw?.id === "number" ? raw.id : null;
}

export async function getFullProfile(
  userId: string | number
): Promise<EchoFullProfile | null> {
  const raw = await apiGet<any>(`/api/users/${userId}`);
  if (!raw || raw.error) return null;

  // Total rankings = every score in the distribution, albums + songs.
  const sumCounts = (dist: Record<string, number> | undefined) =>
    dist ? Object.values(dist).reduce((total, n) => total + (n || 0), 0) : 0;
  const rankingsCount =
    sumCounts(raw.scoreDistribution?.albums) +
    sumCounts(raw.scoreDistribution?.songs);

  return {
    id: raw.id,
    displayname: raw.displayname,
    firstname: raw.firstname,
    lastname: raw.lastname,
    imagesrc: raw.imagesrc,
    bio: raw.bio,
    location: raw.location,
    verified: raw.verified,
    is_plus: raw.is_plus,
    echo_plus_expires_at: raw.echo_plus_expires_at,
    profile_canvas: raw.profile_canvas ?? null,
    followersCount: raw.followersCount ?? 0,
    followingCount: raw.followingCount ?? 0,
    pinnedAlbum: raw.pinnedAlbum ?? null,
    pinnedTrack: raw.pinnedTrack ?? null,
    topAlbums: raw.topAlbums ?? [],
    rankingsCount,
  };
}

export async function getCanvasContent(
  userId: string | number
): Promise<CanvasContent> {
  return (await apiGet<CanvasContent>(`/api/users/${userId}/canvasContent`)) ?? {};
}

export async function getProfileLinks(
  userId: string | number
): Promise<EchoProfileLink[]> {
  const raw = await apiGet<any>(`/api/users/${userId}/profile-links`);
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.links)) return raw.links;
  return [];
}
