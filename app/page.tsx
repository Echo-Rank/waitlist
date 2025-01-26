"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaInstagram, FaTiktok, FaXTwitter } from "react-icons/fa6";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  return (
    <>
      <section className="w-screen min-h-dvh grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#e9ecef] relative">
        <div className="md:h-full h-80 bg-[#212529] relative overflow-hidden">
          <Image
            src="/waitlist.png"
            alt="Echo App Screenshots"
            fill
            className="object-contain mt-8 md:mt-0 sm:mt-0 px-14 object-bottom"
          />
        </div>
        <main className="flex flex-col gap-8 justify-center px-6 pb-10">
          <div className="md:hidden flex justify-end space-x-4 mt-4">
            <Link href="https://tiktok.com/@echodotapp" target="_blank">
              <FaTiktok className="text-zinc-900 w-6 h-6" />
            </Link>
            <Link href="https://twitter.com/echodotapp" target="_blank">
              <FaXTwitter className="text-zinc-900 w-6 h-6" />
            </Link>
            <Link href="https://instagram.com/echodotapp" target="_blank">
              <FaInstagram className="text-zinc-900 w-6 h-6" />
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <Image
              style={{ marginLeft: "-20px" }}
              src="/Echo.png"
              alt="Echo Logo"
              width={75}
              height={75}
            />
            <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl leading-tight md:text-4xl max-w-lg">
              Rank, Rate, Relisten.
            </h1>
          </div>

          <div className="space-y-6">
            <p className="text-zinc-700">
              <strong>Echo</strong> revolutionizes music engagement through our
              proprietary ranking system. Start with any album, then repeatedly
              choose between it and similar selections to build your personal
              hierarchy through direct comparisons.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-zinc-900 font-semibold mb-2">
                  Head-to-Head Rankings
                </h3>
                <p className="text-zinc-600 text-sm">
                  Start with any album and repeatedly match it against similar
                  choices through direct comparisons to build your rankings.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-zinc-900 font-semibold mb-2">
                  Social Curation
                </h3>
                <p className="text-zinc-600 text-sm">
                  Connect with friends, share your rankings, and engage in
                  musical discussions that shape Echo's community.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-zinc-900 font-semibold mb-2">
                  Progression System
                </h3>
                <p className="text-zinc-600 text-sm">
                  Earn badges and level up by engaging with music, completing
                  challenges, and contributing to discussions.
                </p>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm">
                <h3 className="text-zinc-900 font-semibold mb-2">
                  Discovery Engine (Coming Soon)
                </h3>
                <p className="text-zinc-600 text-sm">
                  Get recommendations based on your rankings and friends'
                  activity, powered by our unique similarity analysis.
                </p>
              </div>
            </div>

            <p className="text-zinc-700">
              Experience music analysis that goes beyond basic ratings.
              Available exclusively on iOS.
            </p>
          </div>

          <Link
            href="https://apps.apple.com/app/echo-rank-rate-relisten/id6717572746"
            target="_blank"
            className="w-fit hover:opacity-80 transition-opacity"
          >
            <Image
              src="/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
              alt="Download on the App Store"
              width={120}
              height={40}
              priority
            />
          </Link>
        </main>
        <div className="hidden md:flex justify-end space-x-4 absolute top-4 right-4">
          <Link href="https://twitter.com/echodotapp" target="_blank">
            <FaXTwitter className="text-zinc-900 w-6 h-6" />
          </Link>
          <Link href="https://instagram.com/echodotapp" target="_blank">
            <FaInstagram className="text-zinc-900 w-6 h-6" />
          </Link>
          <Link href="https://tiktok.com/@echodotapp" target="_blank">
            <FaTiktok className="text-zinc-900 w-6 h-6" />
          </Link>
        </div>
      </section>
      <Toaster position={isMobile ? "bottom-center" : "top-center"} />
    </>
  );
}
