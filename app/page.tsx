import Image from "next/image";
import {
  EchoLockup,
  SiteFooter,
  SocialLinks,
  StoreButtons,
  Surface,
} from "@/components/site";

const SHOTS = [
  {
    src: "/screenshots/01-social-network.webp",
    alt: "Echo's Rank tab, showing a daily lineup and today's picks",
  },
  {
    src: "/screenshots/02-connect.webp",
    alt: "The Echo feed, with discussions from the people you follow",
  },
  {
    src: "/screenshots/03-rank.webp",
    alt: "Ranking music on Echo by comparing two albums head to head",
  },
  {
    src: "/screenshots/04-hot-takes.webp",
    alt: "An Echo discussion thread full of hot takes and tagged albums",
  },
  {
    src: "/screenshots/05-charts.webp",
    alt: "The Echo 100 chart, the Pulse swipe deck, and a profile canvas",
  },
];

export default function Home() {
  return (
    <Surface>
      {/* ------------------------------------------------------------- Hero */}
      <header className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-24 text-center sm:pt-28">
        <div className="rise">
          <EchoLockup size="lg" />
        </div>

        {/* Balanced wrapping only from `sm` up — at phone widths it strands
            "network" on its own line, where the greedy wrap reads better. */}
        <h1
          className="rise mt-10 text-[2.75rem] font-bold leading-[0.98] tracking-[-0.045em] sm:text-balance sm:text-6xl lg:text-[4.25rem]"
          style={{ animationDelay: "60ms" }}
        >
          The new social network for music.
        </h1>

        <p
          className="rise mt-6 max-w-md text-pretty text-lg leading-relaxed text-[#6A5F6D] sm:text-xl"
          style={{ animationDelay: "120ms" }}
        >
          Rank what you love, drop your hot takes, and climb the charts with
          friends.
        </p>

        <div
          className="rise mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
          style={{ animationDelay: "180ms" }}
        >
          <StoreButtons />
        </div>

        <div className="rise mt-8" style={{ animationDelay: "240ms" }}>
          <SocialLinks />
        </div>

        <div
          className="rise mt-10 hidden items-center gap-3.5 rounded-2xl bg-white/55 p-3 pr-5 ring-1 ring-inset ring-[#2B1F27]/[0.07] backdrop-blur lg:flex"
          style={{ animationDelay: "300ms" }}
        >
          <Image
            src="/qrcode.png"
            alt="QR code linking to the Echo app download"
            width={200}
            height={200}
            className="h-20 w-20 rounded-lg"
          />
          <span className="text-left text-sm leading-snug text-[#6A5F6D]">
            Scan to download
            <br />
            on your phone
          </span>
        </div>
      </header>

      {/* ------------------------------------------------------- Screenshots */}
      <section aria-labelledby="inside" className="pb-20">
        <h2
          id="inside"
          className="px-6 text-center text-xs font-medium uppercase tracking-[0.22em] text-[#6A5F6D]/70"
        >
          A look inside
        </h2>

        {/* The inner track is `w-max mx-auto` so the five cards centre when
            they fit and scroll from the left edge when they don't. */}
        <div className="shot-rail mt-8 snap-x snap-mandatory overflow-x-auto pb-6">
          <div className="mx-auto flex w-max gap-4 px-6 sm:gap-6 sm:px-10">
            {SHOTS.map(({ src, alt }) => (
              <div
                key={src}
                className="w-60 shrink-0 snap-center overflow-hidden rounded-[26px] shadow-[0_24px_60px_-28px_rgba(43,31,39,0.5)] ring-1 ring-inset ring-[#2B1F27]/[0.06] transition duration-300 hover:-translate-y-1.5 sm:w-64"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={1170}
                  height={2536}
                  sizes="(min-width: 640px) 256px, 240px"
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- Closing */}
      <section className="mx-auto max-w-2xl px-6 pb-20 text-center">
        <h2 className="text-balance text-3xl font-bold tracking-[-0.035em] sm:text-4xl">
          Rank. Rate. Relisten.
        </h2>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <StoreButtons />
        </div>
      </section>

      <SiteFooter />
    </Surface>
  );
}
