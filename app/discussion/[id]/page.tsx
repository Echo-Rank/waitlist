import { getDiscussionByFeedItemId } from "@/lib/supabase";
import { Metadata, ResolvingMetadata } from "next";
import ClientRedirect from "./redirect-client";

interface Props {
  params: { id: string };
}

// Generate metadata for SEO and link previews
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  try {
    // Get discussion data by feed item ID
    const { data, error } = await getDiscussionByFeedItemId(id);

    // Build metadata based on discussion data
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
    const discussionCardUrl = `${siteUrl}/api/discussion-card/${id}`;
    const pageUrl = `${siteUrl}/discussion/${id}`;

    if (data && !error) {
      const { title, content, user } = data;
      const discussionTitle = title || "Untitled Discussion";
      const userName = user?.displayname || "Unknown User";

      // Create preview text
      const previewTitle = `${userName} started a discussion: ${discussionTitle}`;
      const previewDescription =
        content && content.length > 100
          ? content.substring(0, 100) + "..."
          : content || "Join the conversation on Echo";

      return {
        title: previewTitle,
        description: previewDescription,
        metadataBase: new URL(siteUrl),
        openGraph: {
          title: previewTitle,
          description: previewDescription,
          url: pageUrl,
          type: "website",
          images: [
            {
              url: discussionCardUrl,
              width: 800,
              height: 418,
              alt: previewTitle,
              type: "image/png",
            },
          ],
          siteName: "Echo",
        },
        twitter: {
          card: "summary_large_image",
          title: previewTitle,
          description: previewDescription,
          images: [discussionCardUrl],
          site: "@echodotapp",
        },
        other: {
          "theme-color": "#000000",
        },
      };
    }
  } catch (error) {
    console.error("Error generating discussion metadata:", error);
  }

  // Fallback metadata if discussion not found or error occurred
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://echorank.app";
  const discussionCardUrl = `${siteUrl}/api/discussion-card/${id}`;
  const pageUrl = `${siteUrl}/discussion/${id}`;

  return {
    title: "Echo Discussion",
    description: "Join the conversation on Echo",
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: "Echo Discussion",
      description: "Join the conversation on Echo",
      url: pageUrl,
      type: "website",
      images: [
        {
          url: discussionCardUrl,
          width: 800,
          height: 418,
          alt: "Echo Discussion",
          type: "image/png",
        },
      ],
      siteName: "Echo",
    },
    twitter: {
      card: "summary_large_image",
      title: "Echo Discussion",
      description: "Join the conversation on Echo",
      images: [discussionCardUrl],
      site: "@echorank",
    },
    other: {
      "theme-color": "#000000",
    },
  };
}

export default function DiscussionPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <ClientRedirect discussionId={id} />
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
