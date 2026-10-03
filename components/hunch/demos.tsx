"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { prefersReducedMotion, ramp, Run, Target02, useInView } from "./kit";

const CARD = "rounded-[28px] bg-white ring-1 ring-inset ring-[#2B1F27]/[0.06] shadow-[0_40px_80px_-48px_rgba(43,31,39,0.55)]";
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ------------------------------------------------------------------ Learn */

const GRID = [
  { src: "/hunch/1.jpg", score: 9.1 },
  { src: "/hunch/2.jpg", score: 6.4 },
  { src: "/hunch/3.jpg", score: 8.8 },
  { src: "/hunch/4.jpg", score: 3.2 },
  { src: "/hunch/billie-artist.jpg", score: 7.7, round: true },
  { src: "/hunch/5.jpg", score: 5.0 },
  { src: "/hunch/6.jpg", score: 8.2 },
  { src: "/hunch/7.jpg", score: 6.9 },
  { src: "/hunch/8.jpg", score: 9.4 },
];
// Tile centres on a 0–100 board: tiles are 30.67 wide with a 4 gap.
const C = [15.33, 50, 84.67];
const center = (i: number) => [C[i % 3], C[Math.floor(i / 3)]];
const THREADS = [
  { from: 0, to: 1, label: "Artist" },
  { from: 3, to: 7, label: "Genre" },
  { from: 5, to: 7, label: "Decade" },
];

/** Your ranked grid: each tile stamps its score on an eighth note, then threads link what they share. */
export function LearnDemo() {
  return (
    <Run className={`${CARD} hx-learn p-5 sm:p-8`}>
      <div className="relative aspect-square w-full">
        {GRID.map((tile, i) => {
          const [x, y] = center(i);
          return (
            <div
              key={tile.src}
              className="absolute"
              style={{ left: `${x - 15.33}%`, top: `${y - 15.33}%`, width: "30.67%", height: "30.67%" }}
            >
              <Image
                src={tile.src}
                alt=""
                width={300}
                height={300}
                sizes="140px"
                className={`h-full w-full object-cover shadow-[0_10px_24px_-14px_rgba(43,31,39,0.6)] ${tile.round ? "rounded-full" : "rounded-[14px]"}`}
              />
            </div>
          );
        })}

        <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {THREADS.map(({ from, to }) => {
            const [x1, y1] = center(from);
            const [x2, y2] = center(to);
            const d = `M${x1} ${y1} L${x2} ${y2}`;
            return (
              <g key={d} className="hx-thread">
                <path d={d} pathLength={1} stroke="rgba(43,31,39,0.28)" strokeWidth={1.6} strokeLinecap="round" fill="none" />
                <path d={d} pathLength={1} stroke="#fff" strokeWidth={0.9} strokeLinecap="round" fill="none" />
                <circle cx={x1} cy={y1} r={1.5} fill="#fff" />
                <circle cx={x2} cy={y2} r={1.5} fill="#fff" />
              </g>
            );
          })}
        </svg>

        {GRID.map((tile, i) => {
          const [x, y] = center(i);
          return (
            <span
              key={tile.src}
              className="hx-stamp font-score absolute -translate-x-1/2 rounded-full bg-white px-2.5 text-[15px] leading-[26px] shadow-[0_6px_16px_-6px_rgba(43,31,39,0.55)] sm:text-lg sm:leading-[30px]"
              style={{ left: `${x}%`, top: `${y + 9}%`, color: ramp(tile.score), ...vars({ "--d": `${200 + i * 234}ms` }) }}
            >
              {tile.score.toFixed(1)}
            </span>
          );
        })}

        {THREADS.map(({ from, to, label }) => {
          const [x1, y1] = center(from);
          const [x2, y2] = center(to);
          return (
            <span
              key={label}
              className="hx-chip absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2B1F27] px-3 text-xs font-semibold leading-7 text-white"
              style={{ left: `${(x1 + x2) / 2}%`, top: `${(y1 + y2) / 2}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </Run>
  );
}

/* -------------------------------------------------------------- Listeners */

function seeded(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
const DROPS = Array.from({ length: 30 }, (_, i) => {
  const angle = (i / 30) * Math.PI * 2 + seeded(i) * 0.5;
  const dist = 105 + seeded(i + 40) * 80;
  const x = 200 + Math.cos(angle) * dist;
  const y = 200 + Math.sin(angle) * dist;
  return { x, y, r: 6 + seeded(i + 80) * 6, agrees: i % 4 === 1 };
});
let merged = 0;
const DROPLETS = DROPS.map((d) => ({ ...d, order: d.agrees ? merged++ : -1 }));

/** You, as a droplet. Listeners who rate like you drift in and merge, one per eighth note. */
export function ListenersDemo() {
  return (
    <Run className="hunch-stage hx-listen relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_-48px_rgba(43,31,39,0.7)]">
      <div aria-hidden className="hunch-field opacity-70" />
      <svg aria-hidden viewBox="0 0 400 400" className="relative block aspect-square w-full">
        <defs>
          <filter id="hx-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
            <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
        <g filter="url(#hx-goo)" fill="#fff">
          <circle cx={200} cy={200} r={30} className="hx-you" />
          {DROPLETS.map((d, i) => (
            <g
              key={i}
              className={d.agrees ? "hx-merge" : "hx-away"}
              style={vars({
                "--dx": `${200 - d.x}px`,
                "--dy": `${200 - d.y}px`,
                "--ox": `${(d.x - 200) * 0.3}px`,
                "--oy": `${(d.y - 200) * 0.3}px`,
                "--d": `${d.agrees ? d.order * 234 : 0}ms`,
              })}
            >
              <circle cx={d.x} cy={d.y} r={d.r} className="hx-bob" style={vars({ "--b": `${(i % 5) * -0.7}s` })} />
            </g>
          ))}
        </g>
        <text x={200} y={205} textAnchor="middle" className="hx-you-label" fill="#0B0B0C" fontSize={15} fontWeight={600}>
          You
        </text>
      </svg>
    </Run>
  );
}

/* ---------------------------------------------------------------- Predict */

const PREDICT_CYCLE = 10000;
const YOURS = 7.6;

/**
 * The album header with Hunch · Global · Yours. Global lands whole, the reticle
 * hunts and locks, Hunch appears whole (it never counts up), then Yours counts
 * up like the in-app Score. Laid out in container units so it scales as one piece.
 */
export function PredictDemo() {
  const yours = useRef<HTMLSpanElement>(null);
  const [running, setRunning] = useState(false);
  const onRun = useCallback((r: boolean) => setRunning(r), []);

  useEffect(() => {
    const num = yours.current;
    if (!num) return;
    const show = (v: number | null) => {
      num.textContent = v === null ? "—" : v.toFixed(1);
      num.style.color = v === null ? "#A1A1A6" : ramp(v);
    };
    if (!running || prefersReducedMotion()) {
      show(YOURS);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = ((now - t0) % PREDICT_CYCLE) / PREDICT_CYCLE;
      if (p < 0.5 || p > 0.93) show(null);
      else {
        const u = Math.min(1, (p - 0.5) / 0.06);
        show(YOURS * (1 - Math.pow(1 - u, 3)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <Run onRun={onRun} className={`${CARD} hx-predict relative overflow-hidden`} style={{ containerType: "inline-size" }}>
      <div className="relative" style={{ height: "82cqw" }}>
        <Image
          src="/hunch/prima.jpg"
          alt="PRIMA by ADÉLA"
          width={600}
          height={600}
          sizes="200px"
          className="absolute object-cover shadow-[0_14px_30px_-16px_rgba(43,31,39,0.6)]"
          style={{ left: "7cqw", top: "7cqw", width: "30cqw", height: "30cqw", borderRadius: "3cqw" }}
        />
        <div className="absolute" style={{ left: "43cqw", top: "13cqw" }}>
          <p className="font-semibold tracking-[-0.02em] text-[#212529]" style={{ fontSize: "6cqw", lineHeight: 1.1 }}>PRIMA</p>
          <p className="text-[#595959]" style={{ fontSize: "3.8cqw", marginTop: "1.2cqw" }}>ADÉLA</p>
        </div>
        <div className="absolute bg-[#F0F0F0]" style={{ left: "7cqw", right: "7cqw", top: "44cqw", height: 1 }} />

        {/* Hunch */}
        <div className="absolute" style={{ left: "7cqw", top: "48.5cqw" }}>
          <p className="flex items-center font-medium text-[#595959]" style={{ fontSize: "3.3cqw", gap: "1cqw" }}>
            <span className="hx-label-icon inline-flex"><Target02 size="3.6cqw" /></span>
            Hunch
          </p>
          <span className="hx-skeleton absolute rounded-md bg-[#EDEDEF]" style={{ top: "8.5cqw", width: "15cqw", height: "7cqw" }} />
          <p className="hx-hunch font-score" style={{ fontSize: "10cqw", lineHeight: 1.15, color: ramp(8.4) }}>8.4</p>
        </div>

        {/* Global */}
        <div className="absolute" style={{ left: "36cqw", top: "48.5cqw" }}>
          <p className="font-medium text-[#595959]" style={{ fontSize: "3.3cqw" }}>Global</p>
          <p className="hx-global font-score" style={{ fontSize: "10cqw", lineHeight: 1.15, color: ramp(7.9) }}>7.9</p>
        </div>

        {/* Yours */}
        <div className="absolute" style={{ left: "65cqw", top: "48.5cqw" }}>
          <p className="font-medium text-[#595959]" style={{ fontSize: "3.3cqw" }}>Yours</p>
          <p className="font-score" style={{ fontSize: "10cqw", lineHeight: 1.15 }}>
            <span ref={yours} style={{ color: ramp(YOURS) }}>{YOURS.toFixed(1)}</span>
          </p>
        </div>

        <div className="hx-delta absolute flex items-center justify-between border-t border-[#F0F0F0] text-[#212529]" style={{ left: "7cqw", right: "7cqw", top: "70cqw", paddingTop: "3cqw", fontSize: "3.3cqw" }}>
          <span className="text-[#595959]">Your rating</span>
          <span className="font-medium tabular-nums">7.6 (−0.8)</span>
        </div>

        {/* Reticle: the Hunch icon grows into a lens, hunts across the art, and locks. */}
        <div aria-hidden className="hx-reticle absolute left-0 top-0 overflow-hidden rounded-full" style={{ width: "16cqw", height: "16cqw" }}>
          <Image
            src="/hunch/prima.jpg"
            alt=""
            width={600}
            height={600}
            sizes="200px"
            className="hx-reticle-art absolute left-0 top-0 max-w-none"
            style={{ width: "40.5cqw", height: "40.5cqw", borderRadius: "4cqw" }}
          />
          <span className="hx-reticle-icon absolute inset-0 flex items-center justify-center">
            <Target02 size="7cqw" stroke={1.4} />
          </span>
        </div>

        {/* iPadOS pointer: taps Yours. */}
        <span aria-hidden className="hx-pointer absolute left-0 top-0 rounded-full bg-[#8E8E93]/45" style={{ width: "4.4cqw", height: "4.4cqw" }} />
      </div>
    </Run>
  );
}

/* --------------------------------------------------------------- Personal */

const TASTE = ["ADÉLA", "House", "Alt-pop", "2010s", "Country", "Metal"];
const STEPS = [
  { count: 3, weights: [0.52, 0.5, 0.48, 0.5, 0.49, 0.51] },
  { count: 18, weights: [0.63, 0.58, 0.52, 0.49, 0.4, 0.45] },
  { count: 64, weights: [0.79, 0.67, 0.58, 0.55, 0.27, 0.34] },
  { count: 212, weights: [0.92, 0.74, 0.63, 0.6, 0.15, 0.22] },
];

/** Hunch starts from listeners like you; each ranking pulls its read of your taste toward you. */
export function PersonalDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [step, setStep] = useState(STEPS.length - 1);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) {
      setStep(STEPS.length - 1);
      return;
    }
    setStep(0);
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, [inView]);

  const { count, weights } = STEPS[step];
  return (
    <div ref={ref} className={`${CARD} p-6 sm:p-9`}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#595959]">Your rankings</p>
          <p key={count} className="hx-pop font-display-sf mt-1 text-5xl font-semibold tabular-nums text-[#212529] sm:text-6xl">
            {count}
          </p>
        </div>
        <p className="font-hunch pb-2 text-xs text-[#686868]">Hunch 1.0</p>
      </div>
      <div className="mt-8 flex flex-col gap-4">
        {TASTE.map((label, i) => (
          <div key={label} className="grid grid-cols-[5.5rem_1fr] items-center gap-4">
            <span className="truncate text-sm font-medium text-[#212529]">{label}</span>
            <span className="relative h-2.5 overflow-hidden rounded-full bg-[#2B1F27]/[0.06]">
              <span
                className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-[#123524] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `scaleX(${weights[i]})` }}
              />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Shelf */

const KINDS = [
  { label: "Albums", items: [["1", 8.6], ["2", 8.1], ["3", 7.9], ["4", 7.4]] },
  { label: "Tracks", items: [["9", 8.8], ["10", 8.3], ["11", 7.7], ["12", 7.5]] },
  { label: "Artists", items: [["sabrina", 8.4], ["badbunny", 8.0], ["billie-artist", 7.6], ["13", 7.3]] },
] as const;

/** Recommended for you: the segmented control steps Albums → Tracks → Artists. */
export function ShelfDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [kind, setKind] = useState(0);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const id = setInterval(() => setKind((k) => (k + 1) % KINDS.length), 2600);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={ref} className={`${CARD} overflow-hidden p-6 sm:p-8`}>
      <p className="text-xl font-semibold tracking-[-0.02em] text-[#212529]">Recommended for you</p>
      <div className="relative mt-4 grid grid-cols-3 rounded-full bg-[#EDEDEF] p-1">
        <span
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-white shadow-[0_2px_8px_-2px_rgba(43,31,39,0.25)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)]"
          style={{ transform: `translateX(${kind * 100}%)` }}
        />
        {KINDS.map((k, i) => (
          <button
            key={k.label}
            type="button"
            onClick={() => setKind(i)}
            className={`relative py-2 text-sm font-medium transition-colors ${i === kind ? "text-[#212529]" : "text-[#686868]"}`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <div key={kind} className="mt-6 grid grid-cols-4 gap-3">
        {KINDS[kind].items.map(([img, score], i) => (
          <div key={img} className="hx-card" style={{ animationDelay: `${i * 50}ms` }}>
            <Image
              src={`/hunch/${img}.jpg`}
              alt=""
              width={300}
              height={300}
              sizes="120px"
              className={`aspect-square w-full object-cover ${kind === 2 ? "rounded-full" : kind === 1 ? "rounded-lg" : "rounded-xl"}`}
            />
            <p className="mt-2 flex items-center gap-1 text-[#595959]">
              <Target02 size={13} />
              <span className="font-score text-[15px]" style={{ color: ramp(score) }}>{score.toFixed(1)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- Private */

/** Settings → Ranking → Hunch: the toggle goes off and the score hides until you tap. */
export function PrivateDemo() {
  return (
    <Run className={`${CARD} hx-private flex flex-col justify-between gap-8 p-6 sm:p-8`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium text-[#212529]">Show Hunch scores</p>
          <p className="mt-1 text-sm leading-snug text-[#686868]">Off hides predictions throughout the app until you tap to view.</p>
        </div>
        <span aria-hidden className="hx-toggle relative mt-0.5 h-[31px] w-[51px] shrink-0 rounded-full">
          <span className="hx-knob absolute left-[2px] top-[2px] h-[27px] w-[27px] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15)]" />
        </span>
      </div>
      <div className="flex items-end justify-between border-t border-[#F0F0F0] pt-5">
        <p className="flex items-center gap-1.5 text-sm font-medium text-[#595959]">
          <Target02 size={15} />
          Hunch
        </p>
        <span className="relative h-10 w-24 text-right">
          <span className="hx-shown font-score absolute right-0 top-0 text-[2rem] leading-10" style={{ color: ramp(8.4) }}>8.4</span>
          <span className="hx-hidden absolute right-0 top-0 text-sm leading-10 text-[#686868]">Tap to view</span>
        </span>
      </div>
    </Run>
  );
}
