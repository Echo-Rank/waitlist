"use client";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const geist = localFont({
  src: [
    {
      path: "../../public/fonts/Geist-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Geist-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function Careers() {
  return (
    <>
      <section
        className="w-screen min-h-screen bg-[#121212]"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Image
                src="/Echo.png"
                alt="Echo Logo"
                width={50}
                height={50}
                className="brightness-0 invert -ml-3 cursor-pointer hover:opacity-80 transition-opacity"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <h1
              className={`${geist.className} font-semibold tracking-tight text-[#dedede] text-3xl`}
              style={{ color: "#dedede" }}
            >
              Careers at Echo
            </h1>
          </div>

          {/* Open Positions */}
          <div className="mb-8">
            <h2
              className={`${geist.className} text-2xl font-semibold text-[#dedede] mb-6`}
              style={{ color: "#dedede" }}
            >
              Open Positions
            </h2>

            {/* Job Card - Social Media Marketing Intern */}
            <Link href="/careers/social-media-intern">
              <div
                className="bg-[#212529] rounded-lg p-6 shadow-sm hover:bg-[#2a2f35] transition-colors duration-200 cursor-pointer mb-4"
                style={{ backgroundColor: "#212529" }}
              >
                <h3
                  className={`${geist.className} text-xl font-semibold text-[#dedede] mb-2`}
                  style={{ color: "#dedede" }}
                >
                  Social Media Marketing Intern
                </h3>
                <p
                  className={`${geist.className} text-[#dedede] opacity-75 text-sm`}
                  style={{ color: "#dedede" }}
                >
                  New York, NY (remote)
                </p>
              </div>
            </Link>
          </div>

          {/* Back to Home */}
          <div className="mt-12 pt-8 border-t border-[#333]">
            <Link
              href="/"
              className={`${geist.className} text-[#dedede] hover:opacity-80`}
              style={{ color: "#dedede" }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
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
        </div>
      </footer>
    </>
  );
}
