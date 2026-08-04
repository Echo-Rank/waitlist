// Profile Canvas — web mirror of the mobile client's canvas types + packing.
// Sources of truth in the core repo:
//   apps/api/src/api/controllers/users/profileCanvas.ts (validation / shape)
//   apps/ui/src/components/ProfilePage/Canvas/layout.ts (packing math)
//   apps/ui/src/components/ProfilePage/Canvas/CanvasGrid.tsx (visibility rules)

export type CanvasSize = "xs" | "s" | "m" | "l" | "xl";

export type CanvasWidgetKind =
  | "pinned_song"
  | "pinned_album"
  | "pinned_artist"
  | "top_five"
  | "top_nine"
  | "now_spinning"
  | "stat_tile"
  | "genre_wheel"
  | "pinned_review"
  | "pinned_collection"
  | "pinned_playlist"
  | "badge"
  | "gif"
  | "vinyl";

export type CanvasStatKey =
  | "streak"
  | "longest_streak"
  | "badges"
  | "rankings"
  | "album_rankings"
  | "song_rankings";

export interface CanvasWidget {
  id: string;
  kind: CanvasWidgetKind;
  size: CanvasSize;
  col?: number;
  row?: number;
  data?: {
    albumIds?: number[];
    feedItemId?: number;
    collectionId?: number;
    playlistId?: number;
    stat?: CanvasStatKey;
    badgeSlug?: string;
    crateSlug?: string;
    albumId?: number;
    trackId?: number;
    artistId?: number;
    gifUrl?: string;
    vinylId?: number;
    scoreId?: number;
    scoreType?: "album" | "track";
  };
}

export interface ProfileCanvasJson {
  version: 1;
  enabled: boolean;
  presetId?: string;
  palette: { bg: string; surface: string; text: string; accent: string };
  widgets: CanvasWidget[];
}

// ---- Hydrated content (GET /api/users/:userId/canvasContent) ----

export interface CanvasReview {
  feedItemId: number | null;
  type: "ranking" | "song_ranking";
  title: string;
  artistName: string;
  albumName: string | null;
  imagesrc: string | null;
  score: number | null;
  review: string | null;
}

export interface CanvasListSummary {
  id: number;
  name: string;
  itemCount: number;
  coverImages: string[];
}

export interface CanvasBadge {
  slug: string;
  name: string;
  category: string;
  counter?: number;
  instance: {
    title: string;
    subtitle?: string | null;
    imagesrc: string | null;
  } | null;
}

export interface CanvasPin {
  type: "album" | "track" | "artist" | "vinyl";
  id: number;
  title: string;
  subtitle: string | null;
  imagesrc: string | null;
  previewUrl: string | null;
  raw: any;
}

export interface CanvasNowSpinning {
  track: {
    id: number;
    title: string;
    artistName: string;
    albumId: number | null;
    imagesrc: string | null;
    previewUrl: string | null;
  };
  playedAt: string;
  provider: string;
}

export interface CanvasContent {
  topNineAlbums?: any[];
  reviews?: Record<string, CanvasReview>;
  lists?: Record<string, CanvasListSummary>;
  nowSpinning?: CanvasNowSpinning | null;
  hasListeningProvider?: boolean;
  genres?: { genre: string; count: number }[];
  stats?: Partial<Record<CanvasStatKey, number>>;
  badges?: Record<string, CanvasBadge>;
  pins?: Record<string, CanvasPin>;
}

// ---- Widget catalog (sizes + retired/plus flags only — what the web needs) ----

const WIDGET_SIZES: Record<string, CanvasSize[]> = {
  pinned_song: ["xs", "s", "m", "l"],
  pinned_album: ["xs", "s", "m", "l"],
  pinned_artist: ["xs", "s", "l"],
  top_five: ["m"],
  top_nine: ["xl"],
  now_spinning: ["xs", "s", "m", "l"],
  stat_tile: ["xs"],
  genre_wheel: ["m", "l"],
  pinned_review: ["xs", "s", "m", "l"],
  pinned_collection: ["xs", "s", "l"],
  pinned_playlist: ["xs", "s", "l"],
  badge: ["xs"],
  gif: ["xs", "s", "m", "l"],
  vinyl: ["xs", "s", "m"],
};

const RETIRED_KINDS = new Set(["top_nine", "genre_wheel"]);
const PLUS_ONLY_KINDS = new Set(["gif", "vinyl"]);

export const CANVAS_STAT_LABELS: Record<CanvasStatKey, string> = {
  streak: "Streak",
  longest_streak: "Best Streak",
  badges: "Badges",
  rankings: "Rankings",
  album_rankings: "Albums",
  song_rankings: "Songs",
};

// ---- Packing (port of layout.ts, in cell units for CSS grid placement) ----

export const CANVAS_COLS = 3;

export const SIZE_SPECS: Record<CanvasSize, { w: number; h: number }> = {
  xs: { w: 1, h: 1 },
  s: { w: 2, h: 1 },
  m: { w: 3, h: 1 },
  l: { w: 3, h: 2 },
  xl: { w: 3, h: 3 },
};

export interface CellRect {
  row: number;
  col: number;
  w: number;
  h: number;
}

export function computeCanvasCells(widgets: CanvasWidget[]): CellRect[] {
  const occupied: boolean[][] = [];
  const ensureRow = (row: number) => {
    while (occupied.length <= row) {
      occupied.push(new Array(CANVAS_COLS).fill(false));
    }
  };
  const fits = (row: number, col: number, w: number, h: number) => {
    for (let r = row; r < row + h; r++) {
      ensureRow(r);
      for (let c = col; c < col + w; c++) {
        if (occupied[r][c]) return false;
      }
    }
    return true;
  };
  const mark = (row: number, col: number, w: number, h: number) => {
    for (let r = row; r < row + h; r++) {
      ensureRow(r);
      for (let c = col; c < col + w; c++) {
        occupied[r][c] = true;
      }
    }
  };

  const rects: (CellRect | null)[] = widgets.map(() => null);

  // Pass 1: explicitly anchored tiles claim their cells first.
  widgets.forEach((widget, index) => {
    const { w, h } = SIZE_SPECS[widget.size];
    if (
      widget.col == null ||
      widget.row == null ||
      widget.col < 0 ||
      widget.row < 0 ||
      widget.col + w > CANVAS_COLS ||
      !fits(widget.row, widget.col, w, h)
    ) {
      return;
    }
    mark(widget.row, widget.col, w, h);
    rects[index] = { row: widget.row, col: widget.col, w, h };
  });

  // Pass 2: everything else flows dense, row-major first-fit.
  widgets.forEach((widget, index) => {
    if (rects[index]) return;
    const { w, h } = SIZE_SPECS[widget.size];
    let row = 0;
    let col = 0;
    outer: for (row = 0; ; row++) {
      for (col = 0; col <= CANVAS_COLS - w; col++) {
        if (fits(row, col, w, h)) break outer;
      }
    }
    mark(row, col, w, h);
    rects[index] = { row, col, w, h };
  });

  return rects as CellRect[];
}

// ---- Visibility (viewer-side subset of CanvasGrid.visibleWidgets) ----

export function normalizeWidgetSizes(widgets: CanvasWidget[]): CanvasWidget[] {
  return widgets.map((w) => {
    const sizes = WIDGET_SIZES[w.kind];
    if (!sizes || sizes.includes(w.size)) return w;
    return { ...w, size: sizes[0] };
  });
}

// Mirrors apps/ui .../widgetAccess.ts profileHasActivePlus.
export function profileHasActivePlus(profile: {
  is_plus?: boolean;
  echo_plus_expires_at?: string | null;
}): boolean {
  if (!profile?.is_plus) return false;
  if (typeof profile.echo_plus_expires_at !== "string") return true;
  const expiresAt = Date.parse(profile.echo_plus_expires_at);
  return Number.isNaN(expiresAt) || expiresAt > Date.now();
}

export function visibleWidgets(
  widgets: CanvasWidget[],
  content: CanvasContent,
  profile: { pinnedTrack?: any; pinnedAlbum?: any; topAlbums?: any[] },
  ownerIsPlus: boolean
): CanvasWidget[] {
  return widgets.filter((w) => {
    if (RETIRED_KINDS.has(w.kind)) return false;
    if (PLUS_ONLY_KINDS.has(w.kind) && !ownerIsPlus) return false;
    switch (w.kind) {
      case "pinned_song":
        if (w.data?.trackId) return !!content.pins?.[w.id];
        return !!profile.pinnedTrack && typeof profile.pinnedTrack === "object";
      case "pinned_album":
        if (w.data?.albumId) return !!content.pins?.[w.id];
        return !!profile.pinnedAlbum && typeof profile.pinnedAlbum === "object";
      case "pinned_artist":
        return !!content.pins?.[w.id];
      case "top_five":
        return (profile.topAlbums ?? []).length > 0;
      case "now_spinning":
        return !!content.nowSpinning;
      case "pinned_review":
        return !!content.reviews?.[w.id];
      case "pinned_collection":
      case "pinned_playlist":
        return !!content.lists?.[w.id];
      case "badge":
        return !!content.badges?.[w.id];
      case "gif":
        return !!w.data?.gifUrl;
      case "vinyl":
        return !!content.pins?.[w.id];
      default:
        return true;
    }
  });
}

// ---- Colors ----

// Port of apps/ui themes/Colors.getSpectrumColor — red → yellow → green.
export function getRankColor(score: number): string {
  const s = Math.max(0, Math.min(10, Math.round(score * 10) / 10));
  const RED = { r: 210, g: 34, b: 45 };
  const YELLOW = { r: 255, g: 191, b: 0 };
  const GREEN = { r: 0, g: 112, b: 0 };
  const mix = (a: typeof RED, b: typeof RED, t: number) => ({
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  });
  const c = s <= 5 ? mix(RED, YELLOW, s / 5) : mix(YELLOW, GREEN, (s - 5) / 5);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
}

// Accent resolution mirrors the app: user accent only when it reads against
// the page background (white here), otherwise fall back to near-black.
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function relativeLuminance(hex: string): number {
  const chan = (i: number) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(1) + 0.7152 * chan(3) + 0.0722 * chan(5);
}

export function resolveAccent(accent: string | undefined | null): string {
  const fallback = "#131313";
  if (!accent || !HEX_RE.test(accent)) return fallback;
  // Contrast vs white (luminance 1): (1 + 0.05) / (L + 0.05) >= 3
  const contrast = 1.05 / (relativeLuminance(accent) + 0.05);
  return contrast >= 3 ? accent : fallback;
}
