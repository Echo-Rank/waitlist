// app/invite/[id]/page.tsx

import { Metadata, ResolvingMetadata } from "next";
import InviteClientRedirect from "./invite-client";

type Props = {
  params: { id: string };
};

// Generate metadata for SEO and link previews
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
  const pageUrl = `${siteUrl}/invite/${id}`;
  const inviteCardUrl = `${siteUrl}/api/invite-card/${id}`;

  return {
    title: "You're invited to join Echo",
    description: "Rank, Rate, Relisten - Join the music community on Echo",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "You're invited to join Echo",
      description: "Rank, Rate, Relisten - Join the music community on Echo",
      url: pageUrl,
      type: "website",
      images: [
        {
          url: inviteCardUrl,
          width: 800,
          height: 418,
          alt: "Join Echo",
          type: "image/png",
        },
      ],
      siteName: "Echo",
    },
    twitter: {
      card: "summary_large_image",
      title: "You're invited to join Echo",
      description: "Rank, Rate, Relisten - Join the music community on Echo",
      images: [inviteCardUrl],
      site: "@echodotapp",
    },
    other: {
      "theme-color": "#000000",
    },
  };
}

export default function InvitePage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <InviteClientRedirect inviteId={id} />
      <h1 className="text-xl font-bold mb-4">Opening Echo...</h1>
      <p>
        If nothing happens,{" "}
        <a
          href="https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
          className="text-blue-600 underline"
        >
          download Echo from the App Store
        </a>
      </p>
    </div>
  );
}
