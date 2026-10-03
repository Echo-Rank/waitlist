import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import type { ReactNode } from "react";
import { FaApple } from "react-icons/fa";

import { APP_STORE_URL, EchoLockup, SiteFooter, StoreButtons, Surface } from "@/components/site";
import { HunchEndCard, HunchHero } from "@/components/hunch/HunchHero";
import { LearnDemo, ListenersDemo, PersonalDemo, PredictDemo, PrivateDemo, ShelfDemo } from "@/components/hunch/demos";

const bricolage = localFont({
  src: "../../public/fonts/BricolageGrotesque_800ExtraBold.ttf",
  weight: "800",
  variable: "--font-bricolage",
});

const DESCRIPTION =
  "Hunch 1.0 is Echo’s new recommendation model. It learns from every album and song you rank, finds listeners who rate like you, and predicts what you’d rank it.";

export const metadata: Metadata = {
  title: "Hunch 1.0 by Echo",
  description: DESCRIPTION,
  openGraph: { title: "Meet Hunch 1.0", description: DESCRIPTION },
  twitter: { card: "summary", title: "Meet Hunch 1.0", description: DESCRIPTION },
};

function Feature({
  title,
  children,
  demo,
  flip = false,
}: {
  title: string;
  children: ReactNode;
  demo: ReactNode;
  flip?: boolean;
}) {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={flip ? "md:order-2" : undefined}>
        <h2 className="font-display-sf text-balance text-[2rem] font-semibold leading-[1.05] text-[#2B1F27] sm:text-[2.75rem]">
          {title}
        </h2>
        <p className="mt-5 max-w-[34rem] text-pretty text-lg leading-relaxed text-[#6A5F6D]">{children}</p>
      </div>
      <div className={`mx-auto w-full max-w-[30rem] ${flip ? "md:order-1" : ""}`}>{demo}</div>
    </section>
  );
}

export default function HunchPage() {
  return (
    <Surface>
      <div className={`hunch-page ${bricolage.variable}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-8">
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

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <HunchHero />
        </div>

        {/* ------------------------------------------------------------ Intro */}
        <section className="mx-auto grid max-w-6xl gap-8 px-6 pb-24 pt-20 md:grid-cols-[1.3fr_1fr] md:gap-16 md:pt-28">
          <p className="font-display-sf text-balance text-[2rem] font-semibold leading-[1.08] text-[#2B1F27] sm:text-5xl">
            A machine learning model of your taste, built from every score you give.
          </p>
          <div className="md:pt-2">
            <p className="text-pretty text-lg leading-relaxed text-[#6A5F6D]">
              Hunch 1.0 studies how you rank albums and songs. It finds the listeners whose scores line up with
              yours, and predicts how you’ll rate music you haven’t heard yet: a score out of ten, before you press
              play.
            </p>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-[#6A5F6D]">
              The more you rank, the more it has to learn from.
            </p>
          </div>
        </section>

        {/* --------------------------------------------------------- Features */}
        <div className="mx-auto flex max-w-6xl flex-col gap-28 px-6 pb-28 md:gap-36">
          <Feature title="It learns from every album and song you rank." demo={<LearnDemo />}>
            Every score is a signal. Hunch 1.0 reads the artist, the genre and the decade behind each one, and fits
            a model of how you rate. Yours alone.
          </Feature>

          <Feature flip title="It finds listeners who rate like you." demo={<ListenersDemo />}>
            Hunch 1.0 looks across Echo for people whose scores line up with yours. What they loved, and you
            haven’t heard, comes to the top.
          </Feature>

          <Feature title="Then it predicts what you’d rank it." demo={<PredictDemo />}>
            Every recommendation carries a Hunch: your predicted score out of ten, made before you listen. Rank it
            yourself and see how close it came.
          </Feature>

          <Feature flip title="The more you rank, the more it sounds like you." demo={<PersonalDemo />}>
            Hunch 1.0 starts from listeners who rate like you. Each ranking pulls it toward your own taste: the
            artists you return to, the genres you skip, the decades you live in.
          </Feature>

          <section className="grid gap-6 md:grid-cols-[1.45fr_1fr]">
            <div>
              <ShelfDemo />
              <h2 className="font-display-sf mt-8 text-2xl font-semibold text-[#2B1F27] sm:text-3xl">
                Albums. Tracks. Artists.
              </h2>
              <p className="mt-3 max-w-md text-pretty text-lg leading-relaxed text-[#6A5F6D]">
                Recommendations across all three, each with a Hunch score.
              </p>
            </div>
            <div>
              <PrivateDemo />
              <h2 className="font-display-sf mt-8 text-2xl font-semibold text-[#2B1F27] sm:text-3xl">Private to you.</h2>
              <p className="mt-3 max-w-md text-pretty text-lg leading-relaxed text-[#6A5F6D]">
                Your Hunch scores are for you. Turn them off and they stay hidden until you tap to view.
              </p>
            </div>
          </section>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <HunchEndCard />
        </div>

        <section className="mx-auto max-w-2xl px-6 pb-20 pt-20 text-center">
          <h2 className="text-balance text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Rank. Rate. Relisten.</h2>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <StoreButtons />
          </div>
        </section>

        <SiteFooter />
      </div>
    </Surface>
  );
}
