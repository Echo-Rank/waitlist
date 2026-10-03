"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Echo's score ramp (light): red at 0, amber at 5, green at 10, linear in RGB.
   Like useScoreColor in the app, a score takes the colour of its integer step. */
const LOW = [210, 34, 45];
const MID = [255, 191, 0];
const HIGH = [0, 112, 0];

export function ramp(score: number): string {
  const s = Math.min(10, Math.max(0, Math.round(score)));
  const [a, b, t] = s <= 5 ? [LOW, MID, s / 5] : [MID, HIGH, (s - 5) / 5];
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True while the element is on screen (with a margin, so loops start just before they show). */
export function useInView<T extends Element>(margin = "15% 0px"): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: margin });
    io.observe(node);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView];
}

/** A demo surface. Its CSS loops run only while `data-run` is set, so they restart on every visit. */
export function Run({
  className,
  style,
  children,
  onRun,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  onRun?: (running: boolean) => void;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  useEffect(() => onRun?.(inView), [inView, onRun]);
  return (
    <div ref={ref} data-run={inView ? "1" : undefined} className={className} style={style}>
      {children}
    </div>
  );
}

/** Hugeicons Target02, the Hunch icon. */
export function Target02({ size = 16, stroke = 1.5, className }: { size?: number | string; stroke?: number; className?: string }) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      className={className}
    >
      <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7" />
      <path d="M14 2.20004C13.3538 2.06886 12.6849 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 11.3151 21.9311 10.6462 21.8 10" />
      <path d="M12.0303 11.9625L16.5832 7.4096M19.7404 4.34462L19.1872 2.35748C19.0853 2.03011 18.6914 1.89965 18.4259 2.11662C16.9898 3.29018 15.4254 4.87091 16.703 7.36419C19.2771 8.56455 20.7466 6.94584 21.8733 5.5853C22.0975 5.3146 21.9623 4.90767 21.6247 4.81005L19.7404 4.34462Z" />
    </svg>
  );
}

export function AlphaBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`font-hunch inline-block rounded-full border px-3 py-1 text-[11px] font-semibold leading-none tracking-[0.14em] ${
        tone === "light" ? "border-white/80 text-white" : "border-[#2B1F27]/60 text-[#2B1F27]"
      }`}
    >
      ALPHA
    </span>
  );
}

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+<>/=";

/**
 * The film's HUNCH decode: letters land left to right, each one scrambling for
 * `scramble` ms first. Writes straight to the DOM, no re-render per frame.
 */
export function Decode({
  text,
  play,
  delay = 0,
  per = 60,
  scramble = 300,
  replayOnHover = false,
  className,
}: {
  text: string;
  play: boolean;
  delay?: number;
  per?: number;
  scramble?: number;
  replayOnHover?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!play || prefersReducedMotion()) {
      node.textContent = play || prefersReducedMotion() ? text : text.replace(/\S/g, " ");
      return;
    }
    let raf = 0;
    const t0 = performance.now() + (round === 0 ? delay : 0);
    const tick = (now: number) => {
      const t = now - t0;
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ts = i * per;
        if (t < ts) out += " ";
        else if (t < ts + scramble && text[i] !== " ") out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        else out += text[i];
      }
      node.textContent = out;
      if (t < text.length * per + scramble) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, text, delay, per, scramble, round]);

  return (
    <span
      ref={ref}
      aria-hidden
      className={className}
      style={{ whiteSpace: "pre" }}
      onMouseEnter={replayOnHover ? () => setRound((r) => r + 1) : undefined}
    >
      {text}
    </span>
  );
}
