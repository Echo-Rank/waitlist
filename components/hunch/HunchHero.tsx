"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { AlphaBadge, Decode, useInView } from "./kit";

/** The film's opening on a black stage: a dot swells into the Echo mark, then the name decodes. */
export function HunchHero() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section aria-labelledby="hunch-title" className="hunch-stage relative overflow-hidden rounded-[32px] text-white sm:rounded-[44px]">
      <div aria-hidden className="hunch-field" />
      <div className="relative flex min-h-[540px] flex-col items-center justify-center px-6 py-20 text-center sm:min-h-[640px]">
        <div aria-hidden className="relative h-16 w-16 sm:h-20 sm:w-20">
          <span className="hunch-dot" />
          <Image src="/hunch/mark.png" alt="" width={246} height={256} priority className="hunch-mark" />
        </div>

        <h1 id="hunch-title" className="hunch-in mt-10 text-[2.9rem] font-semibold leading-none tracking-[-0.03em] sm:mt-12 sm:text-7xl lg:text-[5.5rem]" style={{ animationDelay: "1250ms" }}>
          <span className="sr-only">Meet Hunch 1.0.</span>
          <span aria-hidden>Meet </span>
          <br aria-hidden className="sm:hidden" />
          <span aria-hidden className="whitespace-nowrap">
            <Decode text="HUNCH 1.0" play={ready} delay={1300} replayOnHover className="font-hunch cursor-default tracking-[0.04em]" />
            .
          </span>
        </h1>

        <p className="hunch-in font-display-sf mt-6 text-xl text-[#A1A1A6] sm:text-[1.7rem]" style={{ animationDelay: "1750ms" }}>
          Echo’s new recommendation model.
        </p>

        <div className="hunch-in mt-8 flex items-center gap-3" style={{ animationDelay: "2050ms" }}>
          <AlphaBadge />
          <span className="font-hunch text-[13px] text-white/50">Released October 2, 2026</span>
        </div>
      </div>
    </section>
  );
}

/** The film's last frame: HUNCH 1.0, ALPHA, by Echo. Decodes when it scrolls in. */
export function HunchEndCard() {
  const [ref, inView] = useInView<HTMLDivElement>("-20% 0px");
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    if (inView) setPlayed(true);
  }, [inView]);

  return (
    <div ref={ref} className="hunch-stage relative overflow-hidden rounded-[32px] text-white sm:rounded-[44px]">
      <div aria-hidden className="hunch-field" />
      <div className="relative flex min-h-[420px] flex-col items-center justify-center gap-6 px-6 py-20 text-center sm:min-h-[520px]">
        <p className="whitespace-nowrap text-[2.9rem] font-semibold leading-none sm:text-8xl lg:text-[8.5rem]">
          <span className="sr-only">Hunch 1.0 by Echo, alpha.</span>
          <Decode text="HUNCH 1.0" play={played} replayOnHover className="font-hunch cursor-default tracking-[0.06em]" />
        </p>
        <div className={`flex items-center gap-4 transition duration-700 ${played ? "opacity-100" : "translate-y-2 opacity-0"}`} style={{ transitionDelay: "700ms" }}>
          <AlphaBadge />
          <span className="font-display-sf text-2xl font-semibold text-[#A1A1A6] sm:text-3xl">by Echo</span>
        </div>
      </div>
    </div>
  );
}
