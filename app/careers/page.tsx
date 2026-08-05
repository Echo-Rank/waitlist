import Link from "next/link";
import { PageShell } from "@/components/site";

const OPENINGS = [
  {
    href: "/careers/social-media-intern",
    title: "Social Media Marketing Intern",
    location: "New York, NY (remote)",
  },
];

export default function Careers() {
  return (
    <PageShell
      title="Careers"
      meta="Help us build the social network for music."
    >
      <h2 className="!mt-0">Open positions</h2>
      <div className="flex flex-col gap-3">
        {OPENINGS.map(({ href, title, location }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between gap-4 rounded-2xl bg-white/55 p-6 !no-underline ring-1 ring-inset ring-[#2B1F27]/[0.07] backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/80"
          >
            <span>
              <span className="block text-lg font-semibold tracking-[-0.01em] text-[#2B1F27]">
                {title}
              </span>
              <span className="mt-1 block text-sm text-[#6A5F6D]">
                {location}
              </span>
            </span>
            <span
              aria-hidden
              className="text-xl text-[#6A5F6D] transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-8 text-sm text-[#6A5F6D]">
        Don&rsquo;t see your role? Tell us what you&rsquo;d build at{" "}
        <Link href="mailto:utkarsh@echorank.app">utkarsh@echorank.app</Link>.
      </p>
    </PageShell>
  );
}
