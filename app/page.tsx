"use client";
import { DM_Serif_Display, Inter, Playfair_Display } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  weight: "600",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  return (
    <>
      <section className="w-screen min-h-dvh flex flex-col items-center justify-start bg-[#f5e8d3] dark:bg-[#2d4c4c] pt-28 md:pt-36">
        <main className="flex flex-col items-center gap-4 px-6 text-center">
          <div className="flex items-center">
            <div className="relative dark:invert">
              <Image src="/Echo.png" alt="Echo Logo" width={100} height={100} />
            </div>
            {/* <div className="relative">
              <Image
                src="/echofont.png"
                alt="Echo"
                width={100}
                height={33}
                className="brightness-0 dark:brightness-100 dark:invert"
              />
            </div> */}
          </div>
          <h1
            className={`${playfairDisplay.className} tracking-tight text-[#2d4c4c] dark:text-[#f5e8d3] text-4xl md:text-6xl max-w-sm md:max-w-lg font-light`}
          >
            The new social network for music.
          </h1>
          <p
            className={`${inter.className} text-[#4a6464] dark:text-[#d0c2a7] text-2xl mt-8 font-light tracking-wide`}
          >
            Out now on iOS.
          </p>
          <Link
            href="https://apps.apple.com/app/echo-rank-rate-relisten/id6717572746"
            target="_blank"
            className="w-fit hover:opacity-80 transition-opacity mt-4"
          >
            <Image
              src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
              alt="Download on the App Store"
              width={160}
              height={53}
              priority
              className="dark:invert"
            />
          </Link>

          <div className="mt-8 max-w-lg">
            <Image
              src="/echo_gen.png"
              alt="People enjoying music together"
              width={600}
              height={400}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* <div className="max-w-xl">
            <Image
              src="/waitlist.png"
              alt="Echo App Screenshots"
              width={700}
              height={466}
              className="rounded-lg"
            />
          </div> */}

          <footer
            className={`${inter.className} text-[#4a6464] dark:text-[#d0c2a7] text-sm mt-12 mb-6 opacity-80`}
          >
            © 2025 Echo Social. All rights reserved.
          </footer>
        </main>
      </section>
      <Toaster position={isMobile ? "bottom-center" : "top-center"} />
    </>
  );
}
