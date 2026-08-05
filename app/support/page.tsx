import Link from "next/link";
import { Card, PageShell, SOCIALS } from "@/components/site";

export default function Support() {
  return (
    <PageShell
      title="Contact Us"
      meta="We're here to help with anything Echo."
    >
      <Card title="Need help?">
        <p>
          Email us and we&rsquo;ll get back to you — usually within 24 hours.
        </p>
        <p>
          <Link href="mailto:utkarsh@echorank.app">utkarsh@echorank.app</Link>
        </p>
      </Card>

      <Card title="Follow along">
        <p>
          Updates, tips, and community highlights land on our socials first.
        </p>
        <div className="flex flex-wrap gap-2.5">
          {SOCIALS.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium !text-[#2B1F27] !no-underline ring-1 ring-inset ring-[#2B1F27]/[0.07] transition duration-200 hover:-translate-y-0.5 hover:bg-white"
            >
              <Icon className="h-[15px] w-[15px]" />
              {label}
            </Link>
          ))}
        </div>
      </Card>

      <Card title="Legal">
        <p>
          <Link href="/privacy">Privacy Policy</Link>
          <br />
          <Link href="/terms">Terms of Service</Link>
        </p>
      </Card>
    </PageShell>
  );
}
