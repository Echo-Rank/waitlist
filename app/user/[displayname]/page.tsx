import {
  getCanvasContent,
  getFullProfile,
  getProfileLinks,
  getUserIdByDisplayname,
} from "@/lib/echoApi";
import { Metadata, ResolvingMetadata } from "next";
import ProfileView from "./profile-view";

type Props = {
  params: { displayname: string };
};

export const revalidate = 60;

// Generate metadata for SEO
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { displayname } = params;

  // Preview text should say "Follow @displayname on Echo"
  const previewText = `Follow @${displayname} on Echo`;

  // Absolute URL for the Echo icon and site
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
  const pageUrl = `${siteUrl}/user/${displayname}`;

  // URL for the dynamically generated profile card image
  const profileCardUrl = `${siteUrl}/api/profile-card/${displayname}`;

  return {
    title: previewText,
    description: "echorank.app",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: previewText,
      description: "echorank.app",
      url: pageUrl,
      type: "profile",
      images: [
        {
          url: profileCardUrl,
          width: 800,
          height: 418,
          alt: previewText,
          type: "image/png",
        },
      ],
      siteName: "Echo",
    },
    twitter: {
      card: "summary_large_image",
      title: previewText,
      description: "echorank.app",
      images: [profileCardUrl],
      site: "@echodotapp",
    },
    other: {
      "theme-color": "#ffffff",
    },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { displayname } = params;

  // Resolve the displayname to a user id via the core API
  const userId = await getUserIdByDisplayname(displayname);

  // Hydrate the full profile + canvas from the core API
  const [profile, content, links] = userId
    ? await Promise.all([
        getFullProfile(userId),
        getCanvasContent(userId),
        getProfileLinks(userId),
      ])
    : [null, {}, []];

  if (!userId || !profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center text-neutral-900">
        <h1 className="mb-2 text-xl font-bold">Profile not found</h1>
        <p className="text-neutral-500">
          Download Echo from the{" "}
          <a
            href="https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
            className="text-sky-600 underline"
          >
            App Store
          </a>{" "}
          or{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo"
            className="text-sky-600 underline"
          >
            Google Play
          </a>
        </p>
      </main>
    );
  }

  return <ProfileView profile={profile} content={content} links={links} />;
}
