"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaAndroid, FaApple } from "react-icons/fa";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
            className={`${inter.className} text-[#dedede] text-5xl md:text-7xl font-bold tracking-tight`}
            style={{ color: "#dedede" }}
          >
            Echo
          </h1>

          {/* Tagline */}
          <p
            className={`${inter.className} text-[#dedede] text-xl md:text-2xl font-light tracking-wide opacity-90`}
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
              className={`${inter.className} px-8 py-4 rounded-full text-[#dedede] font-medium text-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2`}
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
              className={`${inter.className} px-8 py-4 rounded-full text-[#dedede] font-medium text-lg transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 flex items-center gap-2`}
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
        </main>
      </section>

      {/* Footer - Fixed at bottom */}
      <footer
        className={`${inter.className} fixed bottom-0 left-0 right-0 text-[#dedede] text-sm py-4 opacity-60 text-center`}
        style={{ color: "#dedede" }}
      >
        <div className="space-x-6">
          <Link href="/privacy" className="hover:opacity-80">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:opacity-80">
            Contact Us
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
