// app/collection/[id]/page.tsx

import { Metadata, ResolvingMetadata } from "next";
import CollectionClientRedirect from "./collection-client";

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
  const pageUrl = `${siteUrl}/collection/${id}`;
  const collectionCardUrl = `${siteUrl}/api/collection-card/${id}`;

  return {
    title: "Check out this collection on Echo",
    description: "Rank, Rate, Relisten to your favorite music on Echo",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Check out this collection on Echo",
      description: "Rank, Rate, Relisten to your favorite music on Echo",
      url: pageUrl,
      type: "website",
      images: [
        {
          url: collectionCardUrl,
          width: 800,
          height: 418,
          alt: "Echo Collection",
          type: "image/png",
        },
      ],
      siteName: "Echo",
    },
    twitter: {
      card: "summary_large_image",
      title: "Check out this collection on Echo",
      description: "Rank, Rate, Relisten to your favorite music on Echo",
      images: [collectionCardUrl],
      site: "@echodotapp",
    },
    other: {
      "theme-color": "#000000",
    },
  };
}

export default function CollectionPage({ params }: Props) {
  const { id } = params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <CollectionClientRedirect collectionId={id} />
      <h1 className="text-xl font-bold mb-4">Opening Echo...</h1>
      <p>
        If nothing happens, download Echo from the{" "}
        <a
          href="https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
          className="text-blue-600 underline"
        >
          App Store
        </a>{" "}
        or{" "}
        <a
          href="https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo"
          className="text-blue-600 underline"
        >
          Google Play
        </a>
      </p>
    </div>
  );
}
