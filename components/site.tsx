import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaApple, FaDiscord, FaGooglePlay, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export const APP_STORE_URL =
  "https://apps.apple.com/app/echo-rank-rate-relisten/id6717572746";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo";

export const SOCIALS = [
  {
    href: "https://instagram.com/echodotapp",
    label: "Instagram",
    Icon: RiInstagramFill,
  },
  { href: "https://twitter.com/echodotapp", label: "X", Icon: FaXTwitter },
  { href: "https://discord.gg/YBEyaEd2dG", label: "Discord", Icon: FaDiscord },
  {
    href: "https://www.reddit.com/r/echorank/",
    label: "Reddit",
    Icon: FaReddit,
  },
];

/** Pastel wash lifted from the App Store cards: lavender at the top settling
 *  into pink. Fixed at 1600px so long policy pages don't stretch it flat. */
export function Surface({ children }: { children: ReactNode }) {
  return (
    <div className="echo-surface relative min-h-screen overflow-hidden text-[#2B1F27]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[#CFCAF7] opacity-40 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-[45%] h-[36rem] w-[36rem] rounded-full bg-[#F9C6CB] opacity-40 blur-[120px]"
      />
      {/* Flex column so short pages (e.g. Careers) still pin their footer to
          the bottom of the viewport rather than leaving it mid-screen. */}
      <div className="relative flex min-h-screen flex-col">{children}</div>
    </div>
  );
}

export function EchoLockup({ size = "sm" }: { size?: "sm" | "lg" }) {
  const large = size === "lg";
  return (
    <span className="flex items-center gap-3 sm:gap-4">
      <Image
        src="/echo-tile.png"
        alt=""
        width={512}
        height={512}
        priority
        className={`rounded-[23%] shadow-[0_10px_30px_-10px_rgba(43,31,39,0.45)] ${
          large ? "h-14 w-14 sm:h-16 sm:w-16" : "h-9 w-9"
        }`}
      />
      <Image
        src="/echofont.png"
        alt="Echo"
        width={1379}
        height={431}
        priority
        className={`w-auto invert ${large ? "h-9 sm:h-11" : "h-[1.4rem]"}`}
      />
    </span>
  );
}

export function StoreButtons() {
  return (
    <>
      <Link
        href={APP_STORE_URL}
        target="_blank"
        className="flex items-center justify-center gap-2.5 rounded-full bg-[#191218] px-7 py-4 text-base font-medium text-white shadow-[0_14px_30px_-12px_rgba(25,18,24,0.7)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#241A22] hover:shadow-[0_18px_36px_-12px_rgba(25,18,24,0.75)] active:translate-y-0"
      >
        <FaApple size={20} className="-mt-0.5" />
        Download for iPhone
      </Link>
      <Link
        href={PLAY_STORE_URL}
        target="_blank"
        className="flex items-center justify-center gap-2.5 rounded-full bg-white/70 px-7 py-4 text-base font-medium text-[#2B1F27] shadow-[0_10px_26px_-14px_rgba(43,31,39,0.5)] ring-1 ring-inset ring-[#2B1F27]/10 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
      >
        <FaGooglePlay size={17} />
        Get it on Android
      </Link>
    </>
  );
}

export function SocialLinks() {
  return (
    <div className="flex gap-3">
      {SOCIALS.map(({ href, label, Icon }) => (
        <Link
          key={label}
          href={href}
          target="_blank"
          aria-label={label}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/60 text-[#2B1F27] ring-1 ring-inset ring-[#2B1F27]/[0.07] transition duration-200 hover:-translate-y-0.5 hover:bg-white"
        >
          <Icon className="h-[18px] w-[18px]" />
        </Link>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#2B1F27]/[0.08] px-6 py-12">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8">
        <SocialLinks />
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-[#6A5F6D]">
          <Link href="/privacy" className="transition hover:text-[#2B1F27]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition hover:text-[#2B1F27]">
            Terms of Service
          </Link>
          <Link href="/support" className="transition hover:text-[#2B1F27]">
            Contact Us
          </Link>
          <Link href="/careers" className="transition hover:text-[#2B1F27]">
            Careers
          </Link>
        </nav>
        <p className="text-sm text-[#6A5F6D]/70">Echo — Rank music!</p>
      </div>
    </footer>
  );
}

/** Shell for the content pages (privacy, support, careers). */
export function PageShell({
  title,
  meta,
  back = { href: "/", label: "Back to Home" },
  children,
}: {
  title: string;
  meta?: ReactNode;
  back?: { href: string; label: string };
  children: ReactNode;
}) {
  return (
    <Surface>
      <div className="mx-auto w-full max-w-3xl flex-1 px-6">
        <div className="flex items-center justify-between gap-4 py-8">
          <Link href="/" aria-label="Echo home" className="transition hover:opacity-70">
            <EchoLockup />
          </Link>
          <Link
            href={APP_STORE_URL}
            target="_blank"
            className="hidden items-center gap-2 rounded-full bg-[#191218] px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#241A22] sm:flex"
          >
            <FaApple size={15} className="-mt-0.5" />
            Get Echo
          </Link>
        </div>

        <header className="pb-10 pt-8">
          <h1 className="text-balance text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            {title}
          </h1>
          {meta && (
            <p className="mt-4 text-pretty text-base text-[#6A5F6D]">{meta}</p>
          )}
        </header>

        <div className="page-prose pb-16">{children}</div>

        <div className="border-t border-[#2B1F27]/[0.08] py-10">
          <Link
            href={back.href}
            className="text-sm text-[#6A5F6D] transition hover:text-[#2B1F27]"
          >
            ← {back.label}
          </Link>
        </div>
      </div>

      <SiteFooter />
    </Surface>
  );
}

/** Glass card used to group content inside a PageShell. */
export function Card({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-5 rounded-2xl bg-white/55 p-6 ring-1 ring-inset ring-[#2B1F27]/[0.07] backdrop-blur sm:p-7">
      {title && (
        <h2 className="!mt-0 text-xl font-semibold tracking-[-0.02em] text-[#2B1F27]">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
