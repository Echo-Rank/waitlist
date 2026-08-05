import Link from "next/link";
import { Card, PageShell } from "@/components/site";

export default function SocialMediaIntern() {
  return (
    <PageShell
      title="Social Media Marketing Intern"
      meta="New York, NY (remote) · Unpaid internship, eligible for school credit · 5–10 hours/week"
      back={{ href: "/careers", label: "Back to Careers" }}
    >
      <h2 className="!mt-0">About Echo</h2>
      <p>
        Echo is the social network for music — a platform where users rank
        albums and songs, connect with friends, and discover new music together.
        Echo fosters a community of music discovery and discussion through a
        gamified ranking system, social feeds, and integration with Spotify and
        Apple Music.
      </p>
      <p>
        We&rsquo;re reimagining how people engage with music culture — combining
        social identity, AI-powered discovery, and community interaction into
        one seamless mobile experience.
      </p>

      <h2>Role overview</h2>
      <p>
        We&rsquo;re looking for a{" "}
        <strong>Social Media Marketing Intern</strong> to help amplify
        Echo&rsquo;s voice across digital platforms and grow our community of
        passionate music fans. You&rsquo;ll post updates about the app, curate
        trending music news, and create engaging content that reflects the pulse
        of today&rsquo;s music culture across multiple social media platforms.
      </p>
      <p>
        This is an ideal role for any student studying music business,
        communications, marketing, or media, who wants to break into the
        music/entertainment business and wants hands-on experience in a
        fast-moving music-tech startup.
      </p>
      <p>
        <strong>Timeline:</strong> We&rsquo;re flexible — this internship can
        last as long as it&rsquo;s a good fit. It&rsquo;s an unpaid role for
        now, but we see it as a chance to grow with the company, and future paid
        opportunities may emerge as Echo expands.
      </p>

      <h2>What you&rsquo;ll do</h2>
      <ul>
        <li>
          Manage and grow Echo&rsquo;s presence across Instagram, TikTok,
          Twitter/X, and LinkedIn
        </li>
        <li>
          Create and schedule posts highlighting app updates, user milestones,
          and trending topics in music
        </li>
        <li>
          Monitor music industry and cultural trends for timely engagement
          opportunities
        </li>
        <li>
          Write captions, edit short-form videos, and design posts (using tools
          like Canva or CapCut)
        </li>
        <li>Track social analytics and community feedback to refine strategy</li>
        <li>
          Collaborate directly with the founder and team to align social
          strategy with product updates
        </li>
      </ul>

      <h2>Who you are</h2>
      <ul>
        <li>Passionate about music and digital culture</li>
        <li>
          Active across multiple social platforms, especially TikTok and
          Instagram and Twitter/X
        </li>
        <li>Skilled at writing, storytelling, and visual communication</li>
        <li>
          Organized and self-motivated; able to balance creativity with
          consistency
        </li>
        <li>
          Bonus: experience in graphic design, video editing, or copywriting
        </li>
      </ul>

      <h2>What you&rsquo;ll gain</h2>
      <ul>
        <li>Real-world experience at an early-stage music-tech startup</li>
        <li>
          Close mentorship from Echo&rsquo;s founding team (Berklee, Columbia,
          Harvard, Meta, Sony/Warner/Universal Music)
        </li>
        <li>Portfolio-ready content and measurable impact on brand growth</li>
        <li>Networking opportunities in the NYC music and startup scenes</li>
        <li>
          Potential for course credit and future paid opportunities as Echo
          scales
        </li>
      </ul>

      <div className="mt-10">
        <Card title="How to apply">
          <p>
            Send your <strong>resume</strong>, a short paragraph on your
            favorite recent music trend or artist, and links to any social media
            or relevant portfolio to{" "}
            <Link href="mailto:david@echorank.app?subject=Social Media Marketing Intern — Echo">
              david@echorank.app
            </Link>{" "}
            with the subject line &ldquo;Social Media Marketing Intern —
            Echo.&rdquo;
          </p>
        </Card>
      </div>
    </PageShell>
  );
}
