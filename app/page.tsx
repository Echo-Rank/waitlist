"use client";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaAndroid, FaApple, FaDiscord, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

const geist = localFont({
  src: [
    {
      path: "../public/fonts/Geist-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Geist-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
  ],
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  return (
    <>
      <section
        className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#121212]"
        style={{ backgroundColor: "#121212" }}
      >
        <main className="flex flex-col items-center gap-8 px-6 text-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/Echo.png"
                alt="Echo Logo"
                width={120}
                height={120}
                className="brightness-0 invert"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          </div>

          {/* App Name */}
          <h1
            className={`${geist.className} text-[#dedede] text-5xl md:text-7xl font-bold tracking-tight`}
            style={{ color: "#dedede" }}
          >
            Echo
          </h1>

          {/* Tagline */}
          <p
            className={`${geist.className} text-[#dedede] text-xl md:text-2xl font-light tracking-wide opacity-90`}
            style={{ color: "#dedede" }}
          >
            The new social network for music
          </p>

          {/* Download Buttons */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* iOS Download Button */}
            <Link
              href="https://apps.apple.com/app/echo-rank-rate-relisten/id6717572746"
              target="_blank"
              className={`${geist.className} px-8 py-4 rounded-full text-[#dedede] font-medium text-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2`}
              style={{
                backgroundColor: "#212529",
                color: "#dedede",
              }}
            >
              Download on iOS
              <FaApple size={20} />
            </Link>

            {/* Android Download Button */}
            <Link
              href="https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo"
              target="_blank"
              className={`${geist.className} px-8 py-4 rounded-full text-[#dedede] font-medium text-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2`}
              style={{
                backgroundColor: "#212529",
                color: "#dedede",
              }}
            >
              Download on Android
              <FaAndroid size={20} />
            </Link>
          </div>

          {/* QR Code */}
          <div className="mt-4">
            <Image
              src="/qrcode.png"
              alt="QR Code"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>

          {/* Social Media Buttons */}
          <div className="flex gap-4 mt-6">
            <Link
              href="https://instagram.com/echodotapp"
              target="_blank"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
              style={{ backgroundColor: "#212529" }}
            >
              <RiInstagramFill className="text-[#dedede] w-6 h-6" />
            </Link>
            <Link
              href="https://twitter.com/echodotapp"
              target="_blank"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
              style={{ backgroundColor: "#212529" }}
            >
              <FaXTwitter className="text-[#dedede] w-5 h-5" />
            </Link>
            <Link
              href="https://discord.gg/YBEyaEd2dG"
              target="_blank"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
              style={{ backgroundColor: "#212529" }}
            >
              <FaDiscord className="text-[#dedede] w-6 h-6" />
            </Link>
            <Link
              href="https://www.reddit.com/r/echorank/"
              target="_blank"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 active:scale-95"
              style={{ backgroundColor: "#212529" }}
            >
              <FaReddit className="text-[#dedede] w-6 h-6" />
            </Link>
          </div>
        </main>
      </section>

      {/* Footer - Fixed at bottom */}
      <footer
        className={`${geist.className} fixed bottom-0 left-0 right-0 text-[#dedede] text-sm py-4 opacity-60 text-center`}
        style={{ color: "#dedede" }}
      >
        <div className="space-x-6">
          <Link href="/privacy" className="hover:opacity-80">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:opacity-80">
            Contact Us
          </Link>
          <Link href="/careers" className="hover:opacity-80">
            Careers
          </Link>
          {/* <Link href="/terms" className="hover:opacity-80">
            Terms of Service
          </Link> */}
        </div>
      </footer>

      <Toaster position={isMobile ? "bottom-center" : "top-center"} />
    </>
  );
}
