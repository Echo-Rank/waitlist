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

  // Build description for text-only previews
  const firstName = data?.firstname || "";
  const lastName = data?.lastname || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const userBio = data?.bio || "";
  const location = data?.location || "";

  // Description text will still contain profile details
  const profileDisplay = [
    fullName ? `${fullName} @${displayname}` : `@${displayname}`,
    location,
    userBio,
  ]
    .filter(Boolean)
    .join("\n");

  // Preview text should say "Follow @displayname on Echo"
  const previewText = `Follow @${displayname} on Echo`;

  // Absolute URL for the Echo icon and site
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
  const echoIconUrl = `${siteUrl}/Echo.png`;

  // The profile URL to use in metadata
  const profileUrl = `${siteUrl}/user/${displayname}`;

  // URL for the dynamically generated profile card image
  const profileCardUrl = `${siteUrl}/api/profile-card/${displayname}`;

  return {
    title: previewText,
    description: profileDisplay,
    openGraph: {
      title: previewText,
      description: profileDisplay,
      images: [
        {
          url: profileCardUrl,
          width: 1200,
          height: 630,
          alt: `${displayname}'s profile on Echo`,
        },
      ],
      type: "profile",
      url: profileUrl,
    },
    twitter: {
      card: "summary_large_image", // Changed to large image for the card
      title: previewText,
      description: profileDisplay,
      images: [profileCardUrl],
    },
    other: {
      "og:site_name": "Echo",
      "theme-color": "#000000",
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
