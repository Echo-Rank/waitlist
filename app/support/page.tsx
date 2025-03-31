"use client";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Support() {
  return (
    <section className="w-screen min-h-dvh bg-[#e9ecef]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/Echo.png"
            alt="Echo Logo"
            width={50}
            height={50}
            className="-ml-3"
          />
          <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl">
            Support
          </h1>
        </div>

        <div className="prose prose-zinc max-w-none">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-zinc-900 mt-0 mb-4">
              Need Help?
            </h2>
            <p className="text-zinc-700 mb-4">
              We're here to help you with any questions or issues you might have
              with Echo. Here are the fastest ways to get support:
            </p>

            <div className="flex flex-col gap-2">
              <Link
                href="mailto:utkarsh@echorank.app"
                className="text-zinc-900 hover:text-zinc-700 flex items-center gap-2"
              >
                📧 utkarsh@echorank.app
              </Link>
              <p className="text-sm text-zinc-600">
                Email response time: Usually within 24 hours
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-zinc-900 mt-0 mb-4">
              Common Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-zinc-900 mb-2">
                  How do I connect my Spotify/Apple Music account?
                </h3>
                <p className="text-zinc-700">
                  Go to Settings in the Echo app and tap on "Connect Music
                  Services". Follow the prompts to connect your preferred music
                  service.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-zinc-900 mb-2">
                  How do I create or edit my rankings?
                </h3>
                <p className="text-zinc-700">
                  Press the plus button on the bottom of the screen. You can
                  edit existing rankings by tapping the three dots menu on any
                  ranking OR by re-ranking the album.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-zinc-900 mb-2">
                  How do I reset my password?
                </h3>
                <p className="text-zinc-700">
                  Use the "Forgot Password" option on the login screen. We'll
                  send you an email with a code to reset your password.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold text-zinc-900 mt-0 mb-4">
              Follow Us
            </h2>
            <p className="text-zinc-700 mb-4">
              Follow us on social media for updates, tips, and community
              highlights:
            </p>

            <div className="flex gap-4">
              <Link
                href="https://twitter.com/echodotapp"
                target="_blank"
                className="text-zinc-900 hover:text-zinc-700 flex items-center gap-2"
              >
                <FaXTwitter className="w-5 h-5" /> @echodotapp
              </Link>
              <Link
                href="https://instagram.com/echodotapp"
                target="_blank"
                className="text-zinc-900 hover:text-zinc-700 flex items-center gap-2"
              >
                <FaInstagram className="w-5 h-5" /> @echodotapp
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-zinc-900 mt-0 mb-4">
              Legal
            </h2>
            <div className="space-y-2">
              <Link
                href="/privacy"
                className="text-zinc-900 hover:text-zinc-700 block"
              >
                Privacy Policy
              </Link>
              {/* <Link href="/terms" className="text-zinc-900 hover:text-zinc-700 block">
                Terms of Service
              </Link> */}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200">
            <Link href="/" className="text-zinc-900 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
