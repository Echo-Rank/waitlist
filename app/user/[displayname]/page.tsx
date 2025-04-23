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
  const profileImageSrc = data?.imagesrc;

  // Absolute URL for the Echo icon
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
  const echoIconUrl = `${siteUrl}/Echo.png`;

  return {
    title: `${displayname} | Echo Profile`,
    description: `View ${displayname}'s profile on Echo`,
    openGraph: {
      title: `${displayname} on Echo`,
      description: `Check out ${displayname}'s music profile on Echo`,
      images: [
        ...(profileImageSrc
          ? [
              {
                url: profileImageSrc,
                width: 1200,
                height: 630,
                alt: `${displayname}'s profile picture`,
              },
            ]
          : []),
        { url: echoIconUrl, width: 1200, height: 630, alt: "Echo app icon" },
      ],
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayname} on Echo`,
      description: `Check out ${displayname}'s music profile on Echo`,
      images: profileImageSrc ? [profileImageSrc] : [echoIconUrl],
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
