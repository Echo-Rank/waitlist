"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function Support() {
  return (
    <>
      <section
        className="w-screen min-h-screen bg-[#121212]"
        style={{ backgroundColor: "#121212" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/Echo.png"
              alt="Echo Logo"
              width={50}
              height={50}
              className="brightness-0 invert -ml-3"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <h1
              className={`${inter.className} font-semibold tracking-tight text-[#dedede] text-3xl`}
              style={{ color: "#dedede" }}
            >
              Support
            </h1>
          </div>

          <div className="prose prose-invert max-w-none">
            <div
              className="bg-[#212529] rounded-lg p-6 shadow-sm mb-8"
              style={{ backgroundColor: "#212529" }}
            >
              <h2
                className={`${inter.className} text-xl font-semibold text-[#dedede] mt-0 mb-4`}
                style={{ color: "#dedede" }}
              >
                Need Help?
              </h2>
              <p
                className={`${inter.className} text-[#dedede] opacity-90 mb-4`}
                style={{ color: "#dedede" }}
              >
                We're here to help you with any questions or issues you might
                have with Echo. Here are the fastest ways to get support:
              </p>

              <div className="flex flex-col gap-2">
                <Link
                  href="mailto:utkarsh@echorank.app"
                  className={`${inter.className} text-[#dedede] hover:opacity-80 flex items-center gap-2`}
                  style={{ color: "#dedede" }}
                >
                  📧 utkarsh@echorank.app
                </Link>
                <p
                  className={`${inter.className} text-sm text-[#dedede] opacity-60`}
                  style={{ color: "#dedede" }}
                >
                  Email response time: Usually within 24 hours
                </p>
              </div>
            </div>

            <div
              className="bg-[#212529] rounded-lg p-6 shadow-sm mb-8"
              style={{ backgroundColor: "#212529" }}
            >
              <h2
                className={`${inter.className} text-xl font-semibold text-[#dedede] mt-0 mb-4`}
                style={{ color: "#dedede" }}
              >
                Common Questions
              </h2>

              <div className="space-y-6">
                <div>
                  <h3
                    className={`${inter.className} font-medium text-[#dedede] mb-2`}
                    style={{ color: "#dedede" }}
                  >
                    How do I connect my Spotify/Apple Music account?
                  </h3>
                  <p
                    className={`${inter.className} text-[#dedede] opacity-90`}
                    style={{ color: "#dedede" }}
                  >
                    Go to Settings in the Echo app and tap on "Connect Music
                    Services". Follow the prompts to connect your preferred
                    music service.
                  </p>
                </div>

                <div>
                  <h3
                    className={`${inter.className} font-medium text-[#dedede] mb-2`}
                    style={{ color: "#dedede" }}
                  >
                    How do I create or edit my rankings?
                  </h3>
                  <p
                    className={`${inter.className} text-[#dedede] opacity-90`}
                    style={{ color: "#dedede" }}
                  >
                    Press the plus button on the bottom of the screen. You can
                    edit existing rankings by tapping the three dots menu on any
                    ranking OR by re-ranking the album.
                  </p>
                </div>

                <div>
                  <h3
                    className={`${inter.className} font-medium text-[#dedede] mb-2`}
                    style={{ color: "#dedede" }}
                  >
                    How do I reset my password?
                  </h3>
                  <p
                    className={`${inter.className} text-[#dedede] opacity-90`}
                    style={{ color: "#dedede" }}
                  >
                    Use the "Forgot Password" option on the login screen. We'll
                    send you an email with a code to reset your password.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-[#212529] rounded-lg p-6 shadow-sm mb-8"
              style={{ backgroundColor: "#212529" }}
            >
              <h2
                className={`${inter.className} text-xl font-semibold text-[#dedede] mt-0 mb-4`}
                style={{ color: "#dedede" }}
              >
                Follow Us
              </h2>
              <p
                className={`${inter.className} text-[#dedede] opacity-90 mb-4`}
                style={{ color: "#dedede" }}
              >
                Follow us on social media for updates, tips, and community
                highlights:
              </p>

              <div className="flex gap-4">
                <Link
                  href="https://twitter.com/echodotapp"
                  target="_blank"
                  className={`${inter.className} text-[#dedede] hover:opacity-80 flex items-center gap-2`}
                  style={{ color: "#dedede" }}
                >
                  <FaXTwitter className="w-5 h-5" /> @echodotapp
                </Link>
                <Link
                  href="https://instagram.com/echodotapp"
                  target="_blank"
                  className={`${inter.className} text-[#dedede] hover:opacity-80 flex items-center gap-2`}
                  style={{ color: "#dedede" }}
                >
                  <FaInstagram className="w-5 h-5" /> @echodotapp
                </Link>
              </div>
            </div>

            <div
              className="bg-[#212529] rounded-lg p-6 shadow-sm"
              style={{ backgroundColor: "#212529" }}
            >
              <h2
                className={`${inter.className} text-xl font-semibold text-[#dedede] mt-0 mb-4`}
                style={{ color: "#dedede" }}
              >
                Legal
              </h2>
              <div className="space-y-2">
                <Link
                  href="/privacy"
                  className={`${inter.className} text-[#dedede] hover:opacity-80 block`}
                  style={{ color: "#dedede" }}
                >
                  Privacy Policy
                </Link>
                {/* <Link href="/terms" className="text-[#dedede] hover:opacity-80 block">
                  Terms of Service
                </Link> */}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-[#333]">
              <Link
                href="/"
                className={`${inter.className} text-[#dedede] hover:opacity-80`}
                style={{ color: "#dedede" }}
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
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
    </>
  );
}
