"use client";

// Public web profile — header + the user's Canvas rendered as a minimal
// 3-column modular grid, mirroring the mobile canvas (core repo,
// apps/ui/src/components/ProfilePage/Canvas). Content arrives fully hydrated
// from the server component; this file only renders.
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CanvasContent,
  CanvasWidget,
  CANVAS_STAT_LABELS,
  computeCanvasCells,
  getRankColor,
  normalizeWidgetSizes,
  profileHasActivePlus,
  resolveAccent,
  visibleWidgets,
} from "@/lib/canvas";
import type { EchoFullProfile, EchoProfileLink } from "@/lib/echoApi";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo";

// ---------- tiny shared bits ----------

const first = <T,>(rel: T | T[] | null | undefined): T | null =>
  Array.isArray(rel) ? (rel[0] ?? null) : (rel ?? null);

const formatCount = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
};

const formatScore = (score: number): string =>
  Number.isInteger(score) ? String(score) : score.toFixed(1);

const timeAgoLabel = (playedAt: string): string => {
  const played = Date.parse(playedAt);
  if (!Number.isFinite(played)) return "";
  const minutes = Math.max(1, Math.round((Date.now() - played) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
};

// One preview plays at a time, page-wide.
let activeAudio: HTMLAudioElement | null = null;
let activeStop: (() => void) | null = null;

function usePreview(url: string | null) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        if (activeAudio === audioRef.current) {
          activeAudio = null;
          activeStop = null;
        }
      }
    };
  }, []);

  const toggle = useCallback(() => {
    if (!url) return;
    if (playing && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    if (activeAudio && activeAudio !== audioRef.current) {
      activeAudio.pause();
      activeStop?.();
    }
    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.onended = () => setPlaying(false);
    }
    activeAudio = audioRef.current;
    activeStop = () => setPlaying(false);
    audioRef.current.play().catch(() => setPlaying(false));
    setPlaying(true);
  }, [url, playing]);

  return { playing, playable: !!url, toggle };
}

const PlayChip: React.FC<{
  url: string | null;
  size?: "sm" | "lg";
  className?: string;
}> = ({ url, size = "sm", className = "" }) => {
  const { playing, playable, toggle } = usePreview(url);
  if (!playable) return null;
  const dim = size === "lg" ? "h-9 w-9" : "h-6 w-6";
  const glyph = size === "lg" ? 14 : 10;
  return (
    <button
      aria-label={playing ? "Pause preview" : "Play preview"}
      onClick={(e) => {
        e.stopPropagation();
        toggle();
      }}
      className={`${dim} ${className} flex items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-transform hover:scale-105`}
    >
      {playing ? (
        <svg width={glyph} height={glyph} viewBox="0 0 12 12" fill="#fff">
          <rect x="2" y="1.5" width="3" height="9" rx="0.8" />
          <rect x="7" y="1.5" width="3" height="9" rx="0.8" />
        </svg>
      ) : (
        <svg
          width={glyph}
          height={glyph}
          viewBox="0 0 12 12"
          fill="#fff"
          style={{ marginLeft: 1 }}
        >
          <path d="M2.5 1.2 L10.8 6 L2.5 10.8 Z" />
        </svg>
      )}
    </button>
  );
};

const ScorePill: React.FC<{ score: number }> = ({ score }) => {
  const elite = score >= 9.5;
  return (
    <span
      className="inline-flex min-w-[42px] items-center justify-center rounded-full bg-white px-2 py-1 text-[13px] font-bold tracking-tight shadow-sm"
      style={{
        color: getRankColor(score),
        ...(elite
          ? {
              boxShadow: `0 0 0 2px ${score >= 10 ? "#d4af37" : "#007000"}`,
            }
          : {}),
      }}
    >
      {formatScore(score)}
    </span>
  );
};

const Scrim: React.FC<{ strong?: boolean }> = ({ strong }) => (
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background: strong
        ? "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.85) 100%)"
        : "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.82) 100%)",
    }}
  />
);

const CoverImg: React.FC<{ src: string | null; alt: string; className?: string }> = ({
  src,
  alt,
  className = "",
}) =>
  src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      loading="lazy"
    />
  ) : (
    <div className={`absolute inset-0 bg-black/10 ${className}`} />
  );

const FrostChip: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <span
    className={`pointer-events-none absolute rounded-full border border-white/30 bg-black/55 px-1.5 py-[3px] text-[8px] font-extrabold uppercase tracking-[0.1em] text-white ${className}`}
  >
    {children}
  </span>
);

// ---------- widget renderers ----------

interface WidgetCtx {
  content: CanvasContent;
  profile: EchoFullProfile;
  accent: string;
}

function songFromLegacyPin(pinnedTrack: any) {
  if (!pinnedTrack || typeof pinnedTrack !== "object") return null;
  const album = first(pinnedTrack.albums);
  const artist = first(pinnedTrack.artists);
  return {
    title: pinnedTrack.title ?? "",
    subtitle: artist?.artistname ?? null,
    imagesrc: pinnedTrack.imagesrc ?? album?.imagesrc ?? null,
    previewUrl:
      pinnedTrack.playable_preview_url ??
      pinnedTrack.apple_music_preview_url ??
      pinnedTrack.preview_url ??
      null,
  };
}

function albumFromLegacyPin(pinnedAlbum: any) {
  if (!pinnedAlbum || typeof pinnedAlbum !== "object") return null;
  const artist = first(pinnedAlbum.artists);
  return {
    title: pinnedAlbum.title ?? "",
    subtitle:
      [artist?.artistname, pinnedAlbum.releaseyear].filter(Boolean).join("  ·  ") ||
      null,
    imagesrc: pinnedAlbum.imagesrc ?? null,
    previewUrl: null,
  };
}

const MediaTile: React.FC<{
  widget: CanvasWidget;
  eyebrow?: string;
  title: string;
  subtitle?: string | null;
  imagesrc: string | null;
  previewUrl?: string | null;
  scorePill?: number | null;
  quote?: string | null;
}> = ({ widget, eyebrow, title, subtitle, imagesrc, previewUrl, scorePill, quote }) => {
  if (widget.size === "xs") {
    return (
      <div className="absolute inset-0">
        <CoverImg src={imagesrc} alt={title} />
        {scorePill != null && (
          <span className="absolute bottom-1.5 right-1.5">
            <ScorePill score={scorePill} />
          </span>
        )}
        {previewUrl && (
          <PlayChip url={previewUrl} className="absolute bottom-1.5 right-1.5" />
        )}
      </div>
    );
  }

  const hero = widget.size === "l";
  return (
    <div className="absolute inset-0">
      <CoverImg src={imagesrc} alt={title} />
      <Scrim strong={hero} />
      <div
        className={`absolute inset-0 flex items-end justify-between gap-2.5 ${
          hero ? "p-3" : "px-3 py-2.5"
        }`}
      >
        <div className="min-w-0 flex-1">
          {hero && eyebrow && (
            <p className="mb-0.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/70">
              {eyebrow}
            </p>
          )}
          <p
            className={`truncate font-extrabold tracking-tight text-white ${
              hero ? "text-[17px]" : "text-[14px]"
            }`}
          >
            {title}
          </p>
          {subtitle && (
            <p className="truncate text-[11px] font-medium text-white/70">
              {subtitle}
            </p>
          )}
          {hero && quote && (
            <p className="mt-1 line-clamp-3 text-[12px] italic leading-[18px] text-white/90">
              “{quote}”
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {scorePill != null && <ScorePill score={scorePill} />}
          {previewUrl && <PlayChip url={previewUrl} size={hero ? "lg" : "sm"} />}
        </div>
      </div>
    </div>
  );
};

const TopFiveTile: React.FC<{ ctx: WidgetCtx }> = ({ ctx }) => {
  const albums = (ctx.profile.topAlbums ?? []).filter(Boolean).slice(0, 5);
  return (
    <div className="absolute inset-0 flex">
      {albums.map((album: any, i: number) => (
        <div key={album.id ?? i} className="relative h-full flex-1">
          <CoverImg src={album.imagesrc ?? null} alt={album.title ?? ""} />
        </div>
      ))}
      <FrostChip className="left-1.5 top-1.5">Top 5</FrostChip>
    </div>
  );
};

const NowSpinningTile: React.FC<{ widget: CanvasWidget; ctx: WidgetCtx }> = ({
  widget,
  ctx,
}) => {
  const nowSpinning = ctx.content.nowSpinning!;
  const track = nowSpinning.track;
  const played = timeAgoLabel(nowSpinning.playedAt);

  if (widget.size === "xs" || widget.size === "l") {
    return (
      <div className="absolute inset-0">
        <CoverImg src={track.imagesrc} alt={track.title} />
        {widget.size === "l" ? (
          <>
            <Scrim strong />
            <div className="absolute inset-0 flex items-end justify-between gap-2.5 p-3">
              <div className="min-w-0 flex-1">
                <p className="mb-0.5 flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/70">
                  <span
                    className="canvas-live-dot inline-block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: ctx.accent }}
                  />
                  <span suppressHydrationWarning>Now Spinning · {played}</span>
                </p>
                <p className="truncate text-[17px] font-extrabold tracking-tight text-white">
                  {track.title}
                </p>
                {track.artistName && (
                  <p className="truncate text-[12px] font-medium text-white/70">
                    {track.artistName}
                  </p>
                )}
              </div>
              <PlayChip url={track.previewUrl} size="lg" />
            </div>
          </>
        ) : (
          <>
            <FrostChip className="left-1.5 top-1.5">
              <span suppressHydrationWarning>{played}</span>
            </FrostChip>
            <PlayChip
              url={track.previewUrl}
              className="absolute bottom-1.5 right-1.5"
            />
          </>
        )}
      </div>
    );
  }

  // s / m — half-bleed art + text.
  const small = widget.size === "s";
  return (
    <div className="absolute inset-0 flex items-center">
      <div className="relative h-full shrink-0" style={{ aspectRatio: "1 / 1" }}>
        <CoverImg src={track.imagesrc} alt={track.title} />
        <PlayChip url={track.previewUrl} className="absolute bottom-1.5 right-1.5" />
      </div>
      <div className="min-w-0 flex-1 px-3">
        <p
          className="flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em]"
          style={{ color: ctx.accent }}
        >
          <span
            className="canvas-live-dot inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: ctx.accent }}
          />
          <span suppressHydrationWarning>
            {small ? `Now · ${played}` : `Now spinning · ${played}`}
          </span>
        </p>
        <p className="mt-0.5 line-clamp-2 text-[15px] font-extrabold tracking-tight text-neutral-900">
          {track.title}
        </p>
        {!small && track.artistName && (
          <p className="truncate text-[11px] font-medium text-neutral-500">
            {track.artistName}
          </p>
        )}
      </div>
    </div>
  );
};

const StatTile: React.FC<{ widget: CanvasWidget; ctx: WidgetCtx }> = ({
  widget,
  ctx,
}) => {
  const key = widget.data?.stat ?? "streak";
  const value = ctx.content.stats?.[key] ?? 0;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-3">
      <p className="text-[20px] font-extrabold tracking-tight text-neutral-900 tabular-nums">
        {value.toLocaleString()}
      </p>
      <p
        className="text-center text-[9px] font-extrabold uppercase tracking-[0.14em]"
        style={{ color: ctx.accent }}
      >
        {CANVAS_STAT_LABELS[key] ?? key}
      </p>
    </div>
  );
};

const ArtistTile: React.FC<{ widget: CanvasWidget; ctx: WidgetCtx }> = ({
  widget,
  ctx,
}) => {
  const pin = ctx.content.pins?.[widget.id];
  if (!pin) return null;

  if (widget.size === "l") {
    return (
      <MediaTile
        widget={widget}
        eyebrow="Artist"
        title={pin.title}
        subtitle={pin.subtitle}
        imagesrc={pin.imagesrc}
      />
    );
  }

  if (widget.size === "xs") {
    // Art-only, full-bleed — same as the album/song 1×1.
    return (
      <div className="absolute inset-0">
        <CoverImg src={pin.imagesrc} alt={pin.title} />
      </div>
    );
  }

  // s — round portrait + name.
  return (
    <div className="absolute inset-0 flex items-center gap-3 p-3">
      <div
        className="relative h-full shrink-0 overflow-hidden rounded-full"
        style={{ aspectRatio: "1 / 1" }}
      >
        <CoverImg src={pin.imagesrc} alt={pin.title} />
      </div>
      <div className="min-w-0 flex-1">
        <p
          className="text-[9px] font-extrabold uppercase tracking-[0.14em]"
          style={{ color: ctx.accent }}
        >
          Artist
        </p>
        <p className="mt-0.5 truncate text-[15px] font-extrabold tracking-tight text-neutral-900">
          {pin.title}
        </p>
        {pin.subtitle && (
          <p className="truncate text-[11px] font-medium capitalize text-neutral-500">
            {pin.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

const ListTile: React.FC<{
  widget: CanvasWidget;
  ctx: WidgetCtx;
  variant: "collection" | "playlist";
}> = ({ widget, ctx, variant }) => {
  const list = ctx.content.lists?.[widget.id];
  if (!list) return null;
  const covers = list.coverImages ?? [];
  const label = variant === "collection" ? "Collection" : "Playlist";
  const countLabel = `${list.itemCount} ${
    variant === "collection" ? "albums" : "songs"
  }`;

  const Mosaic = (
    <div className="grid h-full w-full grid-cols-2 grid-rows-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="relative">
          <CoverImg src={covers[i] ?? covers[0] ?? null} alt="" />
        </div>
      ))}
    </div>
  );

  if (widget.size === "xs") {
    return (
      <div className="absolute inset-0">
        {covers.length >= 4 ? (
          Mosaic
        ) : (
          <CoverImg src={covers[0] ?? null} alt={list.name} />
        )}
        <Scrim />
        <div className="absolute inset-x-0 bottom-0 px-2 py-1.5">
          <p className="truncate text-[11px] font-bold text-white">{list.name}</p>
        </div>
      </div>
    );
  }

  if (widget.size === "l") {
    return (
      <div className="absolute inset-0 flex">
        <div className="relative h-full shrink-0" style={{ aspectRatio: "1 / 1" }}>
          {covers.length >= 4 ? Mosaic : <CoverImg src={covers[0] ?? null} alt="" />}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center px-4">
          <p
            className="text-[9px] font-extrabold uppercase tracking-[0.14em]"
            style={{ color: ctx.accent }}
          >
            {label}
          </p>
          <p className="mt-1 line-clamp-2 text-[17px] font-extrabold tracking-tight text-neutral-900">
            {list.name}
          </p>
          <p className="mt-0.5 text-[11px] font-medium text-neutral-500">
            {countLabel}
          </p>
        </div>
      </div>
    );
  }

  // s — half-bleed cover + name/count.
  return (
    <div className="absolute inset-0 flex items-center">
      <div className="relative h-full shrink-0" style={{ aspectRatio: "1 / 1" }}>
        {covers.length >= 4 ? Mosaic : <CoverImg src={covers[0] ?? null} alt="" />}
      </div>
      <div className="min-w-0 flex-1 px-3">
        <p
          className="text-[9px] font-extrabold uppercase tracking-[0.14em]"
          style={{ color: ctx.accent }}
        >
          {label}
        </p>
        <p className="mt-0.5 line-clamp-2 text-[14px] font-extrabold tracking-tight text-neutral-900">
          {list.name}
        </p>
        <p className="truncate text-[11px] font-medium text-neutral-500">
          {countLabel}
        </p>
      </div>
    </div>
  );
};

const BadgeTile: React.FC<{ widget: CanvasWidget; ctx: WidgetCtx }> = ({
  widget,
  ctx,
}) => {
  const badge = ctx.content.badges?.[widget.id];
  if (!badge) return null;

  if (badge.instance?.imagesrc) {
    return (
      <div className="absolute inset-0">
        <CoverImg src={badge.instance.imagesrc} alt={badge.instance.title} />
        <Scrim />
        <div className="absolute inset-x-0 bottom-0 px-2 py-2">
          <p className="truncate text-[11px] font-extrabold text-white">
            {badge.name}
          </p>
          <p className="truncate text-[9px] font-medium text-white/70">
            {badge.instance.title}
          </p>
        </div>
        <FrostChip className="right-1.5 top-1.5">
          {badge.counter && badge.counter > 1 ? `×${badge.counter}` : "★"}
        </FrostChip>
      </div>
    );
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-2 text-center"
      style={{
        background: `linear-gradient(140deg, ${ctx.accent}26, ${ctx.accent}0d)`,
      }}
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full text-[15px]"
        style={{ backgroundColor: `${ctx.accent}2a`, color: ctx.accent }}
      >
        ★
      </span>
      <p className="line-clamp-2 text-[10px] font-extrabold leading-tight text-neutral-900">
        {badge.name}
        {badge.counter && badge.counter > 1 ? ` ×${badge.counter}` : ""}
      </p>
    </div>
  );
};

const GifTile: React.FC<{ widget: CanvasWidget }> = ({ widget }) => (
  <div className="absolute inset-0">
    <CoverImg src={widget.data?.gifUrl ?? null} alt="GIF" />
  </div>
);

const VinylDisc: React.FC<{ labelUri: string | null }> = ({ labelUri }) => (
  <div
    className="relative h-full overflow-hidden rounded-full"
    style={{
      aspectRatio: "1 / 1",
      background:
        "radial-gradient(circle, #1c1c1c 0%, #111 45%, #191919 60%, #0d0d0d 100%)",
      boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
    }}
  >
    {[62, 76, 90].map((pct) => (
      <div
        key={pct}
        className="absolute rounded-full border border-white/10"
        style={{
          width: `${pct}%`,
          height: `${pct}%`,
          left: `${(100 - pct) / 2}%`,
          top: `${(100 - pct) / 2}%`,
        }}
      />
    ))}
    <div
      className="absolute left-1/2 top-1/2 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.15)" }}
    >
      {labelUri ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={labelUri} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-neutral-700" />
      )}
      <div className="absolute left-1/2 top-1/2 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black" />
    </div>
  </div>
);

const VinylTile: React.FC<{ widget: CanvasWidget; ctx: WidgetCtx }> = ({
  widget,
  ctx,
}) => {
  const pin = ctx.content.pins?.[widget.id];
  if (!pin) return null;

  if (widget.size === "xs") {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-2.5">
        <VinylDisc labelUri={pin.imagesrc} />
      </div>
    );
  }

  // s / m — sleeve flush left with the disc peeking out, text beside it.
  return (
    <div className="absolute inset-0 flex items-center overflow-hidden">
      <div className="relative h-full shrink-0" style={{ aspectRatio: "1.42 / 1" }}>
        <div
          className="absolute bottom-[9%] right-0 top-[9%]"
          style={{ aspectRatio: "1 / 1", left: "28%" }}
        >
          <VinylDisc labelUri={pin.imagesrc} />
        </div>
        <div
          className="absolute bottom-0 left-0 top-0 overflow-hidden rounded-r-md"
          style={{ aspectRatio: "1 / 1", boxShadow: "2px 0 8px rgba(0,0,0,0.25)" }}
        >
          {pin.imagesrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={pin.imagesrc}
              alt={pin.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-black/10" />
          )}
        </div>
      </div>
      <div className="min-w-0 flex-1 px-3">
        <p
          className="text-[9px] font-extrabold uppercase tracking-[0.14em]"
          style={{ color: ctx.accent }}
        >
          Vinyl
        </p>
        <p className="mt-0.5 line-clamp-2 text-[14px] font-extrabold tracking-tight text-neutral-900">
          {pin.title}
        </p>
        {pin.subtitle && (
          <p className="truncate text-[11px] font-medium text-neutral-500">
            {pin.subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

function renderWidget(widget: CanvasWidget, ctx: WidgetCtx): React.ReactNode {
  switch (widget.kind) {
    case "pinned_album": {
      const pin = widget.data?.albumId
        ? ctx.content.pins?.[widget.id]
        : albumFromLegacyPin(ctx.profile.pinnedAlbum);
      if (!pin) return null;
      return (
        <MediaTile
          widget={widget}
          eyebrow="Album"
          title={pin.title}
          subtitle={pin.subtitle}
          imagesrc={pin.imagesrc}
        />
      );
    }
    case "pinned_song": {
      const pin = widget.data?.trackId
        ? ctx.content.pins?.[widget.id]
        : songFromLegacyPin(ctx.profile.pinnedTrack);
      if (!pin) return null;
      return (
        <MediaTile
          widget={widget}
          eyebrow="Song"
          title={pin.title}
          subtitle={pin.subtitle}
          imagesrc={pin.imagesrc}
          previewUrl={pin.previewUrl}
        />
      );
    }
    case "pinned_artist":
      return <ArtistTile widget={widget} ctx={ctx} />;
    case "top_five":
      return <TopFiveTile ctx={ctx} />;
    case "now_spinning":
      return <NowSpinningTile widget={widget} ctx={ctx} />;
    case "stat_tile":
      return <StatTile widget={widget} ctx={ctx} />;
    case "pinned_review": {
      const review = ctx.content.reviews?.[widget.id];
      if (!review) return null;
      const isSong = review.type === "song_ranking";
      const contextLine = [
        isSong ? "Song" : "Album",
        review.artistName,
        isSong ? review.albumName : null,
      ]
        .filter(Boolean)
        .join("  ·  ");
      return (
        <MediaTile
          widget={widget}
          title={review.title}
          subtitle={widget.size === "s" ? review.artistName : contextLine}
          imagesrc={review.imagesrc}
          scorePill={review.score != null ? Number(review.score) : null}
          quote={review.review}
        />
      );
    }
    case "pinned_collection":
      return <ListTile widget={widget} ctx={ctx} variant="collection" />;
    case "pinned_playlist":
      return <ListTile widget={widget} ctx={ctx} variant="playlist" />;
    case "badge":
      return <BadgeTile widget={widget} ctx={ctx} />;
    case "gif":
      return <GifTile widget={widget} />;
    case "vinyl":
      return <VinylTile widget={widget} ctx={ctx} />;
    default:
      return null;
  }
}

// ---------- header ----------

const LINK_LABELS: Record<string, string> = {
  instagram: "Instagram",
  twitter: "X",
  tiktok: "TikTok",
  spotify: "Spotify",
  apple_music: "Apple Music",
  soundcloud: "SoundCloud",
  bandcamp: "Bandcamp",
  youtube: "YouTube",
  airbuds: "Airbuds",
  letterboxd: "Letterboxd",
  goodreads: "Goodreads",
  stats_fm: "stats.fm",
  custom: "Link",
};

const VerifiedCheck: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Verified">
    <path
      fill="#f5b301"
      d="M12 1.5l2.44 2.06 3.13-.55.9 3.05 2.83 1.47-1.1 2.98 1.1 2.98-2.83 1.47-.9 3.05-3.13-.55L12 19.5l-2.44-2.06-3.13.55-.9-3.05L2.7 13.5l1.1-2.99-1.1-2.98 2.83-1.47.9-3.05 3.13.55L12 1.5z"
    />
    <path
      fill="#fff"
      d="M10.7 14.2l-2.2-2.2 1.06-1.06 1.14 1.14 3.64-3.64 1.06 1.06-4.7 4.7z"
    />
  </svg>
);

function OpenInEchoButton({ userId }: { userId: number }) {
  const open = useCallback(() => {
    window.location.href = `echo://user/${userId}`;
    const isAndroid = /Android/.test(navigator.userAgent);
    setTimeout(() => {
      window.location.href = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;
    }, 1600);
  }, [userId]);

  return (
    <button
      onClick={open}
      className="w-full rounded-full bg-neutral-900 py-3 text-[15px] font-semibold text-white transition-opacity hover:opacity-85"
    >
      Open in Echo
    </button>
  );
}

// ---------- page ----------

export interface ProfileViewProps {
  profile: EchoFullProfile;
  content: CanvasContent;
  links: EchoProfileLink[];
}

export default function ProfileView({ profile, content, links }: ProfileViewProps) {
  const fullName =
    [profile.firstname, profile.lastname].filter(Boolean).join(" ").trim() ||
    profile.displayname;

  const canvas = profile.profile_canvas;
  const ownerIsPlus = profileHasActivePlus(profile);
  const accent = resolveAccent(canvas?.palette?.accent);

  let widgets: CanvasWidget[] = [];
  if (canvas?.enabled && Array.isArray(canvas.widgets)) {
    widgets = visibleWidgets(
      normalizeWidgetSizes(canvas.widgets),
      content,
      {
        pinnedTrack: profile.pinnedTrack,
        pinnedAlbum: profile.pinnedAlbum,
        topAlbums: profile.topAlbums,
      },
      ownerIsPlus
    );
  }
  const cells = computeCanvasCells(widgets);
  const ctx: WidgetCtx = { content, profile, accent };

  const stats: { label: string; value: number }[] = [
    { label: "Rankings", value: profile.rankingsCount },
    { label: "Followers", value: profile.followersCount },
    { label: "Following", value: profile.followingCount },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <div className="mx-auto w-full max-w-2xl px-4 pb-16 pt-10 sm:px-6">
        {/* Header */}
        <header className="flex items-start gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-neutral-100 sm:h-24 sm:w-24">
            {profile.imagesrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.imagesrc}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-neutral-400">
                {fullName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <h1 className="truncate text-[22px] font-extrabold tracking-tight">
                {fullName}
              </h1>
              {profile.verified && <VerifiedCheck />}
            </div>
            <p className="text-[15px] font-medium text-sky-600">
              @{profile.displayname}
            </p>
            {profile.location && (
              <p className="mt-1 flex items-center gap-1 text-[13px] text-neutral-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
                </svg>
                {profile.location}
              </p>
            )}
            {profile.bio && (
              <p className="mt-1.5 whitespace-pre-line text-[14px] leading-snug text-neutral-800">
                {profile.bio}
              </p>
            )}
          </div>
        </header>

        {/* Stats */}
        <div className="mt-5 flex items-center gap-6">
          {stats.map((s) => (
            <p key={s.label} className="text-[14px] text-neutral-500">
              <span className="font-extrabold tabular-nums text-neutral-900">
                {formatCount(s.value)}
              </span>{" "}
              {s.label}
            </p>
          ))}
        </div>

        {/* Profile links */}
        {links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-neutral-200 px-3.5 py-1.5 text-[13px] font-semibold text-neutral-700 transition-colors hover:border-neutral-400"
              >
                {link.label || LINK_LABELS[link.link_type] || link.link_type}
              </a>
            ))}
          </div>
        )}

        <div className="mt-5">
          <OpenInEchoButton userId={profile.id} />
        </div>

        {/* Canvas */}
        {widgets.length > 0 ? (
          <section className="mt-8">
            <p
              className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              Canvas
            </p>
            <div className="canvas-container">
              <div className="canvas-grid">
                {widgets.map((widget, i) => {
                  const cell = cells[i];
                  return (
                    <div
                      key={widget.id}
                      className="relative overflow-hidden rounded-2xl bg-neutral-900/[0.04]"
                      style={{
                        gridColumn: `${cell.col + 1} / span ${cell.w}`,
                        gridRow: `${cell.row + 1} / span ${cell.h}`,
                      }}
                    >
                      {renderWidget(widget, ctx)}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          (profile.topAlbums ?? []).length > 0 && (
            <section className="mt-8">
              <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-neutral-400">
                Top Albums
              </p>
              <div className="flex gap-2 overflow-hidden rounded-2xl">
                {(profile.topAlbums ?? []).slice(0, 5).map((album: any, i) => (
                  <div key={album.id ?? i} className="relative flex-1">
                    <div className="aspect-square w-full overflow-hidden">
                      {album.imagesrc ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={album.imagesrc}
                          alt={album.title ?? ""}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="h-full w-full bg-neutral-100" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        )}

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center gap-2 text-center">
          <p className="text-[13px] text-neutral-400">
            <a href="https://echorank.app" className="font-semibold text-neutral-600">
              Echo
            </a>{" "}
            - Rank music!
          </p>
          <div className="flex gap-4 text-[13px]">
            <a href={APP_STORE_URL} className="text-sky-600 underline">
              App Store
            </a>
            <a href={PLAY_STORE_URL} className="text-sky-600 underline">
              Google Play
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
