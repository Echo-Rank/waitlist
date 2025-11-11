"use client";
import localFont from "next/font/local";
import Image from "next/image";
import Link from "next/link";

const geist = localFont({
  src: [
    {
      path: "../../../public/fonts/Geist-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geist-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geist-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geist-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Geist-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function SocialMediaIntern() {
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

          {/* Job Listing */}
          <div
            className="bg-[#212529] rounded-lg p-8 shadow-sm mb-8"
            style={{ backgroundColor: "#212529" }}
          >
            {/* Job Title */}
            <h2
              className={`${geist.className} text-3xl font-bold text-[#dedede] mb-4`}
              style={{ color: "#dedede" }}
            >
              Echo — Social Media Marketing Intern
            </h2>

            {/* Job Details */}
            <div className="mb-6 space-y-2">
              <p
                className={`${geist.className} text-[#dedede] opacity-90`}
                style={{ color: "#dedede" }}
              >
                <span className="font-semibold">Location:</span> New York, NY (remote)
              </p>
              <p
                className={`${geist.className} text-[#dedede] opacity-90`}
                style={{ color: "#dedede" }}
              >
                <span className="font-semibold">Type:</span> Unpaid Internship — eligible for school credit
              </p>
              <p
                className={`${geist.className} text-[#dedede] opacity-90`}
                style={{ color: "#dedede" }}
              >
                <span className="font-semibold">Time Commitment:</span> 5–10 hours/week
              </p>
            </div>

            {/* About Echo */}
            <div className="mb-6">
              <h3
                className={`${geist.className} text-xl font-semibold text-[#dedede] mb-3`}
                style={{ color: "#dedede" }}
              >
                About Echo
              </h3>
              <p
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed mb-3`}
                style={{ color: "#dedede" }}
              >
                Echo is the social network for music — a platform where users rank albums and songs,
                connect with friends, and discover new music together. Echo fosters a community of music
                discovery and discussion through a gamified ranking system, social feeds, and integration
                with Spotify and Apple Music.
              </p>
              <p
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed`}
                style={{ color: "#dedede" }}
              >
                We're reimagining how people engage with music culture — combining social identity,
                AI-powered discovery, and community interaction into one seamless mobile experience.
              </p>
            </div>

            {/* Role Overview */}
            <div className="mb-6">
              <h3
                className={`${geist.className} text-xl font-semibold text-[#dedede] mb-3`}
                style={{ color: "#dedede" }}
              >
                Role Overview
              </h3>
              <p
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed mb-3`}
                style={{ color: "#dedede" }}
              >
                We're looking for a <span className="font-semibold">Social Media Marketing Intern</span> to
                help amplify Echo's voice across digital platforms and grow our community of passionate music fans.
                You'll post updates about the app, curate trending music news, and create engaging content that
                reflects the pulse of today's music culture across multiple social media platforms.
              </p>
              <p
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed mb-3`}
                style={{ color: "#dedede" }}
              >
                This is an ideal role for any student studying music business, communications, marketing, or media,
                who wants to break into the music/entertainment business and wants hands-on experience in a
                fast-moving music-tech startup.
              </p>
              <p
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed`}
                style={{ color: "#dedede" }}
              >
                <span className="font-semibold">Timeline:</span> We're flexible — this internship can last as
                long as it's a good fit. It's an unpaid role for now, but we see it as a chance to grow with
                the company, and future paid opportunities may emerge as Echo expands.
              </p>
            </div>

            {/* What You'll Do */}
            <div className="mb-6">
              <h3
                className={`${geist.className} text-xl font-semibold text-[#dedede] mb-3`}
                style={{ color: "#dedede" }}
              >
                What You'll Do
              </h3>
              <ul
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed space-y-2 list-disc list-inside`}
                style={{ color: "#dedede" }}
              >
                <li>Manage and grow Echo's presence across Instagram, TikTok, Twitter/X, and LinkedIn</li>
                <li>Create and schedule posts highlighting app updates, user milestones, and trending topics in music</li>
                <li>Monitor music industry and cultural trends for timely engagement opportunities</li>
                <li>Write captions, edit short-form videos, and design posts (using tools like Canva or CapCut)</li>
                <li>Track social analytics and community feedback to refine strategy</li>
                <li>Collaborate directly with the founder and team to align social strategy with product updates</li>
              </ul>
            </div>

            {/* Who You Are */}
            <div className="mb-6">
              <h3
                className={`${geist.className} text-xl font-semibold text-[#dedede] mb-3`}
                style={{ color: "#dedede" }}
              >
                Who You Are
              </h3>
              <ul
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed space-y-2 list-disc list-inside`}
                style={{ color: "#dedede" }}
              >
                <li>Passionate about music and digital culture</li>
                <li>Active across multiple social platforms, especially TikTok and Instagram and Twitter/X</li>
                <li>Skilled at writing, storytelling, and visual communication</li>
                <li>Organized and self-motivated; able to balance creativity with consistency</li>
                <li>Bonus: experience in graphic design, video editing, or copywriting</li>
              </ul>
            </div>

            {/* What You'll Gain */}
            <div className="mb-6">
              <h3
                className={`${geist.className} text-xl font-semibold text-[#dedede] mb-3`}
                style={{ color: "#dedede" }}
              >
                What You'll Gain
              </h3>
              <ul
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed space-y-2 list-disc list-inside`}
                style={{ color: "#dedede" }}
              >
                <li>Real-world experience at an early-stage music-tech startup</li>
                <li>Close mentorship from Echo's founding team (Berklee, Columbia, Harvard, Meta, Sony/Warner/Universal Music)</li>
                <li>Portfolio-ready content and measurable impact on brand growth</li>
                <li>Networking opportunities in the NYC music and startup scenes</li>
                <li>Potential for course credit and future paid opportunities as Echo scales</li>
              </ul>
            </div>

            {/* How to Apply */}
            <div
              className="bg-[#121212] rounded-lg p-6 mt-8"
              style={{ backgroundColor: "#121212" }}
            >
              <h3
                className={`${geist.className} text-xl font-semibold text-[#dedede] mb-3`}
                style={{ color: "#dedede" }}
              >
                How to Apply
              </h3>
              <p
                className={`${geist.className} text-[#dedede] opacity-90 leading-relaxed mb-4`}
                style={{ color: "#dedede" }}
              >
                Send your <span className="font-semibold">resume</span>, a short paragraph on your favorite
                recent music trend or artist, and links to any social media or relevant portfolio to{" "}
                <a
                  href="mailto:david@echorank.app?subject=Social Media Marketing Intern — Echo"
                  className="text-[#dedede] underline hover:opacity-80 font-semibold"
                  style={{ color: "#dedede" }}
                >
                  david@echorank.app
                </a>{" "}
                with the subject line "Social Media Marketing Intern — Echo."
              </p>
            </div>
          </div>

          {/* Back to Careers */}
          <div className="mt-12 pt-8 border-t border-[#333]">
            <Link
              href="/careers"
              className={`${geist.className} text-[#dedede] hover:opacity-80`}
              style={{ color: "#dedede" }}
            >
              ← Back to Careers
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
