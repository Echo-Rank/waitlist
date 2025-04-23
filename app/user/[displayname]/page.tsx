import { getProfileByDisplayName } from "@/lib/supabase";
import { Metadata, ResolvingMetadata } from "next";
import ClientRedirect from "./redirect-client";

type Props = {
  params: { displayname: string };
};

// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { displayname } = params;

  // Get profile data to use profile picture in metadata
  const { data } = await getProfileByDisplayName(displayname);

  // Absolute URL for the custom OG image API
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
  const ogImageUrl = `${siteUrl}/api/og/profile/${encodeURIComponent(
    displayname
  )}`;

  // Website URL to display in preview
  const websiteUrl = "echomusicapp.com";

  return {
    title: data?.displayname
      ? `${data.displayname} on Echo`
      : `${displayname} | Echo Profile`,
    description:
      data?.follower_count !== undefined
        ? `${data.follower_count} followers · ${data.following_count} following`
        : `View ${displayname}'s profile on Echo`,
    openGraph: {
      title: data?.displayname
        ? `@${data.displayname} on echo`
        : `${displayname} on Echo`,
      description: websiteUrl,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${displayname}'s profile on Echo`,
        },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: data?.displayname
        ? `@${data.displayname} on echo`
        : `${displayname} on Echo`,
      description: websiteUrl,
      images: [ogImageUrl],
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { displayname } = params;

  // Get profile data from Supabase
  const { data, error } = await getProfileByDisplayName(displayname);

  // If profile not found, we'll still render the client component
  // that will handle the redirect to main site
  const userId = data?.id || null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <ClientRedirect userId={userId} displayname={displayname} />

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
